import templateHtml from './display.html?raw'

class DisplayCSS extends HTMLElement {
    connectedCallback() {
        if (this._loaded) return
        this._loaded = true

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
        const template = doc.querySelector('template')
        if (!template) return

        this.appendChild(template.content.cloneNode(true))
        initDemoDisplay()
    }
}

const estado = {
    layout: 'block',
    chip: 'inline'
}

export function initDemoDisplay() {
    const layout = document.getElementById('displayLayout')
    const chips = document.querySelectorAll('#displayInlineDemo .chip')
    const codeBlock = document.getElementById('displayCode')

    document.querySelectorAll('[data-display-prop]').forEach(grupo => {
        const prop = grupo.dataset.displayProp

        grupo.querySelectorAll('.ctrl-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const valor = btn.dataset.value
                estado[prop] = valor

                grupo.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('sel'))
                btn.classList.add('sel')

                aplicarEstado(layout, chips)
                actualizarCodigo(codeBlock)
            })
        })
    })

    aplicarEstado(layout, chips)
    actualizarCodigo(codeBlock)
}

function aplicarEstado(layout, chips) {
    if (!layout || !chips.length) return

    layout.style.display = estado.layout

    if (estado.layout === 'grid') {
        layout.style.gridTemplateColumns = 'repeat(3, 1fr)'
        layout.style.gap = '8px'
        layout.style.alignItems = ''
        layout.style.justifyContent = ''
    } else if (estado.layout === 'flex') {
        layout.style.gridTemplateColumns = ''
        layout.style.gap = '8px'
        layout.style.alignItems = 'stretch'
        layout.style.justifyContent = 'flex-start'
    } else {
        layout.style.gridTemplateColumns = ''
        layout.style.gap = ''
        layout.style.alignItems = ''
        layout.style.justifyContent = ''
    }

    chips.forEach(chip => {
        chip.style.display = estado.chip
    })
}

function actualizarCodigo(codeBlock) {
    if (!codeBlock) return

    codeBlock.innerHTML = `<span class="hl-selector">.layout</span> {
  <span class="hl-prop">display</span>: <span class="hl-val">${estado.layout}</span>;
}

<span class="hl-selector">.chip</span> {
  <span class="hl-prop">display</span>: <span class="hl-val">${estado.chip}</span>;
}`
}

customElements.define('display-css', DisplayCSS)
