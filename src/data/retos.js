// ============================================================
// RETOS CSS - Selectores, Unidades, Box Model, Flexbox, Grid
// ============================================================

export const retosSelectores = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'sel-clase-basico',
    titulo: 'Reto: Selector de clase',
    descripcion: 'Aplica estilo solo a los elementos con la clase .destacado.',
    instruccion: 'Haz que .destacado tenga color tomato y font-weight bold.',
    htmlBase: `<div class="reto-card">
  <p>Texto normal</p>
  <p class="destacado">Texto destacado 1</p>
  <p>Otro texto normal</p>
  <p class="destacado">Texto destacado 2</p>
</div>`,
    cssBase: `.destacado {
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.destacado', propiedad: 'color', valor: 'tomato' },
      { selector: '.destacado', propiedad: 'font-weight', valor: 'bold' }
    ]
  },

  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'sel-id-basico',
    titulo: 'Reto: Selector de ID',
    descripcion: 'Aplica estilo únicamente al elemento con id="principal".',
    instruccion: 'Haz que #principal tenga background-color steelblue y color white.',
    htmlBase: `<div class="reto-card">
  <p id="principal">Soy el principal</p>
  <p>Soy secundario</p>
  <p>Soy terciario</p>
</div>`,
    cssBase: `#principal {
  /* escribe aquí */
}`,
    reglas: [
      { selector: '#principal', propiedad: 'background-color', valor: 'steelblue' },
      { selector: '#principal', propiedad: 'color', valor: 'white' }
    ]
  },

  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'sel-etiqueta-basico',
    titulo: 'Reto: Selector de etiqueta',
    descripcion: 'Aplica estilo a todos los elementos <li> del listado.',
    instruccion: 'Haz que todos los li tengan color darkgreen y list-style-type square.',
    htmlBase: `<ul class="reto-card">
  <li>Manzana</li>
  <li>Pera</li>
  <li>Uva</li>
</ul>`,
    cssBase: `li {
  /* escribe aquí */
}`,
    reglas: [
      { selector: 'li', propiedad: 'color', valor: 'darkgreen' },
      { selector: 'li', propiedad: 'list-style-type', valor: 'square' }
    ]
  }
]

// ============================================================

export const retosUnidades = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'uni-px-basico',
    titulo: 'Reto: Unidades absolutas (px)',
    descripcion: 'Usa píxeles para definir tamaño y espaciado de una caja.',
    instruccion: 'Dale al .caja width: 200px, height: 100px y padding: 16px.',
    htmlBase: `<div class="reto-card">
  <div class="caja">Soy una caja</div>
</div>`,
    cssBase: `.caja {
  background-color: coral;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.caja', propiedad: 'width', valor: '200px' },
      { selector: '.caja', propiedad: 'height', valor: '100px' },
      { selector: '.caja', propiedad: 'padding', valor: '16px' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'uni-em-rem-medio',
    titulo: 'Reto: Unidades relativas (em y rem)',
    descripcion: 'Usa em para el padding del hijo y rem para su font-size.',
    instruccion:
      'Al .padre dale font-size: 20px. Al .hijo dale font-size: 1.5rem y padding: 1em.',
    htmlBase: `<div class="reto-card">
  <div class="padre">
    Padre (20px)
    <div class="hijo">Hijo con em y rem</div>
  </div>
</div>`,
    cssBase: `.padre {
  /* escribe aquí */
}

.hijo {
  background-color: lightyellow;
  border: 1px solid gold;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.padre', propiedad: 'font-size', valor: '20px' },
      { selector: '.hijo', propiedad: 'font-size', valor: '1.5rem' },
      { selector: '.hijo', propiedad: 'padding', valor: '1em' }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'uni-viewport-dificil',
    titulo: 'Reto: Unidades de viewport y porcentaje',
    descripcion:
      'Construye un hero que ocupe toda la pantalla y un texto centrado al 50% del ancho.',
    instruccion:
      'Al .hero dale width: 100vw, height: 100vh y background: linear-gradient(135deg, #1a1a2e, #16213e). Al .hero-texto dale width: 50% y color: white.',
    htmlBase: `<div class="hero">
  <p class="hero-texto">Bienvenido al sitio</p>
</div>`,
    cssBase: `.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  /* escribe aquí */
}

.hero-texto {
  text-align: center;
  font-size: 2rem;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.hero', propiedad: 'width', valor: '100vw' },
      { selector: '.hero', propiedad: 'height', valor: '100vh' },
      {
        selector: '.hero',
        propiedad: 'background',
        valor: 'linear-gradient(135deg, #1a1a2e, #16213e)'
      },
      { selector: '.hero-texto', propiedad: 'width', valor: '50%' },
      { selector: '.hero-texto', propiedad: 'color', valor: 'white' }
    ]
  }
]

// ============================================================

export const retosBoxModel = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'box-padding-basico',
    titulo: 'Reto: Padding y border',
    descripcion: 'Agrega espacio interno y borde a la tarjeta.',
    instruccion:
      'Dale a .tarjeta padding: 24px, border: 2px solid navy y border-radius: 8px.',
    htmlBase: `<div class="reto-card">
  <div class="tarjeta">
    <p>Contenido de la tarjeta</p>
  </div>
</div>`,
    cssBase: `.tarjeta {
  background-color: #f0f4ff;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.tarjeta', propiedad: 'padding', valor: '24px' },
      { selector: '.tarjeta', propiedad: 'border', valor: '2px solid navy' },
      { selector: '.tarjeta', propiedad: 'border-radius', valor: '8px' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'box-sizing-medio',
    titulo: 'Reto: box-sizing border-box',
    descripcion:
      'Dos cajas del mismo width: con y sin box-sizing. Iguala el tamaño visual.',
    instruccion:
      'Dale a .caja-a box-sizing: content-box (ya está). Dale a .caja-b box-sizing: border-box para que ambas midan exactamente 200px de ancho total.',
    htmlBase: `<div class="reto-card" style="display:flex; gap:16px;">
  <div class="caja-a">content-box</div>
  <div class="caja-b">border-box</div>
</div>`,
    cssBase: `.caja-a, .caja-b {
  width: 200px;
  padding: 20px;
  border: 4px solid tomato;
  background: #ffe0e0;
}

.caja-a {
  box-sizing: content-box;
}

.caja-b {
  /* escribe aquí */
}`,
    reglas: [{ selector: '.caja-b', propiedad: 'box-sizing', valor: 'border-box' }]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'box-colapso-margin-dificil',
    titulo: 'Reto: Colapso de márgenes',
    descripcion:
      'Los márgenes verticales entre párrafos colapsan. Evítalo con un contenedor apropiado.',
    instruccion:
      'Dale a .contenedor overflow: hidden (crea un BFC). Dale a cada p margin: 24px 0. Verifica que el espacio entre párrafos sea 24px (no 48px ni 0).',
    htmlBase: `<div class="reto-card">
  <div class="contenedor">
    <p class="parrafo">Párrafo uno</p>
    <p class="parrafo">Párrafo dos</p>
    <p class="parrafo">Párrafo tres</p>
  </div>
</div>`,
    cssBase: `.contenedor {
  background: #f9f9f9;
  border: 1px dashed #aaa;
  /* escribe aquí */
}

.parrafo {
  background: #d0ebff;
  padding: 8px;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.contenedor', propiedad: 'overflow', valor: 'hidden' },
      { selector: '.parrafo', propiedad: 'margin', valor: '24px 0' }
    ]
  }
]

// ============================================================

export const retosFlexbox = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'flex-centrado-basico',
    titulo: 'Reto: Centrar con Flexbox',
    descripcion: 'Centra un elemento horizontal y verticalmente dentro de su contenedor.',
    instruccion:
      'Dale a .flex-contenedor display: flex, justify-content: center y align-items: center. El contenedor ya tiene height: 200px.',
    htmlBase: `<div class="reto-card">
  <div class="flex-contenedor">
    <div class="caja">¡Centrado!</div>
  </div>
</div>`,
    cssBase: `.flex-contenedor {
  height: 200px;
  background: #e8f5e9;
  border: 2px dashed #4caf50;
  /* escribe aquí */
}

.caja {
  background: #4caf50;
  color: white;
  padding: 12px 24px;
  border-radius: 6px;
}`,
    reglas: [
      { selector: '.flex-contenedor', propiedad: 'display', valor: 'flex' },
      { selector: '.flex-contenedor', propiedad: 'justify-content', valor: 'center' },
      { selector: '.flex-contenedor', propiedad: 'align-items', valor: 'center' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'flex-navbar-medio',
    titulo: 'Reto: Navbar con Flexbox',
    descripcion: 'Crea una barra de navegación con el logo a la izquierda y los links a la derecha.',
    instruccion:
      'Dale a .navbar display: flex, justify-content: space-between y align-items: center. Dale a .nav-links display: flex y gap: 24px.',
    htmlBase: `<nav class="navbar">
  <span class="logo">MiSitio</span>
  <ul class="nav-links">
    <li>Inicio</li>
    <li>Sobre mí</li>
    <li>Contacto</li>
  </ul>
</nav>`,
    cssBase: `.navbar {
  background: #1e1e2e;
  padding: 16px 32px;
  /* escribe aquí */
}

.logo {
  color: #cba6f7;
  font-size: 1.4rem;
  font-weight: bold;
}

.nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
  /* escribe aquí */
}

.nav-links li {
  color: #cdd6f4;
  cursor: pointer;
}`,
    reglas: [
      { selector: '.navbar', propiedad: 'display', valor: 'flex' },
      { selector: '.navbar', propiedad: 'justify-content', valor: 'space-between' },
      { selector: '.navbar', propiedad: 'align-items', valor: 'center' },
      { selector: '.nav-links', propiedad: 'display', valor: 'flex' },
      { selector: '.nav-links', propiedad: 'gap', valor: '24px' }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'flex-layout-complejo-dificil',
    titulo: 'Reto: Layout completo con Flexbox',
    descripcion:
      'Construye un layout de tres columnas donde la sidebar izquierda tiene ancho fijo, el contenido central crece y ocupa el espacio restante, y la sidebar derecha tiene ancho fijo.',
    instruccion:
      'Dale a .layout display: flex y height: 400px. A .sidebar dale flex: 0 0 180px. Al .main dale flex: 1. A .aside dale flex: 0 0 140px. Usa gap: 12px en .layout.',
    htmlBase: `<div class="layout">
  <div class="sidebar">Sidebar<br/>(180px fijo)</div>
  <main class="main">Contenido principal<br/>(crece)</main>
  <aside class="aside">Aside<br/>(140px fijo)</aside>
</div>`,
    cssBase: `.layout {
  background: #f5f5f5;
  /* escribe aquí */
}

.sidebar {
  background: #74c0fc;
  padding: 16px;
  /* escribe aquí */
}

.main {
  background: #fff;
  padding: 16px;
  border: 1px solid #dee2e6;
  /* escribe aquí */
}

.aside {
  background: #b2f2bb;
  padding: 16px;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.layout', propiedad: 'display', valor: 'flex' },
      { selector: '.layout', propiedad: 'height', valor: '400px' },
      { selector: '.layout', propiedad: 'gap', valor: '12px' },
      { selector: '.sidebar', propiedad: 'flex', valor: '0 0 180px' },
      { selector: '.main', propiedad: 'flex', valor: '1' },
      { selector: '.aside', propiedad: 'flex', valor: '0 0 140px' }
    ]
  },
   // ── MUY DIFÍCIL: FLEXBOX ────────────────────────────────────
  {
    id: 'flex-dashboard-muy-dificil',
    titulo: 'Reto: Dashboard con Flexbox puro',
    descripcion:
      'Construye un dashboard completo usando solo Flexbox. El layout tiene: sidebar fija a la izquierda, y a la derecha un área principal que apila verticalmente un topbar, una fila de 4 stat-cards que no bajan de línea, y una zona de contenido que crece para ocupar el espacio restante. El sidebar NO debe encoger nunca.',
    instruccion:
      'Dale a .dashboard display:flex y height:100vh. Al .sidebar flex:0 0 220px. Al .main-area display:flex, flex-direction:column y flex:1. Al .topbar flex-shrink:0. Al .stats display:flex y gap:12px, y a cada .stat-card flex:1 y min-width:0. Al .content flex:1.',
    htmlBase: `<div class="dashboard">
 
  <aside class="sidebar">
    <div class="logo">AppName</div>
    <nav>
      <div class="nav-item active">Dashboard</div>
      <div class="nav-item">Usuarios</div>
      <div class="nav-item">Reportes</div>
      <div class="nav-item">Config</div>
    </nav>
  </aside>
 
  <div class="main-area">
    <div class="topbar">
      <span class="page-title">Dashboard</span>
      <div class="user-info">
        <div class="avatar">JD</div>
        <span>John Doe</span>
      </div>
    </div>
 
    <div class="stats">
      <div class="stat-card">
        <span class="stat-value">1,284</span>
        <span class="stat-label">Usuarios</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">$8,430</span>
        <span class="stat-label">Ingresos</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">94%</span>
        <span class="stat-label">Satisfacción</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">312</span>
        <span class="stat-label">Pedidos</span>
      </div>
    </div>
 
    <div class="content">
      <p>Zona de contenido principal — crece para llenar el espacio.</p>
    </div>
  </div>
 
</div>`,
    cssBase: `/* === LAYOUT PRINCIPAL === */
.dashboard {
  font-family: sans-serif;
  background: #f1f3f5;
  /* escribe aquí */
}
 
/* === SIDEBAR === */
.sidebar {
  background: #0f0f0f;
  padding: 24px 16px;
  /* escribe aquí */
}
 
.logo {
  color: #cba6f7;
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 32px;
}
 
.nav-item {
  color: #a6adc8;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;
}
 
.nav-item.active {
  background: #313244;
  color: white;
}
 
/* === ÁREA PRINCIPAL === */
.main-area {
  overflow: hidden;
  /* escribe aquí */
}
 
/* === TOPBAR === */
.topbar {
  background: white;
  padding: 16px 24px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* escribe aquí */
}
 
.page-title { font-size: 1.2rem; font-weight: bold; }
 
.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}
 
.avatar {
  background: #845ef7;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
}
 
/* === STATS ROW === */
.stats {
  padding: 20px 24px;
  /* escribe aquí */
}
 
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  /* escribe aquí */
}
 
.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #1e1e2e;
}
 
.stat-label {
  font-size: 0.85rem;
  color: #868e96;
}
 
/* === CONTENT === */
.content {
  background: white;
  margin: 0 24px 24px;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.dashboard', propiedad: 'display', valor: 'flex' },
      { selector: '.dashboard', propiedad: 'height', valor: '100vh' },
      { selector: '.sidebar', propiedad: 'flex', valor: '0 0 220px' },
      { selector: '.main-area', propiedad: 'display', valor: 'flex' },
      { selector: '.main-area', propiedad: 'flex-direction', valor: 'column' },
      { selector: '.main-area', propiedad: 'flex', valor: '1' },
      { selector: '.topbar', propiedad: 'flex-shrink', valor: '0' },
      { selector: '.stats', propiedad: 'display', valor: 'flex' },
      { selector: '.stats', propiedad: 'gap', valor: '12px' },
      { selector: '.stat-card', propiedad: 'flex', valor: '1' },
      { selector: '.stat-card', propiedad: 'min-width', valor: '0' },
      { selector: '.content', propiedad: 'flex', valor: '1' }
    ]
  }
]

// ============================================================

export const retosGrid = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'grid-basico-facil',
    titulo: 'Reto: Grid básico de 3 columnas',
    descripcion: 'Crea una cuadrícula simple de 3 columnas iguales.',
    instruccion:
      'Dale a .grid display: grid, grid-template-columns: repeat(3, 1fr) y gap: 16px.',
    htmlBase: `<div class="grid">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <div class="item">6</div>
</div>`,
    cssBase: `.grid {
  /* escribe aquí */
}

.item {
  background: #845ef7;
  color: white;
  padding: 24px;
  text-align: center;
  border-radius: 8px;
  font-size: 1.5rem;
  font-weight: bold;
}`,
    reglas: [
      { selector: '.grid', propiedad: 'display', valor: 'grid' },
      { selector: '.grid', propiedad: 'grid-template-columns', valor: 'repeat(3, 1fr)' },
      { selector: '.grid', propiedad: 'gap', valor: '16px' }
    ]
  },

  // ── MEDIO ──────────────────────────────────────────────────
  {
    id: 'grid-areas-medio',
    titulo: 'Reto: Grid con áreas nombradas',
    descripcion: 'Usa grid-template-areas para definir un layout de página clásico.',
    instruccion:
      'Define en .page las áreas: "header header" / "sidebar main" / "footer footer". Dale a .header grid-area: header, a .sidebar grid-area: sidebar, a .main grid-area: main, a .footer grid-area: footer.',
    htmlBase: `<div class="page">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="main">Main</main>
  <footer class="footer">Footer</footer>
</div>`,
    cssBase: `.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 8px;
  height: 400px;
  /* grid-template-areas: escribe aquí */
}

.header  { background: #339af0; color: white; padding: 12px; /* escribe aquí */ }
.sidebar { background: #74c0fc; padding: 12px; /* escribe aquí */ }
.main    { background: #e7f5ff; padding: 12px; /* escribe aquí */ }
.footer  { background: #1971c2; color: white; padding: 12px; /* escribe aquí */ }`,
    reglas: [
      {
        selector: '.page',
        propiedad: 'grid-template-areas',
        valor: '"header header" "sidebar main" "footer footer"'
      },
      { selector: '.header', propiedad: 'grid-area', valor: 'header' },
      { selector: '.sidebar', propiedad: 'grid-area', valor: 'sidebar' },
      { selector: '.main', propiedad: 'grid-area', valor: 'main' },
      { selector: '.footer', propiedad: 'grid-area', valor: 'footer' }
    ]
  },

  // ── DIFÍCIL ────────────────────────────────────────────────
  {
    id: 'grid-masonry-dificil',
    titulo: 'Reto: Grid con celdas de tamaño variable (magazine layout)',
    descripcion:
      'Crea un layout tipo revista donde el primer artículo ocupa 2 columnas y 2 filas, el segundo ocupa 2 filas en 1 columna, y los demás son celdas normales.',
    instruccion:
      'Al .grid dale display: grid, grid-template-columns: repeat(4, 1fr), grid-auto-rows: 150px y gap: 12px. Al .item-grande dale grid-column: span 2 y grid-row: span 2. Al .item-alto dale grid-row: span 2.',
    htmlBase: `<div class="grid">
  <div class="item item-grande">Artículo grande</div>
  <div class="item item-alto">Artículo alto</div>
  <div class="item">Normal 1</div>
  <div class="item">Normal 2</div>
  <div class="item">Normal 3</div>
  <div class="item">Normal 4</div>
</div>`,
    cssBase: `.grid {
  /* escribe aquí */
}

.item {
  background: #f06595;
  color: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.item-grande {
  background: #c2255c;
  /* escribe aquí */
}

.item-alto {
  background: #e64980;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.grid', propiedad: 'display', valor: 'grid' },
      { selector: '.grid', propiedad: 'grid-template-columns', valor: 'repeat(4, 1fr)' },
      { selector: '.grid', propiedad: 'grid-auto-rows', valor: '150px' },
      { selector: '.grid', propiedad: 'gap', valor: '12px' },
      { selector: '.item-grande', propiedad: 'grid-column', valor: 'span 2' },
      { selector: '.item-grande', propiedad: 'grid-row', valor: 'span 2' },
      { selector: '.item-alto', propiedad: 'grid-row', valor: 'span 2' }
    ]
  },
  // ── MUY DIFÍCIL: GRID ───────────────────────────────────────
  {
    id: 'grid-bento-muy-dificil',
    titulo: 'Reto: Bento Grid (layout tipo Apple)',
    descripcion:
      'Recrea un bento grid de 4 columnas y auto-rows de 160px. Cada tarjeta ocupa un espacio distinto: .card-a abarca 2 cols y 2 filas, .card-b abarca 2 cols y 1 fila, .card-c abarca 1 col y 2 filas, .card-d y .card-e son celdas normales, y .card-f abarca 3 cols y 1 fila.',
    instruccion:
      'Al .bento dale display:grid, grid-template-columns:repeat(4,1fr), grid-auto-rows:160px y gap:12px. Luego: .card-a → grid-column:span 2, grid-row:span 2. .card-b → grid-column:span 2. .card-c → grid-row:span 2. .card-f → grid-column:span 3.',
    htmlBase: `<div class="bento">
  <div class="card card-a">
    <span class="card-tag">Destacado</span>
    <h2>Feature principal</h2>
    <p>La tarjeta más grande del grid.</p>
  </div>
  <div class="card card-b">
    <span class="card-tag">Wide</span>
    <h3>Estadísticas</h3>
  </div>
  <div class="card card-c">
    <span class="card-tag">Tall</span>
    <h3>Actividad</h3>
  </div>
  <div class="card card-d">
    <span class="card-tag">Normal</span>
    <h3>Usuarios</h3>
  </div>
  <div class="card card-e">
    <span class="card-tag">Normal</span>
    <h3>Pedidos</h3>
  </div>
  <div class="card card-f">
    <span class="card-tag">Wide x3</span>
    <h3>Gráfica de ventas</h3>
  </div>
  <div class="card card-g">
    <span class="card-tag">Normal</span>
    <h3>Alertas</h3>
  </div>
</div>`,
    cssBase: `/* === GRID CONTAINER === */
.bento {
  padding: 16px;
  background: #0f0f0f;
  min-height: 100vh;
  /* escribe aquí */
}
 
/* === TARJETAS BASE === */
.card {
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 6px;
  overflow: hidden;
}
 
.card h2 { color: white; font-size: 1.6rem; margin: 0; }
.card h3 { color: white; font-size: 1.1rem; margin: 0; }
.card p  { color: rgba(255,255,255,0.7); margin: 0; font-size: 0.9rem; }
 
.card-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}
 
/* === COLORES Y SPANS POR TARJETA === */
.card-a {
  background: linear-gradient(135deg, #6741d9, #3b5bdb);
  /* grid-column y grid-row aquí */
}
 
.card-b {
  background: #1c1c1e;
  border: 1px solid #2c2c2e;
  /* grid-column aquí */
}
 
.card-c {
  background: linear-gradient(180deg, #087f5b, #0ca678);
  /* grid-row aquí */
}
 
.card-d { background: #1c1c1e; border: 1px solid #2c2c2e; }
.card-e { background: #1c1c1e; border: 1px solid #2c2c2e; }
 
.card-f {
  background: linear-gradient(90deg, #c2255c, #e64980);
  /* grid-column aquí */
}
 
.card-g { background: #1c1c1e; border: 1px solid #2c2c2e; }`,
    reglas: [
      { selector: '.bento', propiedad: 'display', valor: 'grid' },
      { selector: '.bento', propiedad: 'grid-template-columns', valor: 'repeat(4, 1fr)' },
      { selector: '.bento', propiedad: 'grid-auto-rows', valor: '160px' },
      { selector: '.bento', propiedad: 'gap', valor: '12px' },
      { selector: '.card-a', propiedad: 'grid-column', valor: 'span 2' },
      { selector: '.card-a', propiedad: 'grid-row', valor: 'span 2' },
      { selector: '.card-b', propiedad: 'grid-column', valor: 'span 2' },
      { selector: '.card-c', propiedad: 'grid-row', valor: 'span 2' },
      { selector: '.card-f', propiedad: 'grid-column', valor: 'span 3' }
    ]
  }
]

export const retosPosition = [

  // ── MEDIO: relative + absolute ──────────────────────────────
  {
    id: 'pos-badge-medio',
    titulo: 'Reto: Badge sobre una tarjeta',
    descripcion:
      'Pon un badge "Nuevo" en la esquina superior derecha de la tarjeta. El badge debe posicionarse respecto a la tarjeta, no a la página.',
    instruccion:
      'Dale a .tarjeta position: relative. Dale al .badge position: absolute, top: -10px, right: -10px.',
    htmlBase: `<div class="reto-card">
  <div class="tarjeta">
    <span class="badge">Nuevo</span>
    <p>Producto increíble</p>
    <p>$29.99</p>
  </div>
</div>`,
    cssBase: `.tarjeta {
  background: #fff;
  border: 2px solid #dee2e6;
  border-radius: 12px;
  padding: 24px;
  width: 200px;
  /* escribe aquí */
}

.badge {
  background: tomato;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 999px;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.tarjeta', propiedad: 'position', valor: 'relative' },
      { selector: '.badge', propiedad: 'position', valor: 'absolute' },
      { selector: '.badge', propiedad: 'top', valor: '-10px' },
      { selector: '.badge', propiedad: 'right', valor: '-10px' }
    ]
  },

  // ── MEDIO: relative + absolute ──────────────────────────────
  {
    id: 'pos-tooltip-medio',
    titulo: 'Reto: Tooltip sobre un botón',
    descripcion:
      'El tooltip debe aparecer centrado encima del botón. El truco está en que el tooltip es absolute respecto al botón (relative), y se desplaza con left: 50% + transform.',
    instruccion:
      'Dale a .btn-wrapper position: relative y display: inline-block. Dale al .tooltip position: absolute, bottom: calc(100% + 8px), left: 50%, transform: translateX(-50%).',
    htmlBase: `<div class="reto-card" style="padding-top: 60px;">
  <div class="btn-wrapper">
    <button class="btn">Hover me</button>
    <div class="tooltip">¡Soy un tooltip!</div>
  </div>
</div>`,
    cssBase: `.btn-wrapper {
  /* escribe aquí */
}

.btn {
  background: #339af0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}

.tooltip {
  background: #212529;
  color: white;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.btn-wrapper', propiedad: 'position', valor: 'relative' },
      { selector: '.btn-wrapper', propiedad: 'display', valor: 'inline-block' },
      { selector: '.tooltip', propiedad: 'position', valor: 'absolute' },
      { selector: '.tooltip', propiedad: 'bottom', valor: 'calc(100% + 8px)' },
      { selector: '.tooltip', propiedad: 'left', valor: '50%' },
      { selector: '.tooltip', propiedad: 'transform', valor: 'translateX(-50%)' }
    ]
  },

  // ── MUY DIFÍCIL ─────────────────────────────────────────────
  {
    id: 'pos-sticky-overlay-dificil',
    titulo: 'Reto: Header sticky + overlay modal centrado',
    descripcion:
      'Combina tres contextos de posicionamiento: un header sticky que se queda arriba al hacer scroll, un botón que abre un overlay fixed que cubre toda la pantalla, y dentro del overlay un modal centrado con absolute.',
    instruccion:
      'Dale a .header position: sticky, top: 0 y z-index: 100. Dale a .overlay position: fixed, inset: 0 y z-index: 200. Dale a .modal position: absolute, top: 50%, left: 50% y transform: translate(-50%, -50%).',
    htmlBase: `<div class="pagina">
  <header class="header">
    <span>Mi App</span>
    <button class="btn-abrir" onclick="document.querySelector('.overlay').style.display='flex'">
      Abrir modal
    </button>
  </header>

  <div class="contenido">
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
    <p>Línea de contenido...</p>
  </div>

  <div class="overlay" style="display:none;">
    <div class="modal">
      <h2>Soy el modal</h2>
      <p>Centrado con position absolute + transform.</p>
      <button onclick="document.querySelector('.overlay').style.display='none'">
        Cerrar
      </button>
    </div>
  </div>
</div>`,
    cssBase: `/* 1. Header sticky */
.header {
  background: #1e1e2e;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* escribe aquí */
}

/* 2. Overlay que cubre toda la pantalla */
.overlay {
  background: rgba(0, 0, 0, 0.6);
  /* escribe aquí */
}

/* 3. Modal centrado dentro del overlay */
.modal {
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 360px;
  /* escribe aquí */
}

/* helpers - no tocar */
.pagina { height: 600px; overflow-y: auto; }
.contenido { padding: 24px; }
.btn-abrir { background: #cba6f7; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
.modal button { margin-top: 16px; padding: 8px 20px; cursor: pointer; }`,
    reglas: [
      { selector: '.header', propiedad: 'position', valor: 'sticky' },
      { selector: '.header', propiedad: 'top', valor: '0' },
      { selector: '.header', propiedad: 'z-index', valor: '100' },
      { selector: '.overlay', propiedad: 'position', valor: 'fixed' },
      { selector: '.overlay', propiedad: 'inset', valor: '0' },
      { selector: '.overlay', propiedad: 'z-index', valor: '200' },
      { selector: '.modal', propiedad: 'position', valor: 'absolute' },
      { selector: '.modal', propiedad: 'top', valor: '50%' },
      { selector: '.modal', propiedad: 'left', valor: '50%' },
      { selector: '.modal', propiedad: 'transform', valor: 'translate(-50%, -50%)' }
    ]
  }
]

// ============================================================

export const retosCascadaHover = [
  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'cas-especificidad-basico',
    titulo: 'Reto: Especificidad gana al selector genérico',
    descripcion:
      'Existe un conflicto entre una regla general y una más específica. Haz que gane la específica.',
    instruccion:
      'Dale al #mensaje color: royalblue. El texto también tiene una regla p { color: tomato; } y debe ganar el ID.',
    htmlBase: `<div class="reto-card">
  <p id="mensaje">¿Qué color gana aquí?</p>
</div>`,
    cssBase: `p {
  color: tomato;
}

#mensaje {
  /* escribe aquí */
}`,
    reglas: [{ selector: '#mensaje', propiedad: 'color', valor: 'royalblue' }]
  },

  // ── FÁCIL ──────────────────────────────────────────────────
  {
    id: 'hov-boton-basico',
    titulo: 'Reto: Estado :hover en botón',
    descripcion:
      'Aplica estilos solo cuando el cursor pasa sobre el botón.',
    instruccion:
      'Dale a .btn:hover background-color: seagreen y color: white.',
    htmlBase: `<div class="reto-card">
  <button class="btn">Pásame el cursor</button>
</div>`,
    cssBase: `.btn {
  background: white;
  color: #1a1a1a;
  border: 1px solid #adb5bd;
  border-radius: 6px;
  padding: 10px 16px;
  cursor: pointer;
}

.btn:hover {
  /* escribe aquí */
}`,
    reglas: [
      { selector: '.btn:hover', propiedad: 'background-color', valor: 'seagreen' },
      { selector: '.btn:hover', propiedad: 'color', valor: 'white' }
    ]
  }
]