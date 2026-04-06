import templateHtml from './grid.html?raw'

class GridCSS extends HTMLElement {
    connectedCallback() {
        if (this._loaded) return;
        this._loaded = true;

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
        const template = doc.querySelector('template');
        if (!template) return;

        this.appendChild(template.content.cloneNode(true));
        initDemoGrid();
    }
}

const estado = {
  cols: '1fr 1fr 1fr',
  gap:  '8px',
}

const propCSS = {
  cols: 'gridTemplateColumns',
  gap:  'gap',
}

export function initDemoGrid() {
  const contenedor = document.getElementById('gridContainer')
  const codeBlock  = document.getElementById('gridCode')

  document.querySelectorAll('[data-grid-prop]').forEach(grupo => {
    const prop = grupo.dataset.gridProp

    grupo.querySelectorAll('.ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const valor = btn.dataset.value

        estado[prop] = valor

        grupo.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('sel'))
        btn.classList.add('sel')

        contenedor.style[propCSS[prop]] = valor

        actualizarCodigo(codeBlock)
      })
    })
  })

  actualizarCodigo(codeBlock)
}

function actualizarCodigo(codeBlock) {
  codeBlock.innerHTML = `<span class="hl-selector">.contenedor</span> {
  <span class="hl-prop">display</span>: <span class="hl-val">grid</span>;
  <span class="hl-prop">grid-template-columns</span>: <span class="hl-val">${estado.cols}</span>;
  <span class="hl-prop">gap</span>: <span class="hl-val">${estado.gap}</span>;
}`
}

customElements.define('grid-css', GridCSS);
