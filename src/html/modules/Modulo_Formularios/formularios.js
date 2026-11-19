import templateHtml from './formularios.html?raw'
import { definirModulo } from '../../../lib/modulo.js'
import { initDemoEjemplos } from '../../../lib/demo-ejemplos.js'
import { resaltarHtml } from '../../../lib/resaltar.js'

const CAMPO = `<label for="correo">Correo</label>
<input type="email" id="correo" name="correo" required>`

const ejemplos = {
  texto: {
    label: 'text / email / password',
    nota: 'Escribe un correo inválido y envía: el navegador lo valida solo gracias a type="email" y required.',
    html: `<form>
  <p>
    <label for="d-nombre">Nombre</label><br>
    <input type="text" id="d-nombre" name="nombre" required>
  </p>
  <p>
    <label for="d-correo">Correo</label><br>
    <input type="email" id="d-correo" name="correo" required>
  </p>
  <p>
    <label for="d-clave">Contraseña</label><br>
    <input type="password" id="d-clave" name="clave" minlength="6">
  </p>
  <button type="submit">Enviar</button>
</form>`
  },
  numeros: {
    label: 'number / range / date',
    nota: 'Cada type trae su propio control: flechas para números, un deslizador, un calendario.',
    html: `<form>
  <p>
    <label for="d-edad">Edad</label>
    <input type="number" id="d-edad" name="edad" min="0" max="120">
  </p>
  <p>
    <label for="d-vol">Volumen</label>
    <input type="range" id="d-vol" name="volumen" min="0" max="10">
  </p>
  <p>
    <label for="d-fecha">Fecha</label>
    <input type="date" id="d-fecha" name="fecha">
  </p>
  <button>Enviar</button>
</form>`
  },
  opciones: {
    label: 'radio / checkbox',
    nota: 'Los radio con el mismo name forman un grupo: solo se puede elegir uno. Los checkbox son independientes.',
    html: `<form>
  <fieldset>
    <legend>Tamaño</legend>
    <label><input type="radio" name="tamano" value="s"> Pequeño</label>
    <label><input type="radio" name="tamano" value="m" checked> Mediano</label>
    <label><input type="radio" name="tamano" value="l"> Grande</label>
  </fieldset>
  <p>
    <label><input type="checkbox" name="extra" value="leche"> Con leche</label>
    <label><input type="checkbox" name="extra" value="azucar"> Con azúcar</label>
  </p>
  <button>Pedir</button>
</form>`
  },
  select: {
    label: 'select / textarea',
    nota: '<select> es una lista desplegable; <textarea> es un texto de varias líneas.',
    html: `<form>
  <p>
    <label for="d-ciudad">Ciudad</label>
    <select id="d-ciudad" name="ciudad">
      <option value="">-- Elige --</option>
      <option value="bog">Bogotá</option>
      <option value="med">Medellín</option>
    </select>
  </p>
  <p>
    <label for="d-msg">Mensaje</label><br>
    <textarea id="d-msg" name="mensaje" rows="3" maxlength="140"></textarea>
  </p>
  <button>Enviar</button>
</form>`
  },
  sinName: {
    label: '⚠ sin name',
    nota: 'Este campo no tiene name. Escribe algo y envía: no se envía ningún dato.',
    html: `<form>
  <label for="d-x">Usuario</label>
  <input type="text" id="d-x">
  <button>Enviar</button>
</form>`
  }
}

definirModulo('formularios-html', templateHtml, root => {
  root.querySelector('[data-codigo-campo]').innerHTML = resaltarHtml(CAMPO)
  initDemoEjemplos(root.querySelector('[data-demo="tipos"]'), ejemplos)
})
