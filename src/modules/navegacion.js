// modules/navegacion.js
// ─────────────────────────────────────────────
// Responsabilidad: cambiar entre módulos
// No sabe nada de demos ni datos
// ─────────────────────────────────────────────

let moduloActual = 0
let modules = []
let navButtons = []
let listenersReady = false

export function initNavegacion() {
  modules = Array.from(document.querySelectorAll('.module'))
  navButtons = Array.from(document.querySelectorAll('.nav-btn'))

  if (listenersReady) return
  listenersReady = true

  document.addEventListener('click', event => {
    const btn = event.target.closest('button')
    if (!btn || btn.disabled) return

    if (btn.dataset.target !== undefined) {
      irA(parseInt(btn.dataset.target, 10))
      return
    }

    if (btn.dataset.next !== undefined) {
      irA(parseInt(btn.dataset.next, 10))
      return
    }

    if (btn.dataset.prev !== undefined) {
      irA(parseInt(btn.dataset.prev, 10))
    }
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
