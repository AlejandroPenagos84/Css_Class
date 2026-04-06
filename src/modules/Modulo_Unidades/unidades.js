import templateHtml from './unidades.html?raw'
import { unidades } from '../../data/unidades.js'

class UnidadesCSS extends HTMLElement {
    connectedCallback() {
        if (this._loaded) return;
        this._loaded = true;

        const doc = new DOMParser().parseFromString(templateHtml, 'text/html');
        const template = doc.querySelector('template');
        if (!template) return;

        this.appendChild(template.content.cloneNode(true));
        initDemoUnidades();
        initColorPicker();
    }
}


function initDemoUnidades() {
    const preview = document.getElementById('unitPreview')
    const codeBlock = document.getElementById('unitCode')
    const botones = document.querySelectorAll('#unidadesBtns .ctrl-btn')

    if (!preview || !codeBlock || !botones.length) return

    // Mostrar la primera unidad por defecto
    mostrar('px')

    // Escuchar clics en los botones
    botones.forEach(btn => {
        btn.addEventListener('click', () => {
            const tipo = btn.dataset.unit

            // Actualizar estado visual de los botones
            botones.forEach(b => b.classList.remove('sel'))
            btn.classList.add('sel')

            mostrar(tipo)
        })
    })

    function mostrar(tipo) {
        const data = unidades[tipo]
        if (!data) return

        preview.innerHTML = data.html
        codeBlock.innerHTML = data.code
    }
}

function initColorPicker() {
    if (!window.Pickr) return

    const pickerMount = document.getElementById('mi-color')
    if (!pickerMount) return

    const pickr = Pickr.create({
        el: pickerMount,        // dónde aparece
        container: pickerMount.parentElement,
        theme: 'nano',          // classic | monolith | nano
        default: '#1D9E75',     // color inicial
        showAlways: true,
        components: {
            preview: true,        // muestra el color actual vs el nuevo
            hue: true,            // barra de tono
            opacity: true,        // barra de opacidad

            interaction: {
                hex: true,          // muestra valor HEX
                rgba: true,         // muestra valor RGB
                hsla: true,         // muestra valor HSL
                input: true,        // permite escribir el valor
                save: true,         // botón guardar
            }
        }
    })

    pickr.on('save', (color) => {
        const hexColor = color.toHEXA().toString();
        document.getElementById('mi-color').style.backgroundColor = hexColor;
        pickr.hide();
    });
}

customElements.define('unidades-css', UnidadesCSS);