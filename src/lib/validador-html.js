// lib/validador-html.js
// ─────────────────────────────────────────────
// Valida el HTML del estudiante consultando el DOM ya renderizado en el
// iframe de la vista previa. El navegador hace el parseo, así que no
// importan mayúsculas, comillas, espacios ni el orden de los atributos.
//
// Formato de una regla (todas las claves salvo selector/mensaje son opcionales):
//   {
//     selector: 'figure > img[alt]',   // qué buscar (querySelectorAll)
//     min: 1,                          // mínimo de coincidencias (por defecto 1)
//     max: 3,                          // máximo de coincidencias
//     texto: /hola/i,                  // alguna coincidencia debe contener este texto
//     prueba: (doc, nodos) => bool,    // validación libre para casos especiales
//     mensaje: 'La imagen va dentro de <figure>'
//   }
// ─────────────────────────────────────────────

export function validarHtml(doc, reglas) {
    const resultados = (reglas || []).map(regla => {
        if (!doc) return { regla, ok: false, encontrados: 0 }

        let nodos = []
        try {
            nodos = regla.selector ? Array.from(doc.body.querySelectorAll(regla.selector)) : []
        } catch {
            console.warn(`[validador-html] Selector inválido en la regla: ${regla.selector}`)
        }

        let ok = true
        const min = regla.min ?? (regla.selector ? 1 : 0)
        if (nodos.length < min) ok = false
        if (regla.max !== undefined && nodos.length > regla.max) ok = false

        if (ok && regla.texto !== undefined) {
            ok = nodos.some(n => coincideTexto(n.textContent, regla.texto))
        }

        if (ok && typeof regla.prueba === 'function') {
            try {
                ok = Boolean(regla.prueba(doc, nodos))
            } catch {
                ok = false
            }
        }

        return { regla, ok, encontrados: nodos.length }
    })

    return {
        aprobado: resultados.length > 0 && resultados.every(r => r.ok),
        resultados
    }
}

function coincideTexto(texto, esperado) {
    const limpio = (texto || '').replace(/\s+/g, ' ').trim()
    if (esperado instanceof RegExp) return esperado.test(limpio)
    return limpio.toLowerCase().includes(String(esperado).toLowerCase())
}
