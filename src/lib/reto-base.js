// lib/reto-base.js
// ─────────────────────────────────────────────
// Lógica común de un reto: editor Monaco + vista previa + evaluación.
// Cada tipo de reto (CSS, HTML) solo define qué se edita, qué queda fijo
// y cómo se valida. Ver Modulo_Retos/reto.js y Modulo_Retos_HTML/reto-html.js.
//
// Nada de IDs: cada instancia busca sus piezas con data-ref dentro de sí
// misma, así puede haber muchos retos en la misma página sin choques.
// ─────────────────────────────────────────────

import templateHtml from '../modules/Modulo_Retos/reto.html?raw'
import { crearEditor } from './monaco.js'
import { renderPreview, pintarResultados } from './preview.js'

export class RetoBase extends HTMLElement {
    static get observedAttributes() {
        return ['reto-id']
    }

    // ── A implementar por cada tipo de reto ──
    // buscarReto(id)            → objeto del reto
    // config                    → { lenguaje, tituloFijo, tituloEditor }
    // codigoInicial(reto)       → texto inicial del editor
    // codigoFijo(reto)          → texto que se muestra como "fijo"
    // armarPreview(reto, code)  → { html, css }
    // validar(reto, code, doc)  → { aprobado, resultados }
    // describir(resultado)      → texto de una línea del checklist
    // layoutApilado(reto)       → true si editor y preview van uno sobre otro

    connectedCallback() {
        if (this._loaded) return
        this._loaded = true

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
        const template = doc.querySelector('template')
        if (!template) return
        this.appendChild(template.content.cloneNode(true))

        this.refs = {}
        this.querySelectorAll('[data-ref]').forEach(el => {
            this.refs[el.dataset.ref] = el
        })

        this.refs.tituloFijo.textContent = this.config.tituloFijo
        this.refs.tituloEditor.textContent = this.config.tituloEditor

        this.refs.btnEvaluar.addEventListener('click', () => this.evaluar())
        this.refs.btnReiniciar.addEventListener('click', () => {
            if (this._reto && this._editor) this._editor.setValue(this.codigoInicial(this._reto))
        })

        this.cargar(this.getAttribute('reto-id'))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (!this._loaded || oldValue === newValue) return
        this.cargar(newValue)
    }

    async cargar(retoId) {
        const reto = this.buscarReto(retoId)
        if (!reto) return
        this._reto = reto

        const apilado = this.layoutApilado(reto)
        this.setAttribute('data-layout', apilado ? 'stacked' : 'split')

        this.refs.titulo.textContent = reto.titulo
        this.refs.descripcion.textContent = reto.descripcion
        this.refs.instruccion.textContent = reto.instruccion
        this.refs.codigoFijo.textContent = this.codigoFijo(reto)
        this.limpiarResultado()

        if (!this._editor) {
            try {
                this._editor = await crearEditor(this.refs.editor, {
                    value: this.codigoInicial(reto),
                    language: this.config.lenguaje
                })
            } catch (error) {
                this.refs.estado.textContent = 'No se pudo cargar el editor (¿sin internet?).'
                console.error(error)
                return
            }

            let timer = null
            this._editor.onDidChangeModelContent(() => {
                clearTimeout(timer)
                timer = setTimeout(() => {
                    this.actualizarPreview()
                    this.limpiarResultado()
                }, 150)
            })
        } else {
            this._editor.setValue(this.codigoInicial(reto))
        }

        this.actualizarPreview()
    }

    actualizarPreview() {
        if (!this._reto || !this._editor) return
        const apilado = this.getAttribute('data-layout') === 'stacked'
        this._previewDoc = renderPreview(this.refs.preview, {
            ...this.armarPreview(this._reto, this._editor.getValue()),
            minHeight: apilado ? 520 : 280,
            maxHeight: apilado ? 4000 : 960
        })
    }

    async evaluar() {
        if (!this._reto || !this._editor) return
        const codigo = this._editor.getValue()
        const doc = await this._previewDoc
        const { aprobado, resultados } = await this.validar(this._reto, codigo, doc)

        this.refs.estado.textContent = aprobado
            ? '¡Listo! Reto aprobado.'
            : `Te faltan ${resultados.filter(r => !r.ok).length} de ${resultados.length} puntos.`
        this.refs.estado.dataset.estado = aprobado ? 'ok' : 'falla'
        pintarResultados(this.refs.checklist, resultados, r => this.describir(r))
    }

    limpiarResultado() {
        this.refs.estado.textContent = ''
        delete this.refs.estado.dataset.estado
        this.refs.checklist.innerHTML = ''
    }
}
