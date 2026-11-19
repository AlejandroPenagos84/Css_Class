// html/modules/reto-html.js
// ─────────────────────────────────────────────
// <reto-html reto-id="..."> : el CSS queda fijo y el estudiante escribe HTML.
// La validación consulta el DOM del iframe (lib/validador-html.js).
// ─────────────────────────────────────────────

import { RetoBase } from '../../lib/reto-base.js'
import { validarHtml } from '../../lib/validador-html.js'
import { retosIntroHtml, retosImagenes } from '../data/retos-html.js'
import { retosListas, retosEnlaces } from '../data/retos-listas-enlaces.js'
import { retosTablas, retosFormularios } from '../data/retos-tablas-formularios.js'
import { retosSemantica, retosAccesibilidad } from '../data/retos-semantica-a11y.js'

const allRetos = [
    ...retosIntroHtml,
    ...retosListas,
    ...retosEnlaces,
    ...retosImagenes,
    ...retosTablas,
    ...retosFormularios,
    ...retosSemantica,
    ...retosAccesibilidad
]

class RetoHTML extends RetoBase {
    config = {
        lenguaje: 'html',
        tituloFijo: 'CSS fijo del reto (ya está hecho, no lo tocas)',
        tituloEditor: 'Tu HTML (editable)',
        switchCss: true
    }

    // Con el interruptor apagado se ve el HTML "pelado", solo con los estilos
    // por defecto del navegador: así se nota todo lo que aporta el CSS.
    get cssActivo() {
        return this.refs?.checkCss?.checked !== false
    }

    buscarReto(id) {
        const reto = allRetos.find(r => r.id === id)
        if (!reto) console.warn(`[reto-html] No existe el reto "${id}"`)
        return reto || allRetos[0]
    }

    codigoInicial(reto) { return reto.htmlBase }
    codigoFijo(reto) { return reto.cssBase }
    armarPreview(reto, html) {
        return this.cssActivo
            ? { html, css: reto.cssBase }
            : { html, css: '', sinEstilos: true }
    }
    layoutApilado(reto) { return Boolean(reto.apilado) }

    async validar(reto, _html, doc) {
        await esperarImagenes(doc)
        return validarHtml(doc, reto.reglas)
    }

    describir({ regla, ok, encontrados }) {
        if (ok || !regla.selector) return regla.mensaje
        return encontrados === 0
            ? `${regla.mensaje} — no se encontró`
            : `${regla.mensaje} — revisa este punto`
    }
}

// Las imágenes con loading="lazy" pueden terminar de cargar después del
// evento load del iframe. Esperamos un poco antes de validar.
function esperarImagenes(doc, timeout = 1500) {
    if (!doc) return Promise.resolve()
    const pendientes = Array.from(doc.images).filter(img => !img.complete)
    if (!pendientes.length) return Promise.resolve()

    const cargas = pendientes.map(img => new Promise(resolve => {
        img.addEventListener('load', resolve, { once: true })
        img.addEventListener('error', resolve, { once: true })
    }))
    return Promise.race([
        Promise.all(cargas),
        new Promise(resolve => setTimeout(resolve, timeout))
    ])
}

customElements.define('reto-html', RetoHTML)
