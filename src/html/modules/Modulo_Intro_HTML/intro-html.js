import templateHtml from './intro-html.html?raw'
import { etiquetas } from '../../data/etiquetas.js'
import { resaltarHtml } from '../../../lib/resaltar.js'
import { protegerDemo } from '../../../lib/demo-ejemplos.js'

const ESTRUCTURA = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Mi página</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1>Hola mundo</h1>
    <p>Mi primera página web.</p>
  </body>
</html>`

class IntroHTML extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return
    this._loaded = true

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
    const template = doc.querySelector('template')
    if (!template) return
    this.appendChild(template.content.cloneNode(true))

    this.querySelector('[data-codigo-estructura]').innerHTML = resaltarHtml(ESTRUCTURA)
    initDemoEtiquetas(this)
  }
}

function initDemoEtiquetas(root) {
  const preview = root.querySelector('#etiquetaPreview')
  const code = root.querySelector('#etiquetaCode')
  const nota = root.querySelector('#etiquetaNota')
  const botones = root.querySelectorAll('#etiquetaBtns .ctrl-btn')

  const mostrar = clave => {
    const data = etiquetas[clave]
    if (!data) return
    preview.innerHTML = data.html
    code.innerHTML = resaltarHtml(data.html)
    nota.textContent = data.nota
  }

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('sel'))
      btn.classList.add('sel')
      mostrar(btn.dataset.etiqueta)
    })
  })

  protegerDemo(preview)
  mostrar('encabezados')
}

customElements.define('intro-html', IntroHTML)
