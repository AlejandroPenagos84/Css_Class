import templateHtml from './reto.html?raw'
import {
    retosSelectores,
    retosUnidades,
    retosBoxModel,
    retosDisplay,
    retosFlexbox,
    retosGrid,
    retosPosition,
    retosCascadaHover
} from '../../data/retos.js'

const MONACO_VERSION = '0.52.0'
const MONACO_BASE_URL = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min`
let monacoLoaderPromise = null
const allRetos = [
    ...retosSelectores,
    ...retosUnidades,
    ...retosBoxModel,
    ...retosDisplay,
    ...retosPosition,
    ...retosFlexbox,
    ...retosGrid,
    ...retosCascadaHover
]

function getRetoById(retoId) {
    if (!retoId) return allRetos[0]
    return allRetos.find(reto => reto.id === retoId) || allRetos[0]
}

class RetoCSS extends HTMLElement {
    static get observedAttributes() {
        return ['reto-id']
    }

    connectedCallback() {
        if (this._loaded) return
        this._loaded = true

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
        const template = doc.querySelector('template')
        if (!template) return

        this.appendChild(template.content.cloneNode(true))
        initReto(this, getRetoById(this.getAttribute('reto-id')))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this._loaded) return
        if (name !== 'reto-id' || oldValue === newValue) return

        initReto(this, getRetoById(newValue))
    }
}

async function initReto(root, reto) {
    if (!reto) return

    root._currentReto = reto
    setLayoutMode(root, reto.id)

    fillStaticInfo(root, reto)
    let editor = root._editor || null

    if (!editor) {
        editor = await initEditor(root, reto.cssBase)
        if (!editor) return

        root._editor = editor

        const preview = root.querySelector('#challengePreview')
        if (preview) {
            editor.onDidChangeModelContent(() => {
                const retoActual = root._currentReto
                if (!retoActual) return
                applyPreviewCss(preview, retoActual.htmlBase, editor.getValue())
            })
        }

        const btnEvaluar = root.querySelector('#btnEvaluar')
        const resultado = root.querySelector('#resultadoReto')
        if (btnEvaluar && resultado) {
            btnEvaluar.addEventListener('click', () => {
                const retoActual = root._currentReto
                if (!retoActual) return

                const passed = validarReto(editor.getValue(), retoActual.reglas)
                resultado.textContent = passed
                    ? 'Listo: reto aprobado.'
                    : 'Aun no cumple el objetivo. Revisa selector y propiedades.'
                resultado.style.color = passed ? '#0F6E56' : '#B54708'
            })
        }
    } else {
        editor.setValue(reto.cssBase)
    }

    if (!editor) return

    const preview = root.querySelector('#challengePreview')
    if (!preview) return

    applyPreviewCss(preview, reto.htmlBase, editor.getValue())

    const resultado = root.querySelector('#resultadoReto')
    if (resultado) {
        resultado.textContent = ''
    }
}

function fillStaticInfo(root, reto) {
    const titulo = root.querySelector('#retoTitulo')
    const descripcion = root.querySelector('#retoDescripcion')
    const instruccion = root.querySelector('#retoInstruccion')
    const baseHtmlCode = root.querySelector('#baseHtmlCode')

    if (titulo) titulo.textContent = reto.titulo
    if (descripcion) descripcion.textContent = reto.descripcion
    if (instruccion) instruccion.textContent = reto.instruccion
    if (baseHtmlCode) baseHtmlCode.textContent = reto.htmlBase
}

function setLayoutMode(root, retoId) {
    const useStackedLayout = /^grid-|^flex-/.test(retoId || '')
    root.setAttribute('data-layout', useStackedLayout ? 'stacked' : 'split')
}

async function initEditor(root, initialCss) {
    const container = root.querySelector('#editor')
    if (!container) return null

    const monaco = await loadMonaco()
    if (!monaco) return null

    return monaco.editor.create(container, {
        value: initialCss,
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 13
    })
}

function applyPreviewCss(preview, htmlBase, cssText) {
    let frame = preview.querySelector('iframe[data-reto-preview="true"]')

    if (!frame) {
        frame = document.createElement('iframe')
        frame.setAttribute('data-reto-preview', 'true')
        frame.setAttribute('title', 'Preview del reto CSS')
        frame.setAttribute('scrolling', 'no')
        frame.style.width = '100%'
        frame.style.minHeight = '280px'
        frame.style.height = '280px'
        frame.style.border = '0'
        preview.innerHTML = ''
        preview.appendChild(frame)
    }

    frame.onload = () => {
        resizePreviewFrame(frame)
        setTimeout(() => resizePreviewFrame(frame), 40)
    }

    frame.srcdoc = `<!doctype html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
            html, body {
                margin: 0;
                padding: 12px;
                font-family: system-ui, -apple-system, sans-serif;
                background: #fff;
                color: #1a1a1a;
            }
            ${cssText}
        </style>
    </head>
    <body>
        ${htmlBase}
    </body>
</html>`
}

function resizePreviewFrame(frame) {
    const doc = frame.contentDocument
    if (!doc) return

    const host = frame.closest('reto-css')
    const isStackedLayout = host?.getAttribute('data-layout') === 'stacked'

    const bodyHeight = doc.body ? doc.body.scrollHeight : 0
    const htmlHeight = doc.documentElement ? doc.documentElement.scrollHeight : 0
    const contentHeight = Math.max(bodyHeight, htmlHeight)

    const targetHeight = isStackedLayout
        ? Math.max(520, contentHeight + 8)
        : Math.max(280, Math.min(contentHeight + 8, 960))
    frame.style.height = `${targetHeight}px`
}

function validarReto(cssText, reglas) {
    if (!cssText || !Array.isArray(reglas) || !reglas.length) return false

    return reglas.every(regla => {
        const bloque = getCssBlock(cssText, regla.selector)
        if (!bloque) return false

        const valorActual = getCssPropertyValue(bloque, regla.propiedad)
        if (!valorActual) return false

        return normalizeCssValue(valorActual) === normalizeCssValue(regla.valor)
    })
}

function getCssBlock(cssText, selector) {
    const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`${escapedSelector}\\s*\\{([\\s\\S]*?)\\}`, 'i')
    const match = cssText.match(regex)
    return match ? match[1] : ''
}

function getCssPropertyValue(block, property) {
    const regex = new RegExp(`${property}\\s*:\\s*([^;]+)`, 'i')
    const match = block.match(regex)
    return match ? match[1].trim() : ''
}

function normalizeCssValue(value) {
    return value.toLowerCase().replace(/\s+/g, ' ').trim()
}

function loadMonaco() {
    if (window.monaco?.editor) {
        return Promise.resolve(window.monaco)
    }

    if (!monacoLoaderPromise) {
        monacoLoaderPromise = new Promise((resolve, reject) => {
            const existingLoader = document.querySelector('#monaco-loader')

            const onLoaderReady = () => {
                window.require.config({
                    paths: {
                        vs: `${MONACO_BASE_URL}/vs`
                    }
                })

                window.require(['vs/editor/editor.main'], () => {
                    resolve(window.monaco)
                }, reject)
            }

            if (existingLoader) {
                existingLoader.addEventListener('load', onLoaderReady, { once: true })
                existingLoader.addEventListener('error', reject, { once: true })
                return
            }

            const loader = document.createElement('script')
            loader.id = 'monaco-loader'
            loader.src = `${MONACO_BASE_URL}/vs/loader.js`
            loader.async = true
            loader.onload = onLoaderReady
            loader.onerror = () => reject(new Error('No se pudo cargar Monaco desde CDN'))
            document.head.appendChild(loader)
        }).catch(error => {
            monacoLoaderPromise = null
            throw error
        })
    }

    return monacoLoaderPromise
}

customElements.define('reto-css', RetoCSS)