// ============================================================
// RETOS HTML — Tablas y Formularios
// Formato de reglas: ver lib/validador-html.js
// ============================================================

import { anchoFila, campoConEtiqueta, camposDeFormulario, textoDe } from './utils.js'

const CSS_TABLA = `table {
  border-collapse: collapse;
  min-width: 320px;
  font-size: 14px;
}
caption {
  font-weight: 700;
  padding: 6px;
  color: #085041;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px 12px;
  text-align: left;
}
thead th { background: #1D9E75; color: white; }
tbody tr:nth-child(even) { background: #f5f5f0; }
tfoot { font-weight: 700; background: #E1F5EE; }`

export const retosTablas = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'tabla-basica',
    titulo: 'Reto: Tu primera tabla',
    descripcion: 'Una tabla de precios con encabezado y datos.',
    instruccion:
      'Crea una <table> con una fila de encabezado (<th>: Producto y Precio) y al menos 2 filas de datos (<td>).',
    cssBase: CSS_TABLA,
    htmlBase: `<!-- Tu tabla aquí -->
`,
    reglas: [
      { selector: 'table', mensaje: 'Una <table>' },
      { selector: 'table tr', min: 3, mensaje: 'Al menos 3 filas <tr> (1 de encabezado + 2 de datos)' },
      { selector: 'table th', min: 2, mensaje: 'Al menos 2 celdas de encabezado <th>' },
      { selector: 'table th', texto: /producto/i, mensaje: 'Un <th> que dice "Producto"' },
      { selector: 'table th', texto: /precio/i, mensaje: 'Un <th> que dice "Precio"' },
      { selector: 'table td', min: 4, mensaje: 'Al menos 4 celdas de datos <td>' },
      {
        selector: 'table tr',
        prueba: (_, trs) => trs.every(tr => anchoFila(tr) === anchoFila(trs[0])),
        mensaje: 'Todas las filas tienen el mismo número de celdas'
      }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'tabla-estructura-medio',
    titulo: 'Reto: Tabla bien estructurada',
    descripcion: 'La tabla ya tiene los datos, pero no tiene estructura. Mira cómo cambia el estilo cuando la agregas.',
    instruccion:
      'Agrega un <caption> "Notas del semestre", envuelve la primera fila en <thead> y sus celdas como <th scope="col">, las de datos en <tbody> y la fila del promedio en <tfoot>.',
    cssBase: CSS_TABLA,
    htmlBase: `<table>
  <tr>
    <td>Materia</td>
    <td>Nota</td>
  </tr>
  <tr>
    <td>Programación</td>
    <td>4.5</td>
  </tr>
  <tr>
    <td>Cálculo</td>
    <td>3.8</td>
  </tr>
  <tr>
    <td>Promedio</td>
    <td>4.15</td>
  </tr>
</table>
`,
    reglas: [
      { selector: 'table > caption:first-child', texto: /notas del semestre/i, mensaje: '<caption> "Notas del semestre" como primer hijo de la tabla' },
      { selector: 'table > thead > tr > th[scope="col"]', min: 2, mensaje: 'El encabezado está en <thead> con <th scope="col">' },
      { selector: 'table > tbody > tr', min: 2, max: 2, mensaje: 'Las 2 materias están en <tbody>' },
      { selector: 'table > tfoot > tr', texto: /promedio/i, mensaje: 'La fila del promedio está en <tfoot>' },
      {
        selector: 'table > tbody td',
        texto: /programaci[oó]n/i,
        mensaje: 'Los datos originales siguen ahí'
      }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'tabla-horario-dificil',
    titulo: 'Reto: Horario con celdas combinadas',
    descripcion: 'Un horario real tiene clases que duran varias horas (rowspan) o actividades de varios días (colspan).',
    instruccion:
      'Completa el horario: "Programación" ocupa el lunes de 8:00 y 9:00 (rowspan="2"). "Taller" ocupa martes y miércoles a las 10:00 (colspan="2"). La tabla debe quedar cuadrada: 4 columnas en todas las filas.',
    cssBase: `${CSS_TABLA}
td[rowspan] { background: #CECBF6; color: #3C3489; font-weight: 600; }
td[colspan] { background: #FAC775; color: #412402; font-weight: 600; text-align: center; }`,
    htmlBase: `<table>
  <thead>
    <tr><th>Hora</th><th>Lunes</th><th>Martes</th><th>Miércoles</th></tr>
  </thead>
  <tbody>
    <tr><td>8:00</td>  <!-- Programación (2 horas) -->  <td>Inglés</td><td>Física</td></tr>
    <tr><td>9:00</td>  <td>Cálculo</td><td>Química</td></tr>
    <tr><td>10:00</td><td>Libre</td>  <!-- Taller (2 días) --> </tr>
  </tbody>
</table>
`,
    reglas: [
      { selector: 'td[rowspan="2"]', texto: /programaci[oó]n/i, mensaje: 'Una celda "Programación" con rowspan="2"' },
      { selector: 'td[colspan="2"]', texto: /taller/i, mensaje: 'Una celda "Taller" con colspan="2"' },
      {
        selector: 'table',
        prueba: (_, [tabla]) => {
          // Construye la cuadrícula real teniendo en cuenta rowspan y colspan
          const filas = Array.from(tabla.rows)
          const ocupadas = filas.map(() => [])
          filas.forEach((tr, f) => {
            let c = 0
            for (const celda of tr.cells) {
              while (ocupadas[f][c]) c++
              for (let df = 0; df < celda.rowSpan; df++) {
                for (let dc = 0; dc < celda.colSpan; dc++) {
                  if (ocupadas[f + df]) ocupadas[f + df][c + dc] = true
                }
              }
              c += celda.colSpan
            }
          })
          // Array.from rellena los huecos con undefined (every se los saltaría)
          return ocupadas.every(fila => fila.length === 4 && Array.from(fila).every(Boolean))
        },
        mensaje: 'La tabla queda cuadrada: 4 columnas en cada fila, sin huecos ni celdas sobrantes'
      },
      {
        selector: 'tbody td',
        prueba: (_, tds) => !tds.some(td => textoDe(td) === ''),
        mensaje: 'No hay celdas vacías'
      }
    ]
  }
]

// ============================================================

const CSS_FORM = `form {
  display: grid;
  gap: 10px;
  max-width: 340px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
}
label { font-size: 14px; font-weight: 600; }
input, select, textarea {
  font: inherit;
  padding: 6px 8px;
  border: 1px solid #bbb;
  border-radius: 6px;
}
input:user-invalid, textarea:user-invalid { border-color: #c0392b; background: #fdecea; }
input[type="radio"], input[type="checkbox"] { width: auto; }
fieldset { border: 1px solid #ddd; border-radius: 8px; }
button {
  padding: 8px;
  border: 0;
  border-radius: 6px;
  background: #1D9E75;
  color: white;
  font-weight: 600;
  cursor: pointer;
}`

export const retosFormularios = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'form-login-basico',
    titulo: 'Reto: Formulario de inicio de sesión',
    descripcion: 'El formulario más común de la web. Pruébalo: al enviarlo verás los datos que se mandarían.',
    instruccion:
      'Crea un <form> con: un campo de correo (type="email") y uno de contraseña (type="password"), ambos con <label for> conectado a su id, con name y required; y un <button type="submit">.',
    cssBase: CSS_FORM,
    htmlBase: `<form>
  <!-- Campos aquí -->
</form>
`,
    reglas: [
      { selector: 'form input[type="email"][name][required]', mensaje: 'Un input type="email" con name y required' },
      { selector: 'form input[type="password"][name][required]', mensaje: 'Un input type="password" con name y required' },
      {
        prueba: doc => {
          const campos = camposDeFormulario(doc)
          return campos.length >= 2 && campos.every(c => c.labels?.length > 0)
        },
        mensaje: 'Cada campo tiene un <label> conectado (for = id)'
      },
      { selector: 'form button[type="submit"], form input[type="submit"]', mensaje: 'Un botón de envío type="submit"' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'form-pedido-medio',
    titulo: 'Reto: Pedido de café',
    descripcion: 'Radio, checkbox y select: cada uno para un tipo de elección distinto.',
    instruccion:
      'Dentro de un <fieldset> con <legend>Tamaño</legend> crea 3 radio con el mismo name. Agrega 2 checkbox de extras y un <select name="pago"> con al menos 2 <option>. Todo con su label.',
    cssBase: CSS_FORM,
    htmlBase: `<form>
  <h3>Tu pedido</h3>
  <!-- Tamaño (radio) -->

  <!-- Extras (checkbox) -->

  <!-- Forma de pago (select) -->

  <button type="submit">Pedir</button>
</form>
`,
    reglas: [
      { selector: 'fieldset > legend', texto: /tama[nñ]o/i, mensaje: 'Un <fieldset> con <legend>Tamaño</legend>' },
      { selector: 'fieldset input[type="radio"]', min: 3, mensaje: '3 radio dentro del fieldset' },
      {
        selector: 'input[type="radio"]',
        prueba: (_, radios) => radios.length > 0 && radios.every(r => r.name && r.name === radios[0].name),
        mensaje: 'Todos los radio comparten el mismo name (así solo se elige uno)'
      },
      {
        selector: 'input[type="radio"], input[type="checkbox"]',
        prueba: (_, inputs) => inputs.every(i => i.value && i.value !== 'on'),
        mensaje: 'Cada radio y checkbox tiene su value'
      },
      { selector: 'input[type="checkbox"][name]', min: 2, mensaje: '2 checkbox con name' },
      { selector: 'select[name="pago"] > option', min: 2, mensaje: 'Un <select name="pago"> con al menos 2 <option>' },
      {
        prueba: doc => camposDeFormulario(doc).every(campoConEtiqueta),
        mensaje: 'Todos los campos tienen su label'
      }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'form-registro-dificil',
    titulo: 'Reto: Registro con validación nativa',
    descripcion: 'Sin una línea de JavaScript, el navegador puede validar todo. Prueba a enviar datos inválidos.',
    instruccion:
      'Crea un formulario de registro con: usuario (minlength="3", required), edad (type="number", min="18", max="99"), teléfono (type="tel" con pattern de 10 dígitos: [0-9]{10}), una <textarea> "bio" con maxlength="200" y un checkbox "Acepto los términos" required. Todos con label y name.',
    apilado: true,
    cssBase: CSS_FORM,
    htmlBase: `<form>
  <h3>Crear cuenta</h3>

  <button type="submit">Registrarme</button>
</form>
`,
    reglas: [
      { selector: 'input[name][required][minlength="3"]', mensaje: 'Usuario con minlength="3" y required' },
      { selector: 'input[type="number"][name][min="18"][max="99"]', mensaje: 'Edad: type="number" con min="18" y max="99"' },
      {
        selector: 'input[type="tel"][name][pattern]',
        prueba: (_, [tel]) => {
          const re = new RegExp(`^(?:${tel.getAttribute('pattern')})$`)
          return re.test('3001234567') && !re.test('300123') && !re.test('300abc4567')
        },
        mensaje: 'Teléfono type="tel" con un pattern que acepte exactamente 10 dígitos'
      },
      { selector: 'textarea[name][maxlength="200"]', mensaje: 'Una <textarea> con name y maxlength="200"' },
      { selector: 'input[type="checkbox"][name][required]', mensaje: 'Checkbox de términos con required' },
      {
        prueba: doc => {
          const campos = camposDeFormulario(doc)
          return campos.length >= 5 && campos.every(c => c.name && campoConEtiqueta(c))
        },
        mensaje: 'Todos los campos tienen name y label'
      },
      {
        selector: 'form',
        prueba: (_, [form]) => !form.checkValidity(),
        mensaje: 'El formulario vacío NO es válido (las validaciones funcionan)'
      }
    ]
  }
]
