// lib/preview.js
// ─────────────────────────────────────────────
// Pinta HTML + CSS dentro de un iframe aislado (el CSS del reto no
// afecta a la guía y viceversa). Devuelve una promesa que se resuelve
// cuando el iframe terminó de cargar, con su document listo para consultar.
// ─────────────────────────────────────────────

import { protegerDemo } from './demo-ejemplos.js'

const BASE_CSS = `
html, body {
    margin: 0;
    padding: 12px;
    font-family: system-ui, -apple-system, sans-serif;
    background: #fff;
    color: #1a1a1a;
}
img { max-width: 100%; }
`

// sinEstilos: true → no se aplica ni BASE_CSS, solo los estilos por defecto del navegador
export function renderPreview(container, { html = '', css = '', sinEstilos = false, minHeight = 280, maxHeight = 960 } = {}) {
    let frame = container.querySelector('iframe[data-reto-preview]')

    if (!frame) {
        frame = document.createElement('iframe')
        frame.setAttribute('data-reto-preview', 'true')
        frame.setAttribute('title', 'Vista previa del reto')
        frame.style.width = '100%'
        frame.style.border = '0'
        frame.style.height = `${minHeight}px`
        container.innerHTML = ''
        container.appendChild(frame)
    }

    // <base> hace que las rutas relativas de imágenes (img/gato.jpg) apunten a /public
    const baseHref = new URL(import.meta.env.BASE_URL, window.location.href).href

    return new Promise(resolve => {
        frame.onload = () => {
            // Enlaces #ancla hacen scroll dentro del iframe, los externos abren otra
            // pestaña y los formularios muestran los datos en vez de navegar.
            if (frame.contentDocument?.body) protegerDemo(frame.contentDocument.body)
            const ajustar = () => ajustarAltura(frame, minHeight, maxHeight)
            ajustar()
            setTimeout(ajustar, 40)
            // Las imágenes cambian la altura cuando terminan de cargar
            frame.contentDocument?.querySelectorAll('img').forEach(img => {
                if (!img.complete) img.addEventListener('load', ajustar, { once: true })
            })
            resolve(frame.contentDocument)
        }

        frame.srcdoc = `<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="${baseHref}" />
    <style>${sinEstilos ? '' : BASE_CSS}</style>
    <style>${css}</style>
</head>
<body>
${html}
</body>
</html>`
    })
}

function ajustarAltura(frame, minHeight, maxHeight) {
    const doc = frame.contentDocument
    if (!doc) return
    const alto = Math.max(doc.body?.scrollHeight || 0, doc.documentElement?.scrollHeight || 0)
    frame.style.height = `${Math.max(minHeight, Math.min(alto + 8, maxHeight))}px`
}

// Pinta la lista de resultados de una validación en un <ul>
export function pintarResultados(lista, resultados, describir) {
    lista.innerHTML = ''
    for (const r of resultados) {
        const li = document.createElement('li')
        li.className = r.ok ? 'ok' : 'falla'
        li.textContent = `${r.ok ? '✔' : '✘'} ${describir(r)}`
        lista.appendChild(li)
    }
}
