import templateHtml from './accesibilidad.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'

const ejemplos = {
  botonMal: {
    label: '❌ div como botón',
    nota: 'Intenta llegar a este "botón" con Tab: no puedes. Tampoco responde a Enter, y un lector de pantalla no sabe que es un botón.',
    html: `<div style="display:inline-block;padding:6px 12px;background:#1D9E75;color:white;border-radius:6px;cursor:pointer">
  Guardar
</div>`
  },
  botonBien: {
    label: '✅ button',
    nota: 'Un <button> se enfoca con Tab, se activa con Enter o Espacio y se anuncia como "botón". Gratis.',
    html: `<button type="button">Guardar</button>`
  },
  icono: {
    label: 'botón con solo ícono',
    nota: 'Si el botón no tiene texto, aria-label le da un nombre que el lector de pantalla puede leer.',
    html: `<button type="button" aria-label="Cerrar">✕</button>
<button type="button" aria-label="Buscar">🔍</button>`
  },
  labelMal: {
    label: '❌ placeholder como label',
    nota: 'Escribe algo: la pista desaparece y ya no sabes qué campo era. Un lector de pantalla tampoco siempre la lee.',
    html: `<input type="text" placeholder="Nombre">
<input type="email" placeholder="Correo">`
  },
  labelBien: {
    label: '✅ label',
    nota: 'El label siempre está visible y, al hacer clic en él, enfoca el campo (área de clic más grande).',
    html: `<label for="a-nombre">Nombre</label>
<input type="text" id="a-nombre">
<label for="a-correo">Correo</label>
<input type="email" id="a-correo">`
  },
  enlaces: {
    label: 'texto de enlaces',
    nota: 'Los lectores de pantalla pueden listar todos los enlaces. Una lista de "clic aquí, clic aquí" no sirve de nada.',
    html: `<p>❌ Para ver el horario <a href="#">haz clic aquí</a>.</p>
<p>✅ Consulta el <a href="#">horario de clases</a>.</p>`
  }
}

definirModulo('accesibilidad-html', templateHtml, root => {
  initDemoEjemplos(root.querySelector('[data-demo="a11y"]'), ejemplos)
})
