// ============================================================
// RETOS HTML — Semántica y Accesibilidad
// Formato de reglas: ver lib/validador-html.js
// ============================================================

import {
  altValido,
  camposDeFormulario,
  encabezadosEnOrden,
  textoDe
} from './utils.js'

// El CSS de estos retos usa selectores de ETIQUETA (header, nav, main…):
// la página solo se ve bien cuando la estructura es semántica.
const CSS_PAGINA = `body { padding: 0; }
header, nav, main, aside, footer, article, section {
  border-radius: 8px;
  padding: 10px 14px;
  margin: 8px;
}
header { background: #1D9E75; color: white; }
header h1 { margin: 0; font-size: 22px; }
nav { background: #085041; margin: 8px 0 0; }
nav a { color: white; margin-right: 12px; }
main { background: #f5f5f0; }
article { background: white; border: 1px solid #ddd; }
aside { background: #FAC775; color: #412402; }
footer { background: #333; color: #eee; font-size: 13px; }
time { font-style: italic; color: #555; }`

export const retosSemantica = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'sem-estructura-basico',
    titulo: 'Reto: El esqueleto de una página',
    descripcion: 'El CSS ya está listo, pero solo funciona con etiquetas semánticas. ¡Ármalo y mira cómo cobra color!',
    instruccion:
      'Crea un <header> con un <h1> y un <nav> (con 2 enlaces) dentro, luego un <main> con un párrafo y al final un <footer>.',
    cssBase: CSS_PAGINA,
    htmlBase: `<!-- Escribe la estructura aquí -->
`,
    reglas: [
      { selector: 'body > header', mensaje: 'Un <header>' },
      { selector: 'header h1', mensaje: 'Un <h1> dentro del header' },
      { selector: 'header nav a[href]', min: 2, mensaje: 'Un <nav> con 2 enlaces dentro del header' },
      { selector: 'body > main', min: 1, max: 1, mensaje: 'Un único <main>' },
      { selector: 'main p', mensaje: 'Un párrafo dentro del <main>' },
      { selector: 'body > footer', mensaje: 'Un <footer>' },
      {
        selector: 'body > header, body > main, body > footer',
        prueba: (_, [h, m, f]) =>
          h?.tagName === 'HEADER' && m?.tagName === 'MAIN' && f?.tagName === 'FOOTER',
        mensaje: 'El orden es header → main → footer'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'sem-articulo-medio',
    titulo: 'Reto: Una entrada de blog',
    descripcion: 'Un <article> puede tener su propio header y footer, y secciones internas.',
    instruccion:
      'Dentro del <main> crea un <article> con: un <header> que tenga un <h2> y un <time datetime="AAAA-MM-DD">, al menos 2 <section> cada una con su <h3>, y un <footer>. Al lado del article (dentro del main) agrega un <aside> con "Posts relacionados".',
    cssBase: CSS_PAGINA,
    htmlBase: `<main>
  <!-- Tu article y tu aside aquí -->
</main>
`,
    reglas: [
      { selector: 'main > article', mensaje: 'Un <article> dentro del <main>' },
      { selector: 'article > header > h2', mensaje: 'El article tiene un <header> con un <h2>' },
      {
        selector: 'article time[datetime]',
        prueba: (_, [t]) => /^\d{4}-\d{2}-\d{2}/.test(t.getAttribute('datetime')),
        mensaje: 'Un <time> con datetime en formato AAAA-MM-DD'
      },
      {
        selector: 'article > section',
        min: 2,
        prueba: (_, secciones) => secciones.every(s => s.querySelector(':scope > h3')),
        mensaje: 'Al menos 2 <section>, cada una con su <h3>'
      },
      { selector: 'article > footer', mensaje: 'El article tiene un <footer>' },
      { selector: 'main > aside', texto: /relacionad/i, mensaje: 'Un <aside> con "Posts relacionados" dentro del main' }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'sem-refactor-dificil',
    titulo: 'Reto: Adiós a la sopa de divs',
    descripcion: 'Esta página funciona, pero es pura sopa de divs. Refactorízala sin perder contenido.',
    instruccion:
      'Cambia cada <div> por la etiqueta semántica que corresponde (header, nav, main, article, aside, footer, h1, h2, p). Al final no debe quedar NINGÚN <div>, y el texto debe seguir igual.',
    apilado: true,
    cssBase: CSS_PAGINA,
    htmlBase: `<div class="cabecera">
  <div class="titulo">Noticias UD</div>
  <div class="menu">
    <a href="#">Inicio</a>
    <a href="#">Deportes</a>
    <a href="#">Cultura</a>
  </div>
</div>

<div class="contenido">
  <div class="noticia">
    <div class="titulo-noticia">Abren inscripciones a monitorías</div>
    <div class="texto">Este semestre habrá monitorías de Programación Avanzada los martes.</div>
  </div>

  <div class="lateral">
    <div class="texto">Lo más leído: Cómo aprobar Cálculo.</div>
  </div>
</div>

<div class="pie">Hecho por estudiantes, 2026</div>
`,
    reglas: [
      { selector: 'div', min: 0, max: 0, mensaje: 'No queda ningún <div>' },
      { selector: 'header h1', texto: /noticias ud/i, mensaje: '"Noticias UD" es un <h1> dentro de un <header>' },
      { selector: 'header nav a', min: 3, mensaje: 'Los 3 enlaces del menú están en un <nav> dentro del header' },
      { selector: 'main > article > h2', texto: /monitor[ií]as/i, mensaje: 'La noticia es un <article> en el <main> con su título <h2>' },
      { selector: 'main article p', texto: /martes/i, mensaje: 'El texto de la noticia es un <p>' },
      { selector: 'main > aside p, main > aside', texto: /m[aá]s le[ií]do/i, mensaje: 'Lo más leído está en un <aside>' },
      { selector: 'body > footer', texto: /estudiantes/i, mensaje: 'El pie es un <footer>' },
      { prueba: encabezadosEnOrden, mensaje: 'Los encabezados van en orden (h1 → h2)' }
    ]
  }
]

// ============================================================

const CSS_A11Y = `:focus-visible { outline: 3px solid #f39c12; outline-offset: 2px; }
.tarjeta {
  max-width: 360px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 14px;
  display: grid;
  gap: 8px;
}
.tarjeta img { width: 100%; border-radius: 6px; }
button, .boton {
  padding: 8px 12px;
  border: 0;
  border-radius: 6px;
  background: #1D9E75;
  color: white;
  font: inherit;
  cursor: pointer;
}
.cerrar { background: #c0392b; justify-self: end; padding: 4px 10px; }
label { font-size: 14px; font-weight: 600; }
input { font: inherit; padding: 6px; border: 1px solid #bbb; border-radius: 6px; }`

export const retosAccesibilidad = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'a11y-alt-label-basico',
    titulo: 'Reto: Arregla la tarjeta de suscripción',
    descripcion: 'Esta tarjeta se ve bien, pero un lector de pantalla no puede usarla. Encuentra los problemas.',
    instruccion:
      'Dale un alt descriptivo a la imagen y reemplaza el placeholder como única pista: agrega un <label for> conectado al campo de correo (puedes dejar el placeholder).',
    cssBase: CSS_A11Y,
    htmlBase: `<div class="tarjeta">
  <img src="img/cafe.svg">
  <h3>Club del café</h3>
  <p>Recibe una receta nueva cada semana.</p>
  <input type="email" id="correo" placeholder="Tu correo">
  <button>Suscribirme</button>
</div>
`,
    reglas: [
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(altValido),
        mensaje: 'La imagen tiene un alt que no está vacío'
      },
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(i => !/^(imagen|image|foto|img|cafe\.svg)$/i.test((i.alt || '').trim())),
        mensaje: 'El alt describe la imagen (no solo "imagen" o el nombre del archivo)'
      },
      { selector: 'label[for="correo"]', texto: /\S/, mensaje: 'Un <label for="correo"> con texto' },
      {
        prueba: doc => camposDeFormulario(doc).every(c => c.labels?.length > 0),
        mensaje: 'El campo de correo está conectado a su label'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'a11y-encabezados-medio',
    titulo: 'Reto: Ordena los encabezados',
    descripcion:
      'Alguien eligió los encabezados por su tamaño y no por su nivel. Para quien navega por encabezados, este documento es un caos.',
    instruccion:
      'Cambia las etiquetas de los encabezados para que haya un solo <h1> al inicio y ningún salto de nivel (de h2 no se puede pasar a h4). No cambies los textos.',
    cssBase: `h1, h2, h3, h4, h5, h6 { margin: 8px 0 4px; font-family: Georgia, serif; }
h1 { color: #1D9E75; }`,
    htmlBase: `<h3>Guía de estudio</h3>
<p>Todo lo que necesitas para el parcial.</p>

<h1>Unidad 1: HTML</h1>
<h4>Etiquetas básicas</h4>
<p>Párrafos, encabezados y listas.</p>
<h4>Formularios</h4>
<p>Inputs, labels y validación.</p>

<h1>Unidad 2: CSS</h1>
<h5>Selectores</h5>
<p>Clase, id y etiqueta.</p>
`,
    reglas: [
      { selector: 'h1', min: 1, max: 1, mensaje: 'Un único <h1>' },
      { selector: 'h1', texto: /gu[ií]a de estudio/i, mensaje: 'El <h1> es "Guía de estudio"' },
      { prueba: encabezadosEnOrden, mensaje: 'Ningún encabezado se salta un nivel' },
      {
        selector: 'h2',
        min: 2,
        prueba: (_, h2s) => h2s.some(h => /unidad 1/i.test(textoDe(h))) && h2s.some(h => /unidad 2/i.test(textoDe(h))),
        mensaje: 'Las dos unidades son <h2>'
      },
      { selector: 'h3', min: 3, mensaje: 'Los 3 subtemas son <h3>' }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'a11y-teclado-dificil',
    titulo: 'Reto: Que funcione con teclado',
    descripcion:
      'Prueba con Tab en la vista previa: los "botones" de esta ventana no se pueden alcanzar. Arréglalo con el HTML correcto.',
    instruccion:
      'Convierte los <div> que actúan como botón en <button type="button"> (conservando sus clases). El botón "✕" debe tener aria-label="Cerrar". Cambia el enlace "clic aquí" para que su texto diga a dónde lleva (ej: "términos del servicio").',
    cssBase: CSS_A11Y,
    htmlBase: `<div class="tarjeta">
  <div class="boton cerrar">✕</div>
  <h3>¿Guardar los cambios?</h3>
  <p>Para más información, <a href="#">clic aquí</a>.</p>
  <div class="boton">Guardar</div>
  <div class="boton">Descartar</div>
</div>
`,
    reglas: [
      { selector: '.boton:not(button)', min: 0, max: 0, mensaje: 'Ningún elemento .boton es un <div>' },
      { selector: 'button[type="button"]', min: 3, mensaje: '3 <button type="button">' },
      {
        selector: 'button',
        prueba: (_, btns) => btns.every(b => textoDe(b).length > 1 || (b.getAttribute('aria-label') || '').trim()),
        mensaje: 'Todos los botones tienen un nombre (texto o aria-label)'
      },
      { selector: 'button.cerrar[aria-label="Cerrar" i]', mensaje: 'El botón ✕ tiene aria-label="Cerrar"' },
      {
        selector: 'a',
        prueba: (_, as) => as.every(a => !/^(clic|click|haz clic|aqu[ií]|clic aqu[ií]|click here|haz clic aqu[ií]|m[aá]s)$/i.test(textoDe(a))),
        mensaje: 'Ningún enlace dice solo "clic aquí"'
      },
      { selector: 'button', texto: /guardar/i, mensaje: 'Se conservan los botones "Guardar" y "Descartar"' }
    ]
  }
]
