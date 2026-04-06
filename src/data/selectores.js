// data/selectores.js
// ─────────────────────────────────────────────
// Cada entrada tiene:
//   code → el CSS a mostrar en el bloque de código (con spans de color)
//   html → el HTML de la demo en vivo
//
// Para agregar un nuevo selector: añade una entrada al objeto y
// crea el botón correspondiente en index.html con data-selector="tuNombre"
// ─────────────────────────────────────────────

export const selectores = {

  elem: {
    code: `<span class="hl-selector">p</span> {
  <span class="hl-prop">color</span>: <span class="hl-val">tomato</span>;
}
<span class="hl-comment">/* Aplica a TODOS los &lt;p&gt; de la página */</span>`,
    html: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start">
        <div style="padding:10px;background:#f5f5f5;border-radius:6px;font-size:13px;color:#888">Este &lt;h2&gt; no cambia</div>
        <div style="color:tomato;font-size:13px;padding:10px;background:#f5f5f5;border-radius:6px;">Este &lt;p&gt; → color tomato</div>
        <div style="color:tomato;font-size:13px;padding:10px;background:#f5f5f5;border-radius:6px;">Este &lt;p&gt; → color tomato</div>
      </div>`
  },

  clase: {
    code: `<span class="hl-selector">.destacado</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">yellow</span>;
  <span class="hl-prop">font-weight</span>: <span class="hl-val">bold</span>;
}
<span class="hl-comment">/* Solo los elementos con class="destacado" */</span>`,
    html: `
      <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:flex-start">
        <div style="padding:10px;background:#f5f5f5;border-radius:6px;font-size:13px;color:#888">sin clase</div>
        <div style="background:yellow;font-weight:bold;font-size:13px;padding:10px;border-radius:6px;color:#333">class="destacado"</div>
        <div style="padding:10px;background:#f5f5f5;border-radius:6px;font-size:13px;color:#888">sin clase</div>
        <div style="background:yellow;font-weight:bold;font-size:13px;padding:10px;border-radius:6px;color:#333">class="destacado"</div>
      </div>`
  },

  id: {
    code: `<span class="hl-selector">#logo</span> {
  <span class="hl-prop">font-size</span>: <span class="hl-val">24px</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">navy</span>;
}
<span class="hl-comment">/* Solo el elemento con id="logo" (único en la página) */</span>`,
    html: `
      <div style="display:flex;gap:10px;align-items:center">
        <div style="font-size:24px;color:navy;font-weight:bold;padding:10px;background:#f5f5f5;border-radius:6px;">id="logo"</div>
        <div style="padding:10px;background:#f5f5f5;border-radius:6px;font-size:13px;color:#888">otro elemento</div>
      </div>`
  },

  desc: {
    code: `<span class="hl-selector">nav a</span> {
  <span class="hl-prop">color</span>: <span class="hl-val">white</span>;
}
<span class="hl-comment">/* Todos los &lt;a&gt; que estén DENTRO de un &lt;nav&gt; */</span>`,
    html: `
      <div style="display:flex;gap:10px;flex-direction:column">
        <div style="background:#185FA5;border-radius:6px;padding:10px;font-size:13px">
          <span style="color:white">← dentro de &lt;nav&gt; → color white</span>
        </div>
        <div style="background:#f5f5f5;border-radius:6px;padding:10px;font-size:13px;color:#1a1a1a">
          ← fuera de &lt;nav&gt; → sin estilo
        </div>
      </div>`
  },

  hijo: {
    code: `<span class="hl-selector">ul > li</span> {
  <span class="hl-prop">color</span>: <span class="hl-val">green</span>;
}
<span class="hl-comment">/* Solo los &lt;li&gt; hijos DIRECTOS del &lt;ul&gt; */</span>`,
    html: `
      <ul style="list-style:disc;padding-left:20px;font-size:13px">
        <li style="color:green">Hijo directo ✓</li>
        <li style="color:green">Hijo directo ✓
          <ul style="list-style:circle;padding-left:20px;margin-top:4px">
            <li style="color:#888">Nieto → no aplica</li>
          </ul>
        </li>
      </ul>`
  },

  hover: {
    code: `<span class="hl-selector">button:hover</span> {
  <span class="hl-prop">background</span>: <span class="hl-val">#1D9E75</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">white</span>;
}
<span class="hl-comment">/* Se activa al pasar el mouse encima */</span>`,
    html: `
      <div style="display:flex;gap:10px;align-items:center">
        <button
          style="padding:8px 18px;border-radius:6px;border:1px solid #1D9E75;background:transparent;color:#1D9E75;font-size:13px;cursor:pointer;"
          onmouseover="this.style.background='#1D9E75';this.style.color='white'"
          onmouseout="this.style.background='transparent';this.style.color='#1D9E75'"
        >Pasa el mouse aquí</button>
        <span style="font-size:13px;color:#888">← prueba el hover</span>
      </div>`
  },

  before: {
    code: `<span class="hl-selector">.nota::before</span> {
  <span class="hl-prop">content</span>: <span class="hl-val">"★ "</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">gold</span>;
}
<span class="hl-comment">/* Inserta contenido decorativo antes del elemento */</span>`,
    html: `
      <div style="font-size:14px">
        <div style="margin-bottom:8px">
          <span style="color:gold;font-size:16px">★ </span>
          <span>class="nota" → con ::before</span>
        </div>
        <div style="color:#888">Sin la clase → sin estrella</div>
      </div>`
  },

  after: {
    code: `<span class="hl-selector">.nota::after</span> {
  <span class="hl-prop">content</span>: <span class="hl-val">" ★"</span>;
  <span class="hl-prop">color</span>: <span class="hl-val">gold</span>;
}
<span class="hl-comment">/* Inserta contenido decorativo después del elemento */</span>`,
    html: `
      <div style="font-size:14px">
        <div style="margin-bottom:8px">
          <span style="color:gold;font-size:16px">★ </span>
          <span>class="nota" → con ::after</span>
        </div>
        <div style="color:#888">Sin la clase → sin estrella</div>
      </div>`
  },


}
