// html/data/utils.js
// Funciones de apoyo para escribir la clave `prueba` de las reglas de los retos.

export const altValido = img => (img.getAttribute('alt') || '').trim().length > 0
export const imagenCarga = img => img.complete && img.naturalWidth > 0
export const textoDe = el => (el?.textContent || '').replace(/\s+/g, ' ').trim()

// Cada campo de formulario visible tiene un <label> asociado (o aria-label)
export const campoConEtiqueta = campo =>
  (campo.labels && campo.labels.length > 0) ||
  (campo.getAttribute('aria-label') || '').trim() !== '' ||
  campo.hasAttribute('aria-labelledby')

export const camposDeFormulario = doc =>
  Array.from(doc.querySelectorAll('input, select, textarea'))
    .filter(c => !['hidden', 'submit', 'button', 'reset', 'image'].includes(c.type))

// Los encabezados empiezan en h1 y nunca se saltan un nivel al bajar (h2 → h4 está mal)
export const encabezadosEnOrden = doc => {
  const niveles = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map(h => Number(h.tagName[1]))
  return niveles.length > 0 && niveles[0] === 1 &&
    niveles.every((n, i) => i === 0 || n <= niveles[i - 1] + 1)
}

// Todos los enlaces #ancla apuntan a un id que existe
export const anclasValidas = doc => {
  const anclas = Array.from(doc.querySelectorAll('a[href^="#"]'))
  return anclas.length > 0 && anclas.every(a => {
    const id = a.getAttribute('href').slice(1)
    return id && doc.getElementById(id)
  })
}

// Ancho efectivo de una fila de tabla contando colspan
export const anchoFila = tr =>
  Array.from(tr.cells).reduce((total, celda) => total + (celda.colSpan || 1), 0)
