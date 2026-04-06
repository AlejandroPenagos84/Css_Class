// data/unidades.js
// ─────────────────────────────────────────────
// Cada entrada tiene:
//   code → el CSS a mostrar en el bloque de código (con spans de color)
//   html → el HTML de la demo en vivo
//
// Para agregar una nueva unidad: añade una entrada al objeto y
// crea el botón correspondiente en index.html con data-unit="tuNombre"
// ─────────────────────────────────────────────

export const unidades = {

  px: {
    code: `<span class="hl-comment">/* PX — valor absoluto, siempre el mismo */</span>

<span class="hl-selector">.titulo</span>   { <span class="hl-prop">font-size</span>: <span class="hl-val">32px</span>; }
<span class="hl-selector">.subtitulo</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">16px</span>; }
<span class="hl-selector">.pequeno</span>   { <span class="hl-prop">font-size</span>: <span class="hl-val">12px</span>; }

<span class="hl-comment">/* 32px siempre son 32px, sin importar el padre */</span>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="font-size:32px;font-weight:600;color:#1a1a1a;">Título — 32px</div>
        <div style="font-size:16px;color:#444;">Subtítulo — 16px</div>
        <div style="font-size:12px;color:#888;">Texto pequeño — 12px</div>
        <div style="display:flex;gap:8px;align-items:flex-end;margin-top:8px;">
          <div style="width:60px;height:36px;background:#9FE1CB;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#085041;font-weight:600;">60px</div>
          <div style="width:120px;height:36px;background:#B5D4F4;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#0C447C;font-weight:600;">120px</div>
          <div style="width:200px;height:36px;background:#FAC775;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#412402;font-weight:600;">200px</div>
        </div>
        <div style="background:#FAECE7;border-radius:6px;padding:10px;border-left:3px solid #F0997B;font-size:13px;color:#4A1B0C;">
          ⚠️ Si el usuario agranda la fuente en su navegador (accesibilidad), <strong>px no lo respeta</strong>. Para eso existe rem.
        </div>
      </div>`
  },

  em: {
    code: `<span class="hl-comment">/* EM — relativo al font-size del PADRE inmediato */</span>

<span class="hl-selector">.padre</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">20px</span>; }

<span class="hl-selector">.hijo</span>  { <span class="hl-prop">font-size</span>: <span class="hl-val">1.5em</span>; } <span class="hl-comment">/* 1.5 × 20px = 30px */</span>
<span class="hl-selector">.nieto</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">1.5em</span>; } <span class="hl-comment">/* 1.5 × 30px = 45px ← se acumula! */</span>`,
    html: `
      <div style="font-size:20px;padding:12px;background:#f5f5f5;border-radius:8px;">
        <span style="font-size:11px;color:#888;font-family:monospace;">padre: 20px</span>
        <div style="font-size:1.5em;margin-top:8px;padding:10px;background:white;border-radius:6px;border:1px dashed #ddd;">
          <span style="font-size:0.5em;background:#E6F1FB;padding:2px 6px;border-radius:4px;font-family:monospace;color:#185FA5;">30px</span>
          hijo — 1.5em
          <div style="font-size:1.5em;margin-top:6px;padding:8px;background:#f9f9f7;border-radius:4px;border:1px dashed #eee;">
            <span style="font-size:0.4em;background:#FAEEDA;padding:2px 6px;border-radius:4px;font-family:monospace;color:#854F0B;">45px</span>
            nieto — 1.5em (se acumula!)
          </div>
        </div>
      </div>
      <div style="margin-top:8px;background:#E1F5EE;border-radius:6px;padding:10px;border-left:3px solid #1D9E75;font-size:13px;color:#085041;">
        ✅ <strong>Buen uso de em:</strong> padding y margin — el espacio escala proporcionalmente al texto del componente.
      </div>`
  },

  rem: {
    code: `<span class="hl-comment">/* REM — relativo al font-size de &lt;html&gt; (siempre 16px por defecto) */</span>

<span class="hl-selector">html</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">16px</span>; }

<span class="hl-selector">.padre</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">2rem</span>;   } <span class="hl-comment">/* 2 × 16px = 32px */</span>
<span class="hl-selector">.hijo</span>  { <span class="hl-prop">font-size</span>: <span class="hl-val">1.5rem</span>; } <span class="hl-comment">/* 1.5 × 16px = 24px — NO depende del padre */</span>
<span class="hl-selector">.nieto</span> { <span class="hl-prop">font-size</span>: <span class="hl-val">1rem</span>;   } <span class="hl-comment">/* 1 × 16px = 16px — siempre */</span>`,
    html: `
      <div style="padding:12px;background:#f5f5f5;border-radius:8px;">
        <div style="font-size:32px;padding:10px;background:white;border-radius:6px;border:1px dashed #ddd;margin-bottom:6px;">
          <span style="font-size:12px;background:#FAECE7;padding:2px 6px;border-radius:4px;font-family:monospace;color:#993C1D;">32px</span>
          padre — 2rem
          <div style="font-size:24px;margin-top:6px;padding:8px;background:#f9f9f7;border-radius:4px;border:1px dashed #eee;">
            <span style="font-size:12px;background:#E1F5EE;padding:2px 6px;border-radius:4px;font-family:monospace;color:#085041;">24px</span>
            hijo — 1.5rem
            <div style="font-size:16px;margin-top:4px;padding:6px;background:white;border-radius:4px;border:1px dashed #eee;">
              <span style="font-size:12px;background:#E6F1FB;padding:2px 6px;border-radius:4px;font-family:monospace;color:#185FA5;">16px</span>
              nieto — 1rem
            </div>
          </div>
        </div>
        <div style="font-size:12px;color:#888;font-family:monospace;background:#eee;padding:6px;border-radius:4px;">✓ Ninguno depende del otro — todos van directo a &lt;html&gt;</div>
      </div>`
  },

  porcentaje: {
    code: `<span class="hl-comment">/* % — relativo al tamaño del PADRE */</span>

<span class="hl-selector">.contenedor</span> { <span class="hl-prop">width</span>: <span class="hl-val">400px</span>; }

<span class="hl-selector">.full</span>     { <span class="hl-prop">width</span>: <span class="hl-val">100%</span>; } <span class="hl-comment">/* 400px */</span>
<span class="hl-selector">.mitad</span>    { <span class="hl-prop">width</span>: <span class="hl-val">50%</span>;  } <span class="hl-comment">/* 200px */</span>
<span class="hl-selector">.un-tercio</span>{ <span class="hl-prop">width</span>: <span class="hl-val">33%</span>;  } <span class="hl-comment">/* 132px */</span>

<span class="hl-comment">/* Si el padre cambia de tamaño, todo se adapta solo ✓ */</span>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:6px;padding:12px;background:#f5f5f5;border-radius:8px;">
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:3px;font-family:monospace;">width: 100%</div>
          <div style="width:100%;height:30px;background:#9FE1CB;border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:12px;font-weight:600;color:#085041;">100%</div>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:3px;font-family:monospace;">width: 75%</div>
          <div style="width:75%;height:30px;background:#B5D4F4;border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:12px;font-weight:600;color:#0C447C;">75%</div>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:3px;font-family:monospace;">width: 50%</div>
          <div style="width:50%;height:30px;background:#FAC775;border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:12px;font-weight:600;color:#412402;">50%</div>
        </div>
        <div>
          <div style="font-size:11px;color:#888;margin-bottom:3px;font-family:monospace;">width: 33%</div>
          <div style="width:33%;height:30px;background:#F0997B;border-radius:4px;display:flex;align-items:center;padding-left:10px;font-size:12px;font-weight:600;color:#4A1B0C;">33%</div>
        </div>
      </div>
      <div style="margin-top:8px;background:#FAECE7;border-radius:6px;padding:10px;border-left:3px solid #F0997B;font-size:13px;color:#4A1B0C;">
        ⚠️ <strong>height: %</strong> solo funciona si el padre tiene una altura definida explícitamente.
      </div>`
  },

  vh_vw: {
    code: `<span class="hl-comment">/* VH / VW — relativo al tamaño de la PANTALLA */</span>
<span class="hl-comment">/* 1vh = 1% del alto   de la ventana del navegador */</span>
<span class="hl-comment">/* 1vw = 1% del ancho  de la ventana del navegador */</span>

<span class="hl-selector">.hero</span> {
  <span class="hl-prop">height</span>: <span class="hl-val">100vh</span>; <span class="hl-comment">/* ocupa toda la pantalla */</span>
  <span class="hl-prop">width</span>:  <span class="hl-val">100vw</span>;
}

<span class="hl-selector">.titulo-fluido</span> {
  <span class="hl-prop">font-size</span>: <span class="hl-val">5vw</span>; <span class="hl-comment">/* escala con el ancho de la pantalla */</span>
}`,
    html: `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="width:100%;height:120px;background:#1e1e2e;border-radius:8px;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
          <div style="position:absolute;top:0;left:0;right:0;bottom:0;border:2px dashed #378ADD;border-radius:8px;"></div>
          <div style="text-align:center;">
            <div style="font-size:5vw;font-weight:700;color:white;line-height:1;">Título fluido</div>
            <div style="font-size:11px;color:#888;margin-top:4px;font-family:monospace;">font-size: 5vw — achica la ventana y cambia</div>
          </div>
          <div style="position:absolute;top:6px;right:8px;font-size:11px;font-family:monospace;color:#378ADD;">100vw</div>
          <div style="position:absolute;left:8px;top:50%;font-size:11px;font-family:monospace;color:#378ADD;transform:translateY(-50%) rotate(-90deg);">100vh</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
          <div style="background:#E6F1FB;border-radius:6px;padding:10px;font-size:13px;color:#0C447C;">
            <strong>vh</strong> — ideal para secciones fullscreen, modales, splash.
          </div>
          <div style="background:#E1F5EE;border-radius:6px;padding:10px;font-size:13px;color:#085041;">
            <strong>vw</strong> — ideal para tipografía fluida que escala con la pantalla.
          </div>
        </div>
      </div>`
  },

}