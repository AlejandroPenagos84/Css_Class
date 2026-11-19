import templateHtml from './listas.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'

const ejemplos = {
  ul: {
    label: 'ul',
    nota: 'Cada elemento va en su propio <li>. El navegador pone las viñetas.',
    html: `<ul>
  <li>Harina</li>
  <li>Huevos</li>
  <li>Leche</li>
</ul>`
  },
  ol: {
    label: 'ol',
    nota: 'Los números los pone el navegador: si agregas un paso en medio, se renumeran solos.',
    html: `<ol>
  <li>Mezclar los ingredientes</li>
  <li>Calentar la sartén</li>
  <li>Servir</li>
</ol>`
  },
  olAtributos: {
    label: 'ol start / reversed / type',
    nota: 'start cambia el número inicial, reversed cuenta hacia atrás y type cambia el estilo (1, a, A, i, I).',
    html: `<ol start="5" reversed>
  <li>Quinto</li>
  <li>Cuarto</li>
</ol>
<ol type="a">
  <li>Opción a</li>
  <li>Opción b</li>
</ol>`
  },
  anidada: {
    label: 'anidada',
    nota: 'La sublista <ul> va dentro del <li> al que pertenece.',
    html: `<ul>
  <li>Frutas
    <ul>
      <li>Manzana</li>
      <li>Pera</li>
    </ul>
  </li>
  <li>Verduras</li>
</ul>`
  },
  dl: {
    label: 'dl',
    nota: 'Cada <dt> es un término y el <dd> que le sigue es su descripción.',
    html: `<dl>
  <dt>HTML</dt>
  <dd>Estructura del contenido.</dd>
  <dt>CSS</dt>
  <dd>Presentación y estilo.</dd>
</dl>`
  }
}

definirModulo('listas-html', templateHtml, root => {
  initDemoEjemplos(root.querySelector('[data-demo="listas"]'), ejemplos)
})
