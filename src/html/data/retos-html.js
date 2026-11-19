// ============================================================
// RETOS HTML
// ------------------------------------------------------------
// Aquí el CSS es fijo (cssBase) y el estudiante escribe HTML (htmlBase).
// Las reglas consultan el DOM ya renderizado (ver lib/validador-html.js):
//   { selector, min?, max?, texto?, prueba?, mensaje }
//
// Imágenes disponibles en public/img/: gato.svg, paisaje.svg, avatar.svg, cafe.svg
// En el reto se escriben como ruta relativa: src="img/gato.svg"
// ============================================================

// Utilidades para las pruebas
const altValido = img => (img.getAttribute('alt') || '').trim().length > 0
const imagenCarga = img => img.complete && img.naturalWidth > 0

export const retosIntroHtml = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'html-texto-basico',
    titulo: 'Reto: Tu primer encabezado y párrafo',
    descripcion: 'Toda página empieza con un título y algo de texto.',
    instruccion:
      'Escribe un <h1> que diga "Mi primera página" y debajo un <p> que contenga una palabra en <strong>.',
    cssBase: `h1 { color: #1D9E75; }
strong { background: #FAC775; padding: 0 4px; }`,
    htmlBase: `<!-- Escribe tu h1 y tu párrafo aquí -->
`,
    reglas: [
      { selector: 'h1', max: 1, texto: /mi primera p[aá]gina/i, mensaje: 'Un único <h1> con el texto "Mi primera página"' },
      { selector: 'p', mensaje: 'Al menos un párrafo <p>' },
      { selector: 'p strong', mensaje: 'Un <strong> dentro del párrafo' },
      {
        selector: 'h1 ~ p',
        mensaje: 'El párrafo va después del <h1>'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'html-anidado-medio',
    titulo: 'Reto: Anidar etiquetas correctamente',
    descripcion: 'Las etiquetas se abren y se cierran en orden, como cajas dentro de cajas.',
    instruccion:
      'Crea un <article> que contenga un <h2>, un <p> con una palabra en <em> y un segundo <p> con un <a href="..."> a cualquier sitio.',
    cssBase: `article {
  border: 2px solid #1D9E75;
  border-radius: 10px;
  padding: 16px;
  max-width: 420px;
}
h2 { margin-top: 0; }
em { color: #c0392b; }`,
    htmlBase: `<!-- Escribe aquí tu <article> -->
`,
    reglas: [
      { selector: 'article', min: 1, max: 1, mensaje: 'Un <article>' },
      { selector: 'article > h2', mensaje: 'Un <h2> directamente dentro del <article>' },
      { selector: 'article > p', min: 2, mensaje: 'Dos <p> dentro del <article>' },
      { selector: 'article p em', mensaje: 'Un <em> dentro de un párrafo' },
      { selector: 'article p a[href]:not([href=""])', mensaje: 'Un enlace <a> con href dentro de un párrafo' }
    ]
  }
]

// ============================================================

export const retosImagenes = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'img-basico',
    titulo: 'Reto: Inserta una imagen',
    descripcion: 'La etiqueta <img> necesita dos atributos: src (qué imagen) y alt (qué muestra).',
    instruccion:
      'Agrega la imagen img/gato.svg con un texto alternativo que describa la imagen.',
    cssBase: `img {
  width: 200px;
  border-radius: 12px;
}`,
    htmlBase: `<h2>Mi mascota</h2>
<!-- Agrega la imagen aquí -->
`,
    reglas: [
      { selector: 'img[src$="gato.svg"]', mensaje: 'Una <img> con src="img/gato.svg"' },
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(altValido),
        mensaje: 'La imagen tiene un alt que no está vacío'
      },
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(imagenCarga),
        mensaje: 'La imagen carga (la ruta es correcta)'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'img-figure-medio',
    titulo: 'Reto: Imagen con pie de foto',
    descripcion: '<figure> agrupa una imagen con su descripción, que va en <figcaption>.',
    instruccion:
      'Envuelve la imagen img/paisaje.svg en un <figure> y agrega un <figcaption> con un pie de foto.',
    cssBase: `figure {
  max-width: 420px;
  margin: 0;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
}
figure img { display: block; width: 100%; }
figcaption {
  padding: 8px 12px;
  font-size: 14px;
  color: #555;
  background: #f9f9f7;
}`,
    htmlBase: `<img src="img/paisaje.svg" alt="Montañas al atardecer">
`,
    reglas: [
      { selector: 'figure', mensaje: 'Un <figure>' },
      { selector: 'figure > img[src$="paisaje.svg"]', mensaje: 'La imagen del paisaje dentro del <figure>' },
      { selector: 'figure > figcaption', texto: /\S/, mensaje: 'Un <figcaption> con texto dentro del <figure>' },
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(altValido),
        mensaje: 'Todas las imágenes tienen alt'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'img-enlace-medio',
    titulo: 'Reto: Una imagen que es un enlace',
    descripcion: 'Si pones una <img> dentro de un <a>, toda la imagen se vuelve clicable.',
    instruccion:
      'Convierte el avatar (img/avatar.svg) en un enlace a https://developer.mozilla.org. Dale a la imagen width="80" y height="80".',
    cssBase: `.perfil {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 600;
}
.perfil img { border-radius: 50%; }`,
    htmlBase: `<div class="perfil">
  <!-- El avatar va aquí, dentro de un enlace -->
  <span>Ada Lovelace</span>
</div>
`,
    reglas: [
      { selector: '.perfil a[href^="https://developer.mozilla.org"]', mensaje: 'Un <a> a https://developer.mozilla.org dentro de .perfil' },
      { selector: '.perfil a > img[src$="avatar.svg"]', mensaje: 'La imagen avatar.svg dentro del enlace' },
      { selector: 'img[width="80"][height="80"]', mensaje: 'La imagen tiene width="80" y height="80"' },
      {
        selector: 'img',
        prueba: (_, imgs) => imgs.every(altValido),
        mensaje: 'La imagen tiene alt (en un enlace, describe a dónde lleva)'
      }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'img-galeria-dificil',
    titulo: 'Reto: Galería accesible',
    descripcion: 'Una galería es una lista de figuras. El CSS ya está hecho: tú solo armas la estructura.',
    instruccion:
      'Dentro de <ul class="galeria"> crea 3 <li>, cada uno con un <figure> que tenga una <img> (distinta en cada uno, con alt y loading="lazy") y su <figcaption>.',
    cssBase: `.galeria {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
}
.galeria figure {
  margin: 0;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #ddd;
}
.galeria img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.galeria figcaption {
  padding: 6px 10px;
  font-size: 13px;
  color: #555;
}`,
    htmlBase: `<ul class="galeria">
  <!-- 3 elementos <li> aquí -->
</ul>
`,
    reglas: [
      { selector: 'ul.galeria > li', min: 3, mensaje: 'Tres <li> dentro de ul.galeria' },
      {
        selector: 'ul.galeria > li',
        prueba: (_, lis) => lis.every(li => li.querySelector(':scope > figure > img') && li.querySelector(':scope > figure > figcaption')),
        mensaje: 'Cada <li> tiene un <figure> con <img> y <figcaption>'
      },
      {
        selector: 'ul.galeria img',
        prueba: (_, imgs) => new Set(imgs.map(i => i.getAttribute('src'))).size === imgs.length,
        mensaje: 'Cada imagen es distinta'
      },
      {
        selector: 'ul.galeria img',
        prueba: (_, imgs) => imgs.every(altValido),
        mensaje: 'Todas las imágenes tienen alt'
      },
      {
        selector: 'ul.galeria img',
        prueba: (_, imgs) => imgs.every(i => i.getAttribute('loading') === 'lazy'),
        mensaje: 'Todas las imágenes tienen loading="lazy"'
      },
      {
        selector: 'ul.galeria img',
        prueba: (_, imgs) => imgs.every(imagenCarga),
        mensaje: 'Todas las imágenes cargan (rutas correctas)'
      }
    ]
  }
]
