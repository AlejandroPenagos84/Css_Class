// main.js
// ─────────────────────────────────────────────
// Punto de entrada de la aplicación.
// Solo importa e inicializa los módulos.
// Si algo no funciona, este es el primer lugar donde mirar.
// ─────────────────────────────────────────────

import './modules/Modulo_Intro_CSS/intro.js'
import './modules/Modulo_Selectores/selectores.js'
import './modules/Modulo_Unidades/unidades.js'
import './modules/Modulo_Box_Model/box-model.js'
import './modules/Modulo_Position/position.js'
import './modules/Modulo_Flexbox/flexbox.js'
import './modules/Modulo_Grid/grid.js'
import { initNavegacion } from './modules/navegacion.js'

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initNavegacion()
})
