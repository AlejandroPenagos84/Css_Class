import templateHtml from './enlaces.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'

const ejemplos = {
  externo: {
    label: 'externo',
    nota: 'Lleva a otro sitio. Con target="_blank" se abre en una pestaña nueva.',
    html: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener">
  Documentación de MDN
</a>`
  },
  ancla: {
    label: 'ancla #id',
    nota: 'href="#precios" busca el elemento con id="precios" en la misma página. Haz clic y mira.',
    html: `<nav>
  <a href="#inicio-demo">Inicio</a> |
  <a href="#precios-demo">Precios</a>
</nav>
<h3 id="inicio-demo">Inicio</h3>
<p>Bienvenido a nuestra tienda.</p>
<h3 id="precios-demo">Precios</h3>
<p>Desde $10.000.</p>`
  },
  contacto: {
    label: 'mailto / tel',
    nota: 'mailto: abre el programa de correo; tel: abre el marcador en el celular.',
    html: `<p>Escríbenos a <a href="mailto:hola@ejemplo.com">hola@ejemplo.com</a></p>
<p>o llámanos al <a href="tel:+573001234567">300 123 4567</a></p>`
  },
  imagen: {
    label: 'imagen como enlace',
    nota: 'Todo lo que esté dentro del <a> se vuelve clicable, incluso una imagen.',
    html: `<a href="https://developer.mozilla.org" target="_blank" rel="noopener">
  <img src="img/cafe.svg" alt="Ir a la tienda de café" width="120">
</a>`
  },
  descarga: {
    label: 'download',
    nota: 'Con download el navegador descarga el archivo en vez de abrirlo.',
    html: `<a href="img/gato.svg" download="mi-gato.svg">Descargar el gato</a>`
  }
}

definirModulo('enlaces-html', templateHtml, root => {
  initDemoEjemplos(root.querySelector('[data-demo="enlaces"]'), ejemplos)
})
