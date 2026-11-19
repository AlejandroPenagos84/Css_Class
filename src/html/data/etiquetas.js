// html/data/etiquetas.js
// ─────────────────────────────────────────────
// Ejemplos de la demo "Etiquetas de texto" del módulo Intro.
// Cada entrada es solo HTML: la demo lo muestra resaltado Y renderizado,
// así que lo que ves en el código es exactamente lo que se pinta.
//
// Para agregar una etiqueta: añade una entrada y un botón con
// data-etiqueta="tuClave" en intro-html.html
// ─────────────────────────────────────────────

export const etiquetas = {
  encabezados: {
    nota: 'Hay 6 niveles. Usa uno solo <h1> por página y no te saltes niveles.',
    html: `<h1>Título principal</h1>
<h2>Sección</h2>
<h3>Subsección</h3>`
  },
  parrafo: {
    nota: 'El navegador junta los espacios y saltos de línea en uno solo.',
    html: `<p>Esto es un párrafo.
Este salto de línea no se ve.</p>
<p>Otro párrafo, con su propio espacio.</p>`
  },
  enfasis: {
    nota: '<strong> = importante, <em> = énfasis al leerlo. No son solo "negrita" y "cursiva".',
    html: `<p>Esto es <strong>muy importante</strong>
y esto lo digo <em>con énfasis</em>.</p>`
  },
  enlace: {
    nota: 'href dice a dónde va. target="_blank" lo abre en otra pestaña.',
    html: `<p>Lee la documentación en
<a href="https://developer.mozilla.org" target="_blank">MDN</a>.</p>`
  },
  listas: {
    nota: '<ul> = sin orden (viñetas), <ol> = con orden (números). Cada ítem es un <li>.',
    html: `<ul>
  <li>Café</li>
  <li>Té</li>
</ul>
<ol>
  <li>Hervir agua</li>
  <li>Servir</li>
</ol>`
  },
  otras: {
    nota: 'Algunas etiquetas no tienen cierre: <br>, <hr>, <img>, <input>.',
    html: `<p>Línea uno<br>Línea dos</p>
<hr>
<p>Usa <code>console.log()</code> y <mark>resalta</mark> lo clave.</p>`
  }
}
