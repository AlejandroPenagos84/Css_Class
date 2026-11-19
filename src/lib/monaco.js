// lib/monaco.js
// ─────────────────────────────────────────────
// Carga Monaco desde el CDN una sola vez y crea editores.
// Lo usan los retos de CSS y los de HTML.
// ─────────────────────────────────────────────

const MONACO_VERSION = '0.52.0'
const MONACO_BASE_URL = `https://cdn.jsdelivr.net/npm/monaco-editor@${MONACO_VERSION}/min`
let monacoLoaderPromise = null

export async function crearEditor(container, { value = '', language = 'css', height } = {}) {
    if (!container) return null
    if (height) container.style.height = height

    const monaco = await loadMonaco()
    if (!monaco) return null

    return monaco.editor.create(container, {
        value,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 13,
        tabSize: 2,
        wordWrap: 'on',
        scrollBeyondLastLine: false
    })
}

export function loadMonaco() {
    if (window.monaco?.editor) {
        return Promise.resolve(window.monaco)
    }

    if (!monacoLoaderPromise) {
        monacoLoaderPromise = new Promise((resolve, reject) => {
            const loader = document.createElement('script')
            loader.id = 'monaco-loader'
            loader.src = `${MONACO_BASE_URL}/vs/loader.js`
            loader.async = true
            loader.onload = () => {
                window.require.config({ paths: { vs: `${MONACO_BASE_URL}/vs` } })
                window.require(['vs/editor/editor.main'], () => resolve(window.monaco), reject)
            }
            loader.onerror = () => reject(new Error('No se pudo cargar Monaco desde CDN'))
            document.head.appendChild(loader)
        }).catch(error => {
            monacoLoaderPromise = null
            throw error
        })
    }

    return monacoLoaderPromise
}
