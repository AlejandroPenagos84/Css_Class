import templateHtml from './imagenes.html?raw'
import { resaltarHtml, escaparHtml } from '../../../lib/resaltar.js'

const estado = {
  src: 'img/gato.svg',
  alt: 'Gato naranja sonriendo',
  width: '200',
  envoltura: ''
}

class ImagenesHTML extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return
    this._loaded = true

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
    const template = doc.querySelector('template')
    if (!template) return
    this.appendChild(template.content.cloneNode(true))

    initDemoImagenes(this)
  }
}

function construirHtml() {
  const img = `<img src="${escaparHtml(estado.src)}" alt="${escaparHtml(estado.alt)}" width="${estado.width}">`
  if (estado.envoltura === 'figure') {
    return `<figure>\n  ${img}\n  <figcaption>Mi foto favorita</figcaption>\n</figure>`
  }
  if (estado.envoltura === 'a') {
    return `<a href="https://developer.mozilla.org">\n  ${img}\n</a>`
  }
  return img
}

function nota() {
  const roto = estado.src.includes('gatto')
  if (roto && estado.alt) return 'La ruta está mal escrita: el navegador no encuentra la imagen y muestra el texto del alt en su lugar.'
  if (roto) return 'Ruta rota y sin alt: el usuario no ve nada ni sabe qué había. Por eso el alt nunca debe faltar.'
  if (!estado.alt) return 'Sin alt, un lector de pantalla solo dice "imagen" (o lee el nombre del archivo).'
  if (estado.envoltura === 'figure') return '<figure> agrupa la imagen con su pie de foto <figcaption>.'
  if (estado.envoltura === 'a') return 'Dentro de un <a>, toda la imagen es clicable. El alt debe describir a dónde lleva.'
  return 'Cambia los atributos y mira cómo cambia el código y el resultado.'
}

function initDemoImagenes(root) {
  const preview = root.querySelector('#imgPreview')
  const code = root.querySelector('#imgCode')
  const notaBox = root.querySelector('#imgNota')
  // En la página, las imágenes viven en /img/ (carpeta public)
  const base = import.meta.env.BASE_URL

  const render = () => {
    const html = construirHtml()
    code.innerHTML = resaltarHtml(html)
    preview.innerHTML = html.replace(/src="img\//g, `src="${base}img/`)
    preview.querySelectorAll('a').forEach(a => {
      a.target = '_blank'
      a.rel = 'noopener'
    })
    notaBox.textContent = nota()
  }

  root.querySelectorAll('[data-img-prop]').forEach(grupo => {
    const prop = grupo.dataset.imgProp
    grupo.querySelectorAll('.ctrl-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        estado[prop] = btn.dataset.value
        grupo.querySelectorAll('.ctrl-btn').forEach(b => b.classList.remove('sel'))
        btn.classList.add('sel')
        render()
      })
    })
  })

  render()
}

customElements.define('imagenes-html', ImagenesHTML)
