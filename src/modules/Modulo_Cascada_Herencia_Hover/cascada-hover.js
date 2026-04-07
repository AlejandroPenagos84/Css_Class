import templateHtml from './cascada-hover.html?raw'

class CascadaHoverCSS extends HTMLElement {
  connectedCallback() {
    if (this._loaded) return
    this._loaded = true

    const doc = new DOMParser().parseFromString(templateHtml, 'text/html')
    const template = doc.querySelector('template')
    if (!template) return

    this.appendChild(template.content.cloneNode(true))
    initDemoCascada(this)
  }
}

const casos = {
  orden: {
    code: `.mensaje {
  color: #e24b4a;
}

.mensaje {
  color: #1d9e75;
}

/* Gana la segunda por orden en cascada */`,
    html: `<p class="mensaje" style="font-size:18px;font-weight:700;">Este texto queda verde</p>`,
    explain: 'Misma especificidad, mismo selector: gana la regla que aparece mas abajo.'
  },
  especificidad: {
    code: `p.alerta {
  color: #339af0;
}

#aviso {
  color: #e8590c;
}

/* Gana #aviso por mayor especificidad */`,
    html: `<p id="aviso" class="alerta" style="font-size:18px;font-weight:700;">Este texto queda naranja</p>`,
    explain: 'El selector con ID (#aviso) tiene mayor especificidad que p.alerta, por eso gana aunque este arriba.'
  },
  herencia: {
    code: `.padre {
  color: #845ef7;
}

/* El hijo hereda color si no define uno propio */`,
    html: `<div class="padre" style="font-size:16px;line-height:1.5;">
  <p>Padre con color morado.</p>
  <p>Hijo sin color propio: hereda morado.</p>
</div>`,
    explain: 'No todas las propiedades se heredan, pero color y font-family si. margin, border o width no.'
  }
}

function initDemoCascada(root) {
  const preview = root.querySelector('#cascadePreview')
  const code = root.querySelector('#cascadeCode')
  const explain = root.querySelector('#cascadeExplain')
  const botones = root.querySelectorAll('#cascadeBtns .ctrl-btn')

  if (!preview || !code || !explain || !botones.length) return

  mostrar('orden')

  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      const tipo = btn.dataset.case
      botones.forEach(b => b.classList.remove('sel'))
      btn.classList.add('sel')
      mostrar(tipo)
    })
  })

  function mostrar(tipo) {
    const data = casos[tipo]
    if (!data) return

    preview.innerHTML = data.html
    code.textContent = data.code
    explain.textContent = data.explain
  }
}

customElements.define('cascada-hover-css', CascadaHoverCSS)
