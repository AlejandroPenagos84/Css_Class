// lib/validador-css.js
// ─────────────────────────────────────────────
// Valida el CSS del estudiante usando el parser del navegador (CSSOM),
// no expresiones regulares. Ventajas:
//   - Los selectores se comparan ya normalizados: ".padre   .hijo" == ".padre .hijo"
//   - ".hijo" NO coincide con ".hijo-x" ni con ".padre .hijo"
//   - Soporta listas de selectores: "h1, .destacado { ... }"
//   - Respeta la cascada: si la propiedad se declara varias veces, gana la última
//     (y !important gana a las normales)
//   - Entiende shorthands: "padding: 16px" cumple una regla de padding-top y viceversa
//   - Normaliza valores: espacios, mayúsculas, 0 vs 0px, white vs #fff, bold vs 700
//   - Mira dentro de @media / @supports / @layer
//
// Formato de una regla:
//   { selector: '.caja', propiedad: 'width', valor: '200px' }
//   valor también puede ser un arreglo de alternativas válidas: ['bold', '700']
// ─────────────────────────────────────────────

// Unidades de longitud/tamaño: si el valor esperado o el escrito las usan,
// NO comparamos valores computados (24px no debe aprobar un reto que pide 1.5rem).
const UNIDADES_RE =
  /\d(?:px|r?em|%|vw|vh|vmin|vmax|[sdl]v[hw]|v[bi]|ch|ex|fr|pt|pc|cm|mm|in|q|deg|rad|turn|s|ms)\b/i

export function validarCss(cssText, reglas) {
  const reglasCss = parsearReglas(cssText)

  const resultados = (reglas || []).map(regla => {
    const declarado = valorDeclarado(reglasCss, regla.selector, regla.propiedad)
    const esperados = Array.isArray(regla.valor) ? regla.valor : [regla.valor]
    const ok = declarado !== '' && esperados.some(v => valoresIguales(regla.propiedad, declarado, v))
    return { regla, ok, declarado }
  })

  return {
    aprobado: resultados.length > 0 && resultados.every(r => r.ok),
    resultados
  }
}

// ── Parseo ───────────────────────────────────

function crearHoja(cssText) {
  const hoja = new CSSStyleSheet()
  try {
    hoja.replaceSync(cssText || '')
  } catch {
    // replaceSync solo falla con entradas muy raras; tratamos como hoja vacía
  }
  return hoja
}

function parsearReglas(cssText) {
  const salida = []
  recorrer(crearHoja(cssText).cssRules, salida)
  return salida
}

function recorrer(lista, salida) {
  for (const regla of lista) {
    if (regla instanceof CSSStyleRule) {
      salida.push({ selectores: dividirSelectores(regla.selectorText), style: regla.style })
    } else if (regla.cssRules) {
      // @media, @supports, @layer, @container...
      recorrer(regla.cssRules, salida)
    }
  }
}

// Divide "a, b:is(c, d)" en ["a", "b:is(c, d)"] respetando paréntesis
function dividirSelectores(texto) {
  const partes = []
  let profundidad = 0
  let actual = ''
  for (const ch of texto) {
    if (ch === '(' || ch === '[') profundidad++
    if (ch === ')' || ch === ']') profundidad--
    if (ch === ',' && profundidad === 0) {
      partes.push(actual.trim())
      actual = ''
    } else {
      actual += ch
    }
  }
  if (actual.trim()) partes.push(actual.trim())
  return partes
}

// Pasa el selector esperado por el mismo parser para que la comparación sea exacta
const cacheSelectores = new Map()
function canonizarSelector(selector) {
  if (!cacheSelectores.has(selector)) {
    const regla = crearHoja(`${selector} {}`).cssRules[0]
    cacheSelectores.set(selector, regla instanceof CSSStyleRule ? regla.selectorText : selector.trim())
  }
  return cacheSelectores.get(selector)
}

// ── Lectura de valores ───────────────────────

function valorDeclarado(reglasCss, selector, propiedad) {
  const objetivo = canonizarSelector(selector)
  let valor = ''
  let importante = false

  for (const { selectores, style } of reglasCss) {
    if (!selectores.includes(objetivo)) continue

    const v = style.getPropertyValue(propiedad).trim()
    if (!v) continue

    const esImportante = style.getPropertyPriority(propiedad) === 'important'
    if (importante && !esImportante) continue

    valor = v
    importante = esImportante
  }

  return valor
}

// Serializa un valor a través del CSSOM: "0" → "0px", "  Tomato " → "tomato", etc.
function canonizarValor(propiedad, valor) {
  const style = document.createElement('div').style
  style.setProperty(propiedad, String(valor))
  const v = style.getPropertyValue(propiedad)
  return (v || String(valor)).trim().toLowerCase().replace(/\s+/g, ' ')
}

let sonda = null
function valorComputado(propiedad, valor) {
  if (!sonda) {
    sonda = document.createElement('div')
    sonda.setAttribute('aria-hidden', 'true')
    sonda.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;left:-9999px;top:0'
    document.body.appendChild(sonda)
  }
  sonda.style.setProperty(propiedad, valor)
  const v = getComputedStyle(sonda).getPropertyValue(propiedad)
  sonda.style.removeProperty(propiedad)
  return v
}

function valoresIguales(propiedad, declarado, esperado) {
  const a = canonizarValor(propiedad, declarado)
  const b = canonizarValor(propiedad, esperado)
  if (a === b) return true

  // Colores y palabras clave (white vs #fff, bold vs 700): comparar el valor computado.
  // Solo si ninguno usa unidades, para no aprobar 24px cuando se pide 1.5rem.
  if (UNIDADES_RE.test(a) || UNIDADES_RE.test(b)) return false
  const ca = valorComputado(propiedad, declarado)
  const cb = valorComputado(propiedad, esperado)
  return ca !== '' && ca === cb
}
