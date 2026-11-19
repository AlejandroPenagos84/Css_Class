import templateHtml from './semantica.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'

const ejemplos = {
  sopa: {
    label: '❌ sopa de divs',
    nota: 'Se ve bien con CSS, pero para un lector de pantalla o Google todo esto es "una caja dentro de otra caja".',
    html: `<div class="cabecera">
  <div class="titulo">Mi blog</div>
  <div class="menu">
    <a href="#">Inicio</a> <a href="#">Posts</a>
  </div>
</div>
<div class="contenido">
  <div class="post">
    <div class="titulo-post">Aprendiendo HTML</div>
    <div>Hoy aprendí semántica…</div>
  </div>
</div>
<div class="pie">© 2026</div>`
  },
  semantico: {
    label: '✅ semántico',
    nota: 'Mismo contenido, pero cada etiqueta dice qué es. Un lector de pantalla puede saltar directo al <main> o al <nav>.',
    html: `<header>
  <h1>Mi blog</h1>
  <nav>
    <a href="#">Inicio</a> <a href="#">Posts</a>
  </nav>
</header>
<main>
  <article>
    <h2>Aprendiendo HTML</h2>
    <p>Hoy aprendí semántica…</p>
  </article>
</main>
<footer>© 2026</footer>`
  },
  articulo: {
    label: 'article completo',
    nota: '<time datetime> da la fecha en un formato que entienden las máquinas, y el texto en el que entendemos nosotros.',
    html: `<article>
  <header>
    <h2>Nuevo curso de HTML</h2>
    <p>Publicado el <time datetime="2026-11-19">19 de noviembre</time></p>
  </header>
  <p>Ya está disponible la guía interactiva…</p>
  <footer>Etiquetas: <a href="#">html</a>, <a href="#">web</a></footer>
</article>`
  },
  otras: {
    label: 'figure, blockquote, address',
    nota: 'Hay etiquetas para casi todo: citas, direcciones de contacto, detalles desplegables…',
    html: `<blockquote cite="https://www.w3.org">
  <p>La web es para todos.</p>
</blockquote>
<address>Contacto: <a href="mailto:hola@ejemplo.com">hola@ejemplo.com</a></address>
<details>
  <summary>¿Qué es semántica? (clic)</summary>
  <p>Usar la etiqueta que describe el significado del contenido.</p>
</details>`
  }
}

definirModulo('semantica-html', templateHtml, root => {
  initDemoEjemplos(root.querySelector('[data-demo="semantica"]'), ejemplos)
})
