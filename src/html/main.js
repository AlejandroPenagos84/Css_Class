// html/main.js
// ─────────────────────────────────────────────
// Punto de entrada de la Guía HTML.
// Reutiliza la navegación y el footer de la guía CSS.
// ─────────────────────────────────────────────

import './html.css'
import './modules/Modulo_Intro_HTML/intro-html.js'
import './modules/Modulo_Listas/listas.js'
import './modules/Modulo_Enlaces/enlaces.js'
import './modules/Modulo_Imagenes/imagenes.js'
import './modules/Modulo_Tablas/tablas.js'
import './modules/Modulo_Formularios/formularios.js'
import './modules/Modulo_Semantica/semantica.js'
import './modules/Modulo_Accesibilidad/accesibilidad.js'
import './modules/reto-html.js'
import '../components/footer-module.js'
import { initNavegacion } from '../modules/navegacion.js'

document.addEventListener('DOMContentLoaded', () => {
  initNavegacion()
})
