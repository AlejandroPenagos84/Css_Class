// scripts/generar-soluciones.mjs
// ─────────────────────────────────────────────
// Genera SOLUCIONES.md con la respuesta de todos los retos (CSS y HTML).
//   npm run soluciones
// Las soluciones CSS se arman solas desde las reglas de cada reto.
// Las de HTML vienen de scripts/soluciones-html.mjs.
// ─────────────────────────────────────────────

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { solucionCss } from './solucion-css.mjs'
import * as css from '../src/data/retos.js'
import { retosIntroHtml, retosImagenes } from '../src/html/data/retos-html.js'
import { retosListas, retosEnlaces } from '../src/html/data/retos-listas-enlaces.js'
import { retosTablas, retosFormularios } from '../src/html/data/retos-tablas-formularios.js'
import { retosSemantica, retosAccesibilidad } from '../src/html/data/retos-semantica-a11y.js'

// soluciones-html.mjs está en .gitignore (contiene las respuestas): en un clon
// nuevo no existe, y entonces el documento solo trae las soluciones de CSS.
let solucionesHtml = null
try {
  ({ solucionesHtml } = await import('./soluciones-html.mjs'))
} catch (error) {
  if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error
  console.warn('⚠ No existe scripts/soluciones-html.mjs: SOLUCIONES.md tendrá solo las soluciones de CSS.')
}

// Mismo orden que la navegación de cada guía
const modulosCss = [
  ['Selectores', css.retosSelectores],
  ['Valores y Unidades', css.retosUnidades],
  ['Cascada y Hover', css.retosCascadaHover],
  ['Box Model', css.retosBoxModel],
  ['Display', css.retosDisplay],
  ['Position', css.retosPosition],
  ['Flexbox', css.retosFlexbox],
  ['Grid', css.retosGrid]
]

const modulosHtml = [
  ['¿Qué es HTML?', retosIntroHtml],
  ['Listas', retosListas],
  ['Enlaces', retosEnlaces],
  ['Imágenes', retosImagenes],
  ['Tablas', retosTablas],
  ['Formularios', retosFormularios],
  ['Semántica', retosSemantica],
  ['Accesibilidad', retosAccesibilidad]
]

const titulo = reto => reto.titulo.replace(/^Reto:\s*/, '')
// Igual que GitHub: minúsculas, quita signos (conserva tildes), espacios → guiones
const ancla = texto => texto.toLowerCase()
  .replace(/[^\p{L}\p{N} -]/gu, '').trim().replace(/ /g, '-')
const bloque = (lenguaje, codigo) => `\`\`\`${lenguaje}\n${codigo.trim()}\n\`\`\``

const salida = []
const faltantes = []

salida.push(`# Soluciones de los retos

> Documento para el monitor. **No compartir con los estudiantes antes de la clase.**
>
> Se genera con \`npm run soluciones\`. Si cambias un reto, vuelve a generarlo en vez de editar este archivo.

Las soluciones son **una** respuesta válida, no la única. Los validadores aceptan variantes equivalentes:

- **CSS:** \`#fff\` = \`white\`, \`700\` = \`bold\`, \`0\` = \`0px\`, shorthand = longhands, espacios y mayúsculas da igual. Las unidades sí se exigen (\`24px\` no vale si se pide \`1.5rem\`).
- **HTML:** se revisa el DOM, así que no importan el orden de los atributos, las comillas ni los textos exactos (salvo que el reto los pida).

## Contenido

- [Guía CSS](#${ancla('Guía CSS')}) (${modulosCss.reduce((n, [, r]) => n + r.length, 0)} retos)
${modulosCss.map(([m]) => `  - [${m}](#${ancla(`CSS: ${m}`)})`).join('\n')}
- [Guía HTML](#${ancla('Guía HTML')}) (${modulosHtml.reduce((n, [, r]) => n + r.length, 0)} retos)
${modulosHtml.map(([m]) => `  - [${m}](#${ancla(`HTML: ${m}`)})`).join('\n')}

---

## Guía CSS
`)

for (const [modulo, retos] of modulosCss) {
  salida.push(`### CSS: ${modulo}\n`)
  for (const reto of retos) {
    const porSelector = new Map()
    for (const r of reto.reglas) {
      const valor = Array.isArray(r.valor) ? r.valor[0] : r.valor
      porSelector.set(r.selector, [...(porSelector.get(r.selector) || []), `${r.propiedad}: ${valor};`])
    }
    const declaraciones = [...porSelector]
      .map(([sel, decls]) => `\`${sel} { ${decls.join(' ')} }\``)
      .join('<br>')
    salida.push(`#### ${titulo(reto)}

\`${reto.id}\` · **Objetivo:** ${reto.instruccion}

**Lo que se debe escribir:**<br>${declaraciones}

<details>
<summary>CSS completo</summary>

${bloque('css', solucionCss(reto))}

</details>
`)
  }
}

salida.push('---\n\n## Guía HTML\n')
if (!solucionesHtml) salida.push('_Falta `scripts/soluciones-html.mjs`, así que aquí no hay soluciones de HTML._\n')

for (const [modulo, retos] of solucionesHtml ? modulosHtml : []) {
  salida.push(`### HTML: ${modulo}\n`)
  for (const reto of retos) {
    const sol = solucionesHtml[reto.id]
    if (!sol) {
      faltantes.push(reto.id)
      continue
    }
    salida.push(`#### ${titulo(reto)}

\`${reto.id}\` · **Objetivo:** ${reto.instruccion}

**Clave:** ${sol.clave}

${bloque('html', sol.html)}

<details>
<summary>Qué revisa el validador</summary>

${reto.reglas.map(r => `- ${r.mensaje}`).join('\n')}

</details>
`)
  }
}

// Escapa < y > fuera de los bloques de código para que GitHub no los tome como etiquetas
const md = salida.join('\n')
  .split(/(```[\s\S]*?```|`[^`\n]*`)/)
  .map((parte, i) => i % 2 === 1 ? parte : parte.replace(/<(?!\/?(br|details|summary)>)/g, '&lt;'))
  .join('')

const destino = resolve(import.meta.dirname, '..', 'SOLUCIONES.md')
writeFileSync(destino, md)
console.log(`✔ ${destino}`)

if (faltantes.length) {
  console.warn(`⚠ Retos HTML sin solución en scripts/soluciones-html.mjs: ${faltantes.join(', ')}`)
  process.exitCode = 1
}
