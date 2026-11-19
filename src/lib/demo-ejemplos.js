// lib/demo-ejemplos.js
// ─────────────────────────────────────────────
// Demo genérica "elige un ejemplo": botones arriba, resultado renderizado,
// código resaltado y una nota explicativa. Lo que se ve en el código es
// exactamente lo que se pinta.
//
// Marcado esperado dentro del módulo (un bloque por demo):
//   <div data-demo="listas">
//     <div class="demo-area">
//       <div class="demo-controls">
//         <div class="ctrl-label">Elige un ejemplo:</div>
//         <div class="btn-group" data-demo-btns></div>
//       </div>
//       <div class="demo-preview html-render" data-demo-preview></div>
//     </div>
//     <div class="code-block" data-demo-code></div>
//     <div class="info-box" data-demo-nota></div>
//   </div>
//
// Datos: { clave: { label: 'ul', html: '<ul>...</ul>', nota: '...' }, ... }
// ─────────────────────────────────────────────

import { resaltarHtml } from './resaltar.js'

export function initDemoEjemplos(contenedor, ejemplos) {
    if (!contenedor) return
    const btns = contenedor.querySelector('[data-demo-btns]')
    const preview = contenedor.querySelector('[data-demo-preview]')
    const code = contenedor.querySelector('[data-demo-code]')
    const nota = contenedor.querySelector('[data-demo-nota]')
    const base = import.meta.env.BASE_URL

    const mostrar = clave => {
        const data = ejemplos[clave]
        if (!data) return
        // En la página real las imágenes viven en /img/ (carpeta public)
        preview.innerHTML = data.html.replace(/(src|href)="img\//g, `$1="${base}img/`)
        code.innerHTML = resaltarHtml(data.html)
        if (nota) nota.textContent = data.nota || ''
        btns.querySelectorAll('.ctrl-btn').forEach(b => b.classList.toggle('sel', b.dataset.clave === clave))
    }

    btns.innerHTML = ''
    for (const [clave, data] of Object.entries(ejemplos)) {
        const btn = document.createElement('button')
        btn.className = 'ctrl-btn'
        btn.dataset.clave = clave
        btn.textContent = data.label
        btn.addEventListener('click', () => mostrar(clave))
        btns.appendChild(btn)
    }

    protegerDemo(preview)
    mostrar(Object.keys(ejemplos)[0])
}

// Los enlaces y formularios de una demo no deben sacar al usuario de la guía
export function protegerDemo(preview) {
    if (!preview || preview._protegida) return
    preview._protegida = true

    preview.addEventListener('click', e => {
        const a = e.target.closest('a[href]')
        if (!a || a.hasAttribute('download')) return
        const href = a.getAttribute('href')
        e.preventDefault()
        if (href.startsWith('#')) {
            const destino = href.length > 1 ? preview.querySelector(`[id="${CSS.escape(href.slice(1))}"]`) : null
            destino?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            destino?.animate?.([{ background: '#FAC775' }, { background: 'transparent' }], { duration: 900 })
        } else if (/^(https?:|mailto:|tel:)/.test(href)) {
            window.open(href, '_blank', 'noopener')
        }
    })

    preview.addEventListener('submit', e => {
        e.preventDefault()
        mostrarEnvio(e.target, preview)
    })
}

// Muestra los datos que "se habrían enviado" en vez de recargar la página
export function mostrarEnvio(form, contenedor) {
    const datos = Array.from(new FormData(form).entries())
        .map(([k, v]) => `${k} = ${v instanceof File ? v.name : v}`)
    const doc = contenedor.ownerDocument
    let aviso = contenedor.querySelector('.envio-simulado')
    if (!aviso) {
        aviso = doc.createElement('pre')
        aviso.className = 'envio-simulado'
        aviso.style.cssText =
            'margin:12px 0 0;padding:10px 12px;background:#E1F5EE;color:#085041;border-radius:8px;font:12px/1.6 monospace;white-space:pre-wrap'
        contenedor.appendChild(aviso)
    }
    aviso.textContent = datos.length
        ? `✔ Formulario enviado (simulado). Datos:\n${datos.join('\n')}`
        : '✔ Formulario enviado (simulado), pero ningún campo tiene name: no se envió ningún dato.'
}
