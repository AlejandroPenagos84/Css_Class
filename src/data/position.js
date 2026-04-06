// data/position.js
// ─────────────────────────────────────────────
// Cada entrada tiene:
//   code → el CSS a mostrar en el bloque de código
//   desc → texto explicativo que aparece debajo del código
//   html → el HTML de la demo en vivo
//
// Para agregar un nuevo valor: añade una entrada aquí y
// el botón correspondiente en index.html con data-position="tuValor"
// ─────────────────────────────────────────────

export const posicionamiento = {

  static: {
    code: `<span class="hl-selector">.caja</span> {
  <span class="hl-prop">position</span>: <span class="hl-val">static</span>; <span class="hl-comment">/* por defecto */</span>
}`,
    desc: 'Valor por defecto. El elemento sigue el flujo normal del documento. Las propiedades top, left, right, bottom NO tienen efecto.',
    html: `
      <div style="display:flex;gap:8px">
        <div style="background:#9FE1CB;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#085041">caja 1</div>
        <div style="background:#B5D4F4;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#0C447C;border:2px solid #378ADD">caja 2 (static)</div>
        <div style="background:#FAC775;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#412402">caja 3</div>
      </div>`
  },

  relative: {
    code: `<span class="hl-selector">.caja</span> {
  <span class="hl-prop">position</span>: <span class="hl-val">relative</span>;
  <span class="hl-prop">top</span>: <span class="hl-val">20px</span>;
  <span class="hl-prop">left</span>: <span class="hl-val">15px</span>;
}`,
    desc: 'El elemento se mueve RESPECTO a donde estaría normalmente. El espacio original queda "reservado" (como un fantasma).',
    html: `
      <div style="display:flex;gap:8px;align-items:flex-start">
        <div style="background:#9FE1CB;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#085041">caja 1</div>
        <div style="background:#B5D4F4;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#0C447C;position:relative;top:20px;left:15px;border:2px solid #378ADD">caja 2 ↙</div>
        <div style="background:#FAC775;border-radius:6px;padding:12px;font-size:13px;font-weight:600;color:#412402">caja 3</div>
      </div>`
  },

  absolute: {
    code: `<span class="hl-selector">.padre</span> { <span class="hl-prop">position</span>: <span class="hl-val">relative</span>; }

<span class="hl-selector">.hijo</span> {
  <span class="hl-prop">position</span>: <span class="hl-val">absolute</span>;
  <span class="hl-prop">top</span>: <span class="hl-val">8px</span>;
  <span class="hl-prop">right</span>: <span class="hl-val">8px</span>;
}`,
    desc: 'Sale del flujo normal. Se posiciona respecto al ancestro con position ≠ static. Útil para badges, tooltips, overlays.',
    html: `
      <div style="position:relative;background:#f5f5f5;border-radius:8px;padding:20px;border:2px dashed #ddd;min-height:80px;">
        <div style="font-size:13px;color:#888">Padre (position: relative)</div>
        <div style="position:absolute;top:8px;right:8px;background:#E24B4A;color:white;border-radius:999px;padding:2px 10px;font-size:12px;font-weight:600;">badge</div>
      </div>`
  },

  fixed: {
    code: `<span class="hl-selector">.navbar</span> {
  <span class="hl-prop">position</span>: <span class="hl-val">fixed</span>;
  <span class="hl-prop">top</span>: <span class="hl-val">0</span>;
  <span class="hl-prop">left</span>: <span class="hl-val">0</span>;
  <span class="hl-prop">width</span>: <span class="hl-val">100%</span>;
}`,
    desc: '* Aquí se muestra estático. En una página real, se ancla al viewport y queda visible aunque el usuario haga scroll.',
    html: `
      <div style="background:#185FA5;padding:10px 16px;border-radius:6px;display:flex;justify-content:space-between;align-items:center">
        <span style="color:white;font-size:13px;font-weight:600">Navbar fixed</span>
        <div style="display:flex;gap:12px">
          <span style="color:rgba(255,255,255,0.8);font-size:13px">Inicio</span>
          <span style="color:rgba(255,255,255,0.8);font-size:13px">Sobre mí</span>
          <span style="color:rgba(255,255,255,0.8);font-size:13px">Contacto</span>
        </div>
      </div>
      <div style="font-size:12px;color:#888;margin-top:8px;padding:8px">Contenido de la página debajo del navbar...</div>`
  },

  sticky: {
    code: `<span class="hl-selector">.header-tabla</span> {
  <span class="hl-prop">position</span>: <span class="hl-val">sticky</span>;
  <span class="hl-prop">top</span>: <span class="hl-val">0</span>;
  <span class="hl-comment">/* Se pega al top al hacer scroll */</span>
}`,
    desc: 'Se comporta como static hasta que el scroll lo lleva a la posición definida, donde se "pega". Muy usado en headers de tablas.',
    html: `
      <div style="height:100px;overflow-y:auto;border:1px solid #ddd;border-radius:6px;">
        <div style="position:sticky;top:0;background:#1D9E75;color:white;padding:8px 12px;font-size:13px;font-weight:600;">Header sticky (¡haz scroll!)</div>
        <div style="padding:10px;font-size:13px;color:#555">fila 1</div>
        <div style="padding:10px;font-size:13px;color:#555">fila 2</div>
        <div style="padding:10px;font-size:13px;color:#555">fila 3</div>
        <div style="padding:10px;font-size:13px;color:#555">fila 4</div>
        <div style="padding:10px;font-size:13px;color:#555">fila 5</div>
      </div>`
  },

}
