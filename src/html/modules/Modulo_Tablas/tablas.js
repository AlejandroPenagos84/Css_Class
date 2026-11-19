import templateHtml from './tablas.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'
import { resaltarHtml } from '../../../lib/resaltar.js'

const ESQUELETO = `<table>
  <caption>Título de la tabla</caption>
  <thead>
    <tr> <th>Encabezado</th> <th>Encabezado</th> </tr>
  </thead>
  <tbody>
    <tr> <td>Dato</td> <td>Dato</td> </tr>
  </tbody>
</table>`

const ejemplos = {
  basica: {
    label: 'básica',
    nota: 'Cada <tr> es una fila; dentro van las celdas <th> (encabezado) o <td> (dato).',
    html: `<table>
  <tr>
    <th>Producto</th>
    <th>Precio</th>
  </tr>
  <tr>
    <td>Café</td>
    <td>$4.000</td>
  </tr>
  <tr>
    <td>Té</td>
    <td>$3.500</td>
  </tr>
</table>`
  },
  completa: {
    label: 'caption + thead/tbody/tfoot',
    nota: 'El caption da un título accesible; thead/tbody/tfoot separan encabezado, datos y totales.',
    html: `<table>
  <caption>Pedido #42</caption>
  <thead>
    <tr><th scope="col">Producto</th><th scope="col">Cant.</th></tr>
  </thead>
  <tbody>
    <tr><td>Café</td><td>2</td></tr>
    <tr><td>Pan</td><td>3</td></tr>
  </tbody>
  <tfoot>
    <tr><th scope="row">Total</th><td>5</td></tr>
  </tfoot>
</table>`
  },
  colspan: {
    label: 'colspan',
    nota: 'colspan="2" hace que una celda ocupe dos columnas. Esa fila tiene una celda menos.',
    html: `<table>
  <tr><th>Lunes</th><th>Martes</th><th>Miércoles</th></tr>
  <tr><td colspan="2">Taller (2 días)</td><td>Libre</td></tr>
</table>`
  },
  rowspan: {
    label: 'rowspan',
    nota: 'rowspan="2" hace que una celda ocupe dos filas. La fila de abajo tiene una celda menos.',
    html: `<table>
  <tr><th>Hora</th><th>Clase</th></tr>
  <tr><td>8:00</td><td rowspan="2">Programación (2 h)</td></tr>
  <tr><td>9:00</td></tr>
</table>`
  }
}

definirModulo('tablas-html', templateHtml, root => {
  root.querySelector('[data-codigo-tabla]').innerHTML = resaltarHtml(ESQUELETO)
  initDemoEjemplos(root.querySelector('[data-demo="tablas"]'), ejemplos)
})
