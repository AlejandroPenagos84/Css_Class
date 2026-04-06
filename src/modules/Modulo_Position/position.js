import templateHtml from './position.html?raw'
import { posicionamiento } from '../../data/position.js'

class PositionCSS extends HTMLElement {
    connectedCallback() {
        if (this._loaded) return;
        this._loaded = true;

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
        const template = doc.querySelector('template');
        if (!template) return;

        this.appendChild(template.content.cloneNode(true));
        initDemoPosition();
    }
}

customElements.define('position-css', PositionCSS);

function initDemoPosition() {
    const preview = document.getElementById('posPreview')
    const codeBlock = document.getElementById('posCode')
    const desc = document.getElementById('posDesc')
    const botones = document.querySelectorAll('#positionBtns .ctrl-btn')

    // Mostrar el primer valor por defecto
    mostrar('static')

    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const tipo = btn.dataset.position

            botones.forEach(b => b.classList.remove('sel'))
            btn.classList.add('sel')

            mostrar(tipo)
        })
    })

    function mostrar(tipo) {
        const data = posicionamiento[tipo]
        if (!data) return

        preview.innerHTML = data.html
        codeBlock.innerHTML = data.code
        desc.textContent = data.desc
    }
}
