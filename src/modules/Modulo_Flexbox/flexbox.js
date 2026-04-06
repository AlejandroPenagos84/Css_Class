import templateHtml from './flexbox.html?raw'

class FlexboxCSS extends HTMLElement {
    connectedCallback() {
        if (this._loaded) return;
        this._loaded = true;

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
        const template = doc.querySelector('template');
        if (!template) return;

        this.appendChild(template.content.cloneNode(true));
        initDemoFlexbox();
    }
}

const estado = {
  dir:  'row',
  jc:   'flex-start',
  ai:   'stretch',
  wrap: 'nowrap',
}

// Mapeo: propiedad del estado → propiedad CSS real
const propCSS = {
  dir:  'flexDirection',
  jc:   'justifyContent',
  ai:   'alignItems',
  wrap: 'flexWrap',
}

export function initDemoFlexbox() {
  const contenedor = document.getElementById('flexContainer')
  const codeBlock  = document.getElementById('flexCode')

  // Cada grupo de botones tiene data-flex-prop con la clave del estado
  document.querySelectorAll('[data-flex-prop]').forEach(grupo => {
    const prop = grupo.dataset.flexProp

    grupo.querySelectorAll('.ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const valor = btn.dataset.value

        // Actualizar estado
        estado[prop] = valor

        // Actualizar botones del grupo
        grupo.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('sel'))
        btn.classList.add('sel')

        // Aplicar al contenedor
        contenedor.style[propCSS[prop]] = valor

        // Actualizar código
        actualizarCodigo(codeBlock)
      })
    })
  })

  // Mostrar código inicial
  actualizarCodigo(codeBlock)
}

function actualizarCodigo(codeBlock) {
  codeBlock.innerHTML = `<span class="hl-selector">.contenedor</span> {
  <span class="hl-prop">display</span>: <span class="hl-val">flex</span>;
  <span class="hl-prop">flex-direction</span>: <span class="hl-val">${estado.dir}</span>;
  <span class="hl-prop">justify-content</span>: <span class="hl-val">${estado.jc}</span>;
  <span class="hl-prop">align-items</span>: <span class="hl-val">${estado.ai}</span>;
  <span class="hl-prop">flex-wrap</span>: <span class="hl-val">${estado.wrap}</span>;
  <span class="hl-prop">gap</span>: <span class="hl-val">8px</span>;
}`
}

customElements.define('flexbox-css', FlexboxCSS);