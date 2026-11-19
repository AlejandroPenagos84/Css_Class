// ============================================================
// RETOS HTML — Listas y Enlaces
// Formato de reglas: ver lib/validador-html.js
// ============================================================

import { anclasValidas, textoDe } from './utils.js'

export const retosListas = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'lista-ul-basico',
    titulo: 'Reto: Lista de compras',
    descripcion: 'Una lista desordenada es la forma correcta de agrupar elementos sin orden.',
    instruccion: 'Crea una <ul> con al menos 3 productos, cada uno en su propio <li>.',
    cssBase: `ul {
  background: #f9f9f7;
  border: 1px dashed #1D9E75;
  border-radius: 8px;
  padding: 12px 32px;
  max-width: 280px;
}
li::marker { color: #1D9E75; }`,
    htmlBase: `<h3>Lista de compras</h3>
<!-- Tu lista aquí -->
`,
    reglas: [
      { selector: 'ul', mensaje: 'Una lista <ul>' },
      { selector: 'ul > li', min: 3, mensaje: 'Al menos 3 <li> dentro de la <ul>' },
      {
        selector: 'ul > li',
        prueba: (_, lis) => lis.every(li => textoDe(li) !== ''),
        mensaje: 'Ningún <li> está vacío'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'lista-receta-medio',
    titulo: 'Reto: Receta (ul + ol)',
    descripcion: 'Los ingredientes no tienen orden; los pasos sí. Cada uno usa su tipo de lista.',
    instruccion:
      'Bajo "Ingredientes" pon una <ul> con 3 o más ingredientes. Bajo "Preparación" pon una <ol> con 3 o más pasos.',
    cssBase: `.receta {
  font-family: Georgia, serif;
  max-width: 420px;
  border: 1px solid #ddb892;
  background: #fffaf3;
  border-radius: 10px;
  padding: 4px 20px 12px;
}
.receta h3 { color: #7f5539; border-bottom: 1px solid #ddb892; }
.receta ol li::marker { font-weight: bold; color: #7f5539; }`,
    htmlBase: `<div class="receta">
  <h2>Arepas</h2>
  <h3>Ingredientes</h3>

  <h3>Preparación</h3>

</div>
`,
    reglas: [
      { selector: '.receta ul > li', min: 3, mensaje: 'Una <ul> con al menos 3 ingredientes' },
      { selector: '.receta ol > li', min: 3, mensaje: 'Una <ol> con al menos 3 pasos' },
      {
        selector: '.receta h3',
        prueba: doc => {
          const [h3a, h3b] = doc.querySelectorAll('.receta h3')
          return h3a?.nextElementSibling?.tagName === 'UL' && h3b?.nextElementSibling?.tagName === 'OL'
        },
        mensaje: 'La <ul> va justo después de "Ingredientes" y la <ol> después de "Preparación"'
      }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'lista-anidada-dificil',
    titulo: 'Reto: Menú con submenús',
    descripcion: 'Los menús de navegación son listas de enlaces, y los submenús son listas anidadas.',
    instruccion:
      'Dentro del <nav> crea una <ul> con 3 opciones (cada una con un <a>). La opción "Productos" debe tener una sublista <ul> con 2 enlaces, ubicada DENTRO de su <li>.',
    cssBase: `nav ul { list-style: none; margin: 0; padding: 0; }
nav > ul { display: flex; gap: 8px; }
nav > ul > li {
  background: #1D9E75;
  border-radius: 8px;
  padding: 8px 12px;
}
nav a { color: white; text-decoration: none; font-weight: 600; }
nav li ul {
  margin-top: 6px;
  background: #085041;
  border-radius: 6px;
  padding: 6px 10px;
}
nav li ul a { font-weight: normal; font-size: 14px; }`,
    htmlBase: `<nav>
  <!-- Tu menú aquí -->
</nav>
`,
    reglas: [
      { selector: 'nav > ul > li', min: 3, mensaje: '3 opciones <li> en la lista principal del <nav>' },
      {
        selector: 'nav > ul > li',
        prueba: (_, lis) => lis.every(li => li.querySelector(':scope > a[href]')),
        mensaje: 'Cada opción tiene su enlace <a href>'
      },
      {
        selector: 'nav > ul > li > ul > li > a[href]',
        min: 2,
        mensaje: 'Una sublista con 2 enlaces dentro de un <li>'
      },
      {
        selector: 'nav > ul > li',
        prueba: (_, lis) => lis.some(li => /productos/i.test(textoDe(li.querySelector(':scope > a'))) && li.querySelector(':scope > ul')),
        mensaje: 'La sublista pertenece a la opción "Productos"'
      },
      {
        selector: 'nav ul > :not(li)',
        min: 0,
        max: 0,
        mensaje: 'Las <ul> solo tienen <li> como hijos directos'
      }
    ]
  }
]

// ============================================================

export const retosEnlaces = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'enl-externo-basico',
    titulo: 'Reto: Enlace a otro sitio',
    descripcion: 'Un enlace externo que se abra en otra pestaña, de forma segura.',
    instruccion:
      'Convierte el texto "documentación de MDN" en un enlace a https://developer.mozilla.org que se abra en una pestaña nueva (target="_blank" y rel="noopener").',
    cssBase: `a { color: #1D9E75; font-weight: 600; }
a[target="_blank"]::after { content: " ↗"; }`,
    htmlBase: `<p>Si tienes dudas, revisa la documentación de MDN.</p>
`,
    reglas: [
      { selector: 'p a[href^="https://developer.mozilla.org"]', mensaje: 'Un <a> dentro del párrafo con href a developer.mozilla.org' },
      { selector: 'a[href]', texto: /documentaci[oó]n de mdn/i, mensaje: 'El texto del enlace es "documentación de MDN"' },
      { selector: 'a[target="_blank"]', mensaje: 'target="_blank"' },
      { selector: 'a[target="_blank"][rel~="noopener"]', mensaje: 'rel="noopener" en el enlace que abre otra pestaña' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'enl-anclas-medio',
    titulo: 'Reto: Índice con anclas',
    descripcion: 'Un índice que salta a cada sección de la misma página. Prueba tus enlaces haciendo clic.',
    instruccion:
      'Dale un id a cada <section> (por ejemplo id="historia") y en el <nav> crea un enlace por sección con href="#su-id".',
    cssBase: `nav {
  display: flex;
  gap: 12px;
  padding: 8px 12px;
  background: #E1F5EE;
  border-radius: 8px;
}
nav a { color: #085041; font-weight: 600; }
section {
  border-left: 3px solid #1D9E75;
  padding-left: 12px;
  margin: 16px 0;
}`,
    htmlBase: `<nav>
  <!-- Enlaces del índice aquí -->
</nav>

<section>
  <h2>Historia</h2>
  <p>HTML lo creó Tim Berners-Lee en 1991.</p>
</section>

<section>
  <h2>Versiones</h2>
  <p>Hoy usamos HTML5, un estándar vivo.</p>
</section>

<section>
  <h2>Recursos</h2>
  <p>MDN es la mejor referencia.</p>
</section>
`,
    reglas: [
      { selector: 'section[id]:not([id=""])', min: 3, mensaje: 'Las 3 secciones tienen id' },
      { selector: 'nav a[href^="#"]', min: 3, mensaje: '3 enlaces con href="#..." en el <nav>' },
      { prueba: anclasValidas, mensaje: 'Cada href="#..." apunta a un id que existe' },
      {
        selector: 'section[id]',
        prueba: (doc, secciones) => secciones.every(s => doc.querySelector(`nav a[href="#${CSS.escape(s.id)}"]`)),
        mensaje: 'Cada sección tiene su enlace en el índice'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'enl-contacto-medio',
    titulo: 'Reto: Tarjeta de contacto',
    descripcion: 'Los enlaces no solo llevan a páginas: también pueden abrir el correo o el teléfono.',
    instruccion:
      'Completa la tarjeta: el correo debe ser un enlace mailto:, el teléfono un enlace tel: y "Descargar foto" un enlace a img/avatar.svg con el atributo download.',
    cssBase: `.contacto {
  display: grid;
  gap: 6px;
  max-width: 300px;
  padding: 16px;
  border-radius: 12px;
  background: #CECBF6;
  color: #3C3489;
}
.contacto a { color: #3C3489; font-weight: 600; }`,
    htmlBase: `<div class="contacto">
  <strong>Ada Lovelace</strong>
  <span>ada@ejemplo.com</span>
  <span>+57 300 123 4567</span>
  <span>Descargar foto</span>
</div>
`,
    reglas: [
      { selector: '.contacto a[href^="mailto:"]', mensaje: 'Un enlace mailto:' },
      { selector: '.contacto a[href^="tel:"]', mensaje: 'Un enlace tel:' },
      {
        selector: '.contacto a[href^="tel:"]',
        prueba: (_, as) => as.every(a => !/\s/.test(a.getAttribute('href'))),
        mensaje: 'El número en href="tel:" va sin espacios (ej: tel:+573001234567)'
      },
      { selector: '.contacto a[href$="avatar.svg"][download]', mensaje: 'Un enlace a img/avatar.svg con download' }
    ]
  }
]
