// lib/resaltar.js
// ─────────────────────────────────────────────
// Resalta HTML para mostrarlo en un .code-block.
// Escapa primero y luego colorea: etiquetas, atributos, valores y comentarios.
// ─────────────────────────────────────────────

export function escaparHtml(texto) {
    return String(texto)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
}

export function resaltarHtml(codigo) {
    return escaparHtml(codigo)
        .replace(/&lt;!--[\s\S]*?--&gt;/g, m => `<span class="hl-comment">${m}</span>`)
        .replace(/(&lt;\/?)([a-zA-Z][\w-]*)([\s\S]*?)(\/?&gt;)/g, (_, abre, tag, attrs, cierra) => {
            const attrsHl = attrs.replace(
                /([\w:-]+)(=)(&quot;[\s\S]*?&quot;)/g,
                '<span class="hl-prop">$1</span>$2<span class="hl-val">$3</span>'
            )
            return `${abre}<span class="hl-selector">${tag}</span>${attrsHl}${cierra}`
        })
}
