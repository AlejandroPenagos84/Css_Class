// lib/modulo.js
// ─────────────────────────────────────────────
// Evita repetir el mismo boilerplate en cada módulo de teoría:
//   definirModulo('listas-html', templateHtml, root => { ...demos... })
// Inserta el <template> del archivo .html y luego llama a init(root).
// ─────────────────────────────────────────────

export function definirModulo(tag, templateHtml, init = () => {}) {
    class Modulo extends HTMLElement {
        connectedCallback() {
            if (this._loaded) return
            this._loaded = true

            const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
            const template = doc.querySelector('template')
            if (!template) return
            this.appendChild(template.content.cloneNode(true))

            init(this)
        }
    }
    customElements.define(tag, Modulo)
}
