// modules/Modulo_Retos/reto.js
// ─────────────────────────────────────────────
// <reto-css reto-id="..."> : el HTML queda fijo y el estudiante escribe CSS.
// La validación usa el CSSOM del navegador (lib/validador-css.js).
// ─────────────────────────────────────────────

import { RetoBase } from '../../lib/reto-base.js'
import { validarCss } from '../../lib/validador-css.js'
import {
    retosSelectores,
    retosUnidades,
    retosBoxModel,
    retosDisplay,
    retosFlexbox,
    retosGrid,
    retosPosition,
    retosCascadaHover
} from '../../data/retos.js'

const allRetos = [
    ...retosSelectores,
    ...retosUnidades,
    ...retosBoxModel,
    ...retosDisplay,
    ...retosPosition,
    ...retosFlexbox,
    ...retosGrid,
    ...retosCascadaHover
]

class RetoCSS extends RetoBase {
    config = {
        lenguaje: 'css',
        tituloFijo: 'HTML fijo del reto',
        tituloEditor: 'Tu CSS (editable)'
    }

    buscarReto(id) {
        const reto = allRetos.find(r => r.id === id)
        if (!reto) console.warn(`[reto-css] No existe el reto "${id}"`)
        return reto || allRetos[0]
    }

    codigoInicial(reto) { return reto.cssBase }
    codigoFijo(reto) { return reto.htmlBase }
    armarPreview(reto, css) { return { html: reto.htmlBase, css } }
    layoutApilado(reto) { return /^(grid|flex)-/.test(reto.id) }

    validar(reto, css) {
        return validarCss(css, reto.reglas)
    }

    describir({ regla, ok, declarado }) {
        const esperado = Array.isArray(regla.valor) ? regla.valor.join(' o ') : regla.valor
        const base = `${regla.selector} { ${regla.propiedad}: ${esperado} }`
        if (ok) return base
        return declarado
            ? `${base} — escribiste "${declarado}"`
            : `${base} — aún no está declarado`
    }
}

customElements.define('reto-css', RetoCSS)
