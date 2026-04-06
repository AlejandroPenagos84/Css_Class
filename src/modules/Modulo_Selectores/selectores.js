import templateHtml from './selectores.html?raw'
import { selectores } from '../../data/selectores.js'

class SelectoresCSS extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return;
    this._loaded = true;

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
    const template = doc.querySelector('template');
    if (!template) return;

    this.appendChild(template.content.cloneNode(true));
    initDemoSelectores();
  }
}

customElements.define('selectores-css', SelectoresCSS);

function initDemoSelectores() {
  const preview = document.getElementById('selPreview')
  const codeBlock = document.getElementById('selCode')
  const botones = document.querySelectorAll('#selectorBtns .ctrl-btn')

  if (!preview || !codeBlock || !botones.length) return

  // Mostrar el primer selector por defecto
  mostrar('elem')

  // Escuchar clics en los botones
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.selector

      // Actualizar estado visual de los botones
      botones.forEach(b => b.classList.remove('sel'))
      btn.classList.add('sel')

      mostrar(tipo)
    })
  })

  function mostrar(tipo) {
    const data = selectores[tipo]
    if (!data) return

    preview.innerHTML = data.html
    codeBlock.innerHTML = data.code
  }
}
