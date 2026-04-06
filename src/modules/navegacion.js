// modules/navegacion.js
// ─────────────────────────────────────────────
// Responsabilidad: cambiar entre módulos
// No sabe nada de demos ni datos
// ─────────────────────────────────────────────

let moduloActual = 0
let modules = []
let navButtons = []

export function initNavegacion() {
  modules = Array.from(document.querySelectorAll('.module'))
  navButtons = Array.from(document.querySelectorAll('.nav-btn'))

  // Botones del nav superior
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const destino = parseInt(btn.dataset.target)
      irA(destino)
    })
  })

  // Botones "Siguiente" y "Anterior" del footer de cada módulo
  document.querySelectorAll('[data-next]').forEach(btn => {
    btn.addEventListener('click', () => irA(parseInt(btn.dataset.next)))
  })

  document.querySelectorAll('[data-prev]').forEach(btn => {
    btn.addEventListener('click', () => irA(parseInt(btn.dataset.prev)))
  })
}

export function irA(n) {
  if (!modules.length || !navButtons.length) return
  if (!modules[moduloActual] || !modules[n]) return

  // Ocultar módulo actual
  modules[moduloActual].classList.remove('visible')
  navButtons[moduloActual].classList.remove('active')

  // Mostrar módulo destino
  modules[n].classList.add('visible')
  navButtons[n].classList.add('active')

  moduloActual = n
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
