// scripts/solucion-css.mjs
// ─────────────────────────────────────────────
// Construye la solución de un reto CSS a partir de su cssBase y sus reglas:
// cada declaración pedida se escribe dentro del bloque de su selector,
// reemplazando el comentario "/* ... aquí */". Si el selector no existe
// en el CSS base, se agrega un bloque nuevo al final.
// Se usa en Node (generar-soluciones.mjs) y en el navegador (para verificar).
// ─────────────────────────────────────────────

const escapar = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const COMENTARIO_AQUI = /\/\*[^*]*aqu[ií][^*]*\*\//

export function solucionCss(reto) {
  const porSelector = new Map()
  for (const r of reto.reglas) {
    const valor = Array.isArray(r.valor) ? r.valor[0] : r.valor
    if (!porSelector.has(r.selector)) porSelector.set(r.selector, [])
    porSelector.get(r.selector).push(`${r.propiedad}: ${valor};`)
  }

  let css = reto.cssBase
  const extra = []

  for (const [selector, decls] of porSelector) {
    // El selector debe empezar una línea (o ir tras un "}") y seguir con "{"
    const re = new RegExp(`(^|\\n|\\})([ \\t]*)${escapar(selector)}\\s*\\{([^}]*)\\}`, 'g')
    const bloques = [...css.matchAll(re)]
    const bloque = bloques.find(m => COMENTARIO_AQUI.test(m[3])) || bloques[0]

    if (!bloque) {
      extra.push(`${selector} {\n${decls.map(d => `  ${d}`).join('\n')}\n}`)
      continue
    }

    const [completo, , sangria, cuerpo] = bloque
    const multilinea = cuerpo.includes('\n')
    let nuevoCuerpo
    if (multilinea) {
      const lineas = decls.map(d => `${sangria}  ${d}`).join('\n')
      nuevoCuerpo = COMENTARIO_AQUI.test(cuerpo)
        ? cuerpo.replace(new RegExp(`[ \\t]*${COMENTARIO_AQUI.source}`), lineas)
        : `${cuerpo.replace(/\s*$/, '')}\n${lineas}\n${sangria}`
    } else {
      const enLinea = decls.join(' ')
      nuevoCuerpo = COMENTARIO_AQUI.test(cuerpo)
        ? cuerpo.replace(COMENTARIO_AQUI, enLinea)
        : `${cuerpo.replace(/\s*$/, '')} ${enLinea} `
    }

    const reemplazo = completo.replace(`{${cuerpo}}`, `{${nuevoCuerpo}}`)
    css = css.slice(0, bloque.index) + reemplazo + css.slice(bloque.index + completo.length)
  }

  return extra.length ? `${css}\n\n${extra.join('\n\n')}` : css
}
