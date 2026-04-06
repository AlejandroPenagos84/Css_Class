import templateHtml from './box-model.html?raw'

class BoxModelCSS extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return;
    this._loaded = true;

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
    const template = doc.querySelector('template');
    if (!template) return;

    this.appendChild(template.content.cloneNode(true));
    initDemoBoxModel();
  }
}

customElements.define('box-model-css', BoxModelCSS);

function initDemoBoxModel() {
  const caja = document.getElementById('boxDemo')

  const controles = [
    { rangeId: 'padRange', labelId: 'padVal', unidad: 'px', propiedad: 'padding' },
    { rangeId: 'marRange', labelId: 'marVal', unidad: 'px', propiedad: 'margin' },
    { rangeId: 'borRange', labelId: 'borVal', unidad: 'px', propiedad: 'borderWidth' },
    { rangeId: 'radRange', labelId: 'radVal', unidad: 'px', propiedad: 'borderRadius' },
  ]

  controles.forEach(({ rangeId, labelId, unidad, propiedad }) => {
    const slider = document.getElementById(rangeId)
    const label = document.getElementById(labelId)

    slider.addEventListener('input', () => {
      const valor = slider.value
      label.textContent = valor + unidad
      caja.style[propiedad] = valor + unidad
    })
  })
}

