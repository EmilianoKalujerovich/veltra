(function(){
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  // Header al scrollear
  const hdr = document.getElementById('hdr');
  const onScrollHdr = () => hdr.classList.toggle('scrolled', scrollY > 20);
  addEventListener('scroll', onScrollHdr, {passive:true}); onScrollHdr();

  // Máquina de escribir
  const words = ['Automatización','Inteligencia','Eficiencia','Tiempo libre'];
  const typeEl = document.getElementById('type');
  if (!reduce) {
    let w = 0, i = words[0].length, del = false;
    (function step(){
      const word = words[w];
      if (!del) {
        i++;
        if (i > word.length) { del = true; return setTimeout(step, 2200); }
      } else {
        i--;
        if (i === 0) { del = false; w = (w + 1) % words.length; return setTimeout(step, 300); }
      }
      typeEl.textContent = words[w].slice(0, i);
      setTimeout(step, del ? 45 : 85);
    })();
  }

  // Marquee: duplicar contenido para loop infinito
  const track = document.getElementById('track');
  if (!reduce) track.innerHTML += track.innerHTML;

  // Spotlight de tarjetas
  const cards = document.getElementById('cards');
  cards.addEventListener('pointermove', e => {
    cards.querySelectorAll('.card').forEach(c => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--x', (e.clientX - r.left) + 'px');
      c.style.setProperty('--y', (e.clientY - r.top) + 'px');
      c.firstElementChild.style.setProperty('--x', (e.clientX - r.left) + 'px');
      c.firstElementChild.style.setProperty('--y', (e.clientY - r.top) + 'px');
    });
  });

  // Revelado + contadores
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    e.target.querySelectorAll('[data-count]').forEach(countUp);
    io.unobserve(e.target);
  }), {threshold:.15});
  document.querySelectorAll('.rv').forEach(n => io.observe(n));

  function countUp(n){
    const to = +n.dataset.count;
    if (reduce) { n.textContent = to; return; }
    const t0 = performance.now(), dur = 1600;
    (function f(t){
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      n.textContent = Math.round(to * e);
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }

  // Línea de pasos que se dibuja con el scroll
  const steps = document.getElementById('steps');
  const fill = document.getElementById('stepsFill');
  const stepEls = steps.querySelectorAll('.step');
  function onScrollSteps(){
    const r = steps.getBoundingClientRect();
    const vh = innerHeight;
    const p = clamp((vh * .75 - r.top) / (r.height + vh * .2), 0, 1);
    fill.style.setProperty('--p', reduce ? 1 : p);
    stepEls.forEach((s, k) => s.classList.toggle('on', reduce || p >= k / (stepEls.length - .2)));
  }
  addEventListener('scroll', onScrollSteps, {passive:true}); addEventListener('resize', onScrollSteps); onScrollSteps();

  // ===== Partículas (Three.js) =====
  const canvas = document.getElementById('particles');
  let gl = null;
  try { gl = window.THREE && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')); } catch (e) { gl = null; }
  if (!gl) { canvas.style.display = 'none'; return; }

  const isMobile = () => innerWidth < 760;
  const N = isMobile() ? 3200 : 7000;
  // Partículas destacadas al final del buffer: circuito del logo / paquetes de datos del flujo
  const PACKETS = 14, PER_PACKET = isMobile() ? 24 : 40, NP = PACKETS * PER_PACKET, P0 = N - NP;
  const renderer = new THREE.WebGLRenderer({canvas, context: gl, antialias: false, alpha: true});
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setSize(innerWidth, innerHeight, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, .1, 100);
  camera.position.z = 6;

  // Píxeles dibujados en un canvas 2D (cada 2 px)
  function pixels(cw, ch, draw){
    const c = document.createElement('canvas'); c.width = cw; c.height = ch;
    const ctx = c.getContext('2d'); ctx.fillStyle = ctx.strokeStyle = '#fff'; draw(ctx);
    const d = ctx.getImageData(0, 0, cw, ch).data, pts = [];
    for (let y = 0; y < ch; y += 2) for (let x = 0; x < cw; x += 2) if (d[(y * cw + x) * 4 + 3] > 128) pts.push(x, y);
    return pts;
  }
  // Reparte las partículas sobre las capas dibujadas, centradas en el origen y con `worldW` de ancho.
  // `body` son capas [draw, peso] para las partículas comunes; `hi` es la capa de las partículas
  // destacadas (las que en el flujo hacen de paquetes de datos).
  function fromCanvas(cw, ch, worldW, body, hi){
    const layers = body.map(([draw, w]) => ({pts: pixels(cw, ch, draw), w}));
    const hiPts = hi ? pixels(cw, ch, hi) : null;
    const total = layers.reduce((s, l) => s + l.w, 0);
    const a = new Float32Array(N * 3), k = worldW / cw;
    for (let i = 0; i < N; i++){
      let pts;
      if (i >= P0 && hiPts) pts = hiPts;
      else {
        let r = Math.random() * total, l = 0;
        while (r > layers[l].w && l < layers.length - 1) r -= layers[l++].w;
        pts = layers[l].pts;
      }
      const j = Math.floor(Math.random() * pts.length / 2);
      a[i*3]   = (pts[j*2] + Math.random() * 2 - cw / 2) * k;
      a[i*3+1] = -(pts[j*2+1] + Math.random() * 2 - ch / 2) * k;
      a[i*3+2] = (Math.random() - .5) * .2;
    }
    return a;
  }

  // 1) La V del logo (mismas coordenadas que el SVG del header)
  const V_PATH = 'M222 296H414L512 680L600 296H800L560 790H465Z';
  const vSpace = ctx => { const s = 512 / 620; ctx.setTransform(s, 0, 0, s, -200 * s, -250 * s); };
  const vCut = ctx => {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 14; ctx.stroke(new Path2D('M222 296L427 375M800 296L597 375'));
    ctx.beginPath(); ctx.arc(427, 375, 36, 0, 7); ctx.arc(597, 375, 36, 0, 7); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  };
  const logoV = () => fromCanvas(512, 480, 3.3, [
    [ctx => { vSpace(ctx); ctx.fill(new Path2D(V_PATH)); vCut(ctx); }, .5],
    [ctx => { vSpace(ctx); ctx.lineWidth = 7; ctx.stroke(new Path2D(V_PATH)); vCut(ctx); }, .5]
  ], ctx => {
    vSpace(ctx);
    ctx.lineWidth = 13; ctx.lineJoin = 'round';
    ctx.stroke(new Path2D('M427 375L512 450L597 375M512 450V520'));
    ctx.beginPath(); ctx.arc(427, 375, 21, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(597, 375, 21, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(512, 532, 27, 0, 7); ctx.fill();
  });

  // 2) La palabra VELTRA
  const wordFont = ctx => {
    ctx.font = '800 128px Inter, system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if ('letterSpacing' in ctx) ctx.letterSpacing = '6px';
  };
  const wordmark = () => fromCanvas(640, 150, 4.1, [
    [ctx => { wordFont(ctx); ctx.fillText('VELTRA', 320, 80); }, .6],
    [ctx => { wordFont(ctx); ctx.lineWidth = 3; ctx.strokeText('VELTRA', 320, 80); }, .4]
  ]);

  // 3) Flujo de automatización: WhatsApp/Email → IA → CRM/Calendario/Facturación → Sheets
  const NODES = {
    wa:   {x:-1.75, y: .55, box:true}, mail: {x:-1.75, y:-.55, box:true},
    ia:   {x: -.55, y: 0,   r:.36},
    crm:  {x:  .6,  y: .8,  box:true}, cal:  {x: .6, y: 0, box:true}, fac: {x: .6, y:-.8, box:true},
    sh:   {x: 1.75, y: 0,   box:true}
  };
  const HALF = .2; // medio lado de cada nodo cuadrado
  const LINKS = [['wa','ia'],['mail','ia'],['ia','crm'],['ia','cal'],['ia','fac'],['crm','sh'],['cal','sh'],['fac','sh']];
  const edge = (n, side) => n.box ? n.x + side * HALF : n.x + side * n.r;
  const CURVES = LINKS.map(([a, b]) => {
    const A = NODES[a], B = NODES[b];
    const x1 = edge(A, 1), x2 = edge(B, -1), dx = (x2 - x1) * .5;
    return [x1, A.y, x1 + dx, A.y, x2 - dx, B.y, x2, B.y];
  });
  function bez(c, t, out){
    const u = 1 - t, a = u*u*u, b = 3*u*u*t, d = 3*u*t*t, e = t*t*t;
    out.x = a*c[0] + b*c[2] + d*c[4] + e*c[6];
    out.y = a*c[1] + b*c[3] + d*c[5] + e*c[7];
    return out;
  }
  const FW = 4.2, FH = 2.4, FPX = 512 / FW;
  const flow = () => fromCanvas(512, Math.round(FH * FPX), FW, [[ctx => {
    const X = x => (x + FW / 2) * FPX, Y = y => (FH / 2 - y) * FPX;
    ctx.lineWidth = 3;
    CURVES.forEach(c => {
      ctx.beginPath(); ctx.moveTo(X(c[0]), Y(c[1]));
      ctx.bezierCurveTo(X(c[2]), Y(c[3]), X(c[4]), Y(c[5]), X(c[6]), Y(c[7])); ctx.stroke();
    });
    ctx.lineWidth = 5;
    Object.values(NODES).forEach(n => {
      if (n.box) {
        const s = HALF * FPX * 2;
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(X(n.x) - s/2, Y(n.y) - s/2, s, s, 12) : ctx.rect(X(n.x) - s/2, Y(n.y) - s/2, s, s);
        ctx.stroke();
        ctx.beginPath(); ctx.arc(X(n.x), Y(n.y), 5, 0, 7); ctx.fill();
      } else {
        ctx.lineWidth = 7;
        ctx.beginPath(); ctx.arc(X(n.x), Y(n.y), n.r * FPX, 0, 7); ctx.stroke();
        // destello de IA
        const cx = X(n.x), cy = Y(n.y), r = 16;
        ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.quadraticCurveTo(cx, cy, cx + r, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy + r); ctx.quadraticCurveTo(cx, cy, cx - r, cy);
        ctx.quadraticCurveTo(cx, cy, cx, cy - r); ctx.fill();
        ctx.lineWidth = 5;
      }
    });
  }, 1]]);

  const SHAPES = [
    {name:'Veltra', pos:logoV()},
    {name:'Veltra', pos:null},          // se completa al cargar la fuente
    {name:'Tu flujo, automatizado', pos:flow(), flow:true}
  ];
  SHAPES[1].pos = wordmark();
  const LABELS = ['Veltra', 'Nuestro nombre', 'Tu flujo, automatizado'];
  if (document.fonts && document.fonts.load) {
    document.fonts.load('800 128px Inter').then(() => { SHAPES[1].pos = wordmark(); if (shapeIdx === 1) target = SHAPES[1].pos; });
  }
  const flowBuf = new Float32Array(SHAPES[2].pos);

  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(SHAPES[0].pos);
  const col = new Float32Array(N * 3), seed = new Float32Array(N), scl = new Float32Array(N);
  const cA = new THREE.Color('#22d3ee'), cB = new THREE.Color('#7c5cff'), cC = new THREE.Color('#c4b5fd'), tmp = new THREE.Color();
  for (let i = 0; i < N; i++){
    const t = Math.random();
    if (i >= P0) tmp.copy(cA).lerp(new THREE.Color('#ffffff'), .35);
    else if (t < .6) tmp.copy(cB).lerp(cA, t / .6);
    else tmp.copy(cB).lerp(cC, (t - .6) / .4 * .7);
    tmp.offsetHSL(0, 0, (Math.random() - .5) * .08);
    col[i*3] = tmp.r; col[i*3+1] = tmp.g; col[i*3+2] = tmp.b;
    seed[i] = Math.random(); scl[i] = i >= P0 ? 1.1 + Math.random() * .6 : .6 + Math.random() * .9;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  geo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1));

  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: {uTime:{value:0}, uSize:{value:isMobile() ? 32 : 28}, uPR:{value:renderer.getPixelRatio()}, uOpacity:{value:0}},
    vertexShader: `
      attribute vec3 aColor; attribute float aSeed; attribute float aScale;
      uniform float uTime, uSize, uPR;
      varying vec3 vColor; varying float vTw;
      void main(){
        vec3 p = position;
        p += 0.02 * vec3(sin(uTime * 1.3 + aSeed * 40.0), cos(uTime * 1.1 + aSeed * 30.0), sin(uTime * .9 + aSeed * 20.0));
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = uSize * aScale * uPR / -mv.z;
        gl_Position = projectionMatrix * mv;
        vColor = aColor;
        vTw = 0.65 + 0.35 * sin(uTime * 2.0 + aSeed * 60.0);
      }`,
    fragmentShader: `
      uniform float uOpacity; varying vec3 vColor; varying float vTw;
      void main(){
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vColor * (0.8 + a * 0.6), a * a * uOpacity * vTw);
      }`
  });
  const group = new THREE.Group();
  group.add(new THREE.Points(geo, mat));
  scene.add(group);

  // Estado de la forma activa
  let shapeIdx = 0, target = SHAPES[0].pos, lastSwitch = 0, mode = 'hero';
  const label = document.getElementById('shapeLabel');
  const dotBtns = [...document.getElementById('shapeDots').children];
  function setShape(i, t){
    shapeIdx = i; if (mode === 'hero') target = SHAPES[i].flow ? flowBuf : SHAPES[i].pos;
    label.innerHTML = `0${i + 1} — <b>${LABELS[i]}</b>`;
    dotBtns.forEach((d, k) => d.classList.toggle('on', k === i));
    lastSwitch = t;
  }
  const clock = new THREE.Clock();
  dotBtns.forEach((b, k) => b.addEventListener('click', () => setShape(k, clock.elapsedTime)));

  // Mouse en coordenadas del mundo
  let mouseX = -1e4, mouseY = -1e4, hasMouse = false;
  addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; mouseX = e.clientX; mouseY = e.clientY; hasMouse = true; });
  document.addEventListener('mouseleave', () => { hasMouse = false; });
  addEventListener('resize', () => {
    camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight, false);
  });

  // Las partículas se ubican sobre el "slot" visible (hero o CTA)
  const heroSlot = document.getElementById('heroSlot'), ctaSlot = document.getElementById('ctaSlot');
  const halfH = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
  function visibleFrac(r){ return clamp((Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / Math.max(1, r.height), 0, 1); }
  function slotLayout(el, shapeW, shapeH){
    const r = el.getBoundingClientRect(), wpp = 2 * halfH / innerHeight;
    const pad = .9;
    return {
      x: (r.left + r.width / 2 - innerWidth / 2) * wpp,
      y: -(r.top + r.height / 2 - innerHeight / 2) * wpp,
      s: Math.min(r.width * pad / shapeW, r.height * pad / shapeH) * wpp,
      vis: visibleFrac(r)
    };
  }
  const SIZES = [[3.3, 3.1], [4.1, 1.1], [FW, FH]];

  let gx = 0, gy = 0, gs = 1, opacity = 0, placed = false, labelOp = 0;
  const pt = {x:0, y:0}, v3 = new THREE.Vector3();

  const NODE_NAMES = {wa:'WhatsApp', mail:'Email', ia:'IA', crm:'CRM', cal:'Calendario', fac:'Facturación', sh:'Google Sheets'};
  const flowLabels = document.getElementById('flowLabels');
  const labelEls = Object.entries(NODES).map(([id, n]) => {
    const el = document.createElement('span'); el.textContent = NODE_NAMES[id];
    if (id === 'ia') el.className = 'ia';
    flowLabels.appendChild(el);
    return {el, n};
  });

  function frame(){
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(clock.getDelta(), .05), t = clock.elapsedTime;

    const hr = heroSlot.getBoundingClientRect(), cr = ctaSlot.getBoundingClientRect();
    const heroVis = visibleFrac(hr), ctaVis = visibleFrac(cr);
    const inCta = ctaVis > heroVis && ctaVis > .05;
    if (inCta && mode !== 'cta') { mode = 'cta'; target = SHAPES[0].pos; }
    else if (!inCta && mode !== 'hero') { mode = 'hero'; setShape(shapeIdx, t); }

    if (mode === 'hero' && !reduce && t - lastSwitch > 5.5) setShape((shapeIdx + 1) % SHAPES.length, t);

    // Paquetes viajando por las conexiones del flujo
    if (SHAPES[shapeIdx].flow && mode === 'hero') {
      for (let p = 0; p < PACKETS; p++){
        const c = CURVES[p % CURVES.length];
        const tt = reduce ? .5 : (t * .32 + p * .618) % 1;
        bez(c, tt, pt);
        for (let j = 0; j < PER_PACKET; j++){
          const i = P0 + p * PER_PACKET + j, s = seed[i] * 6.283, rr = .035 * Math.sqrt(seed[(i * 7) % N]);
          flowBuf[i*3] = pt.x + Math.cos(s) * rr; flowBuf[i*3+1] = pt.y + Math.sin(s) * rr; flowBuf[i*3+2] = .05;
        }
      }
    }

    // Ubicación, escala y opacidad del grupo
    const idx = mode === 'cta' ? 0 : shapeIdx;
    const L = slotLayout(mode === 'cta' ? ctaSlot : heroSlot, SIZES[idx][0], SIZES[idx][1]);
    const tOp = Math.max(L.vis, 0) * (isMobile() && mode === 'hero' ? .85 : 1);
    if (!placed || opacity < .03) { gx = L.x; gy = L.y; gs = L.s; placed = true; }
    gx += (L.x - gx) * .12; gy += (L.y - gy) * .12; gs += (L.s - gs) * .06;
    opacity += (tOp - opacity) * .06;
    group.position.set(gx, gy, 0); group.scale.setScalar(gs);
    mat.uniforms.uOpacity.value = opacity; mat.uniforms.uTime.value = t;

    const wob = reduce ? 0 : Math.sin(t * .6) * .15;
    group.rotation.y += (wob - group.rotation.y) * .05;

    // Etiquetas de los nodos del flujo, siguiendo al grupo
    const showLabels = mode === 'hero' && SHAPES[shapeIdx].flow;
    labelOp += ((showLabels ? opacity : 0) - labelOp) * .08;
    flowLabels.style.opacity = labelOp.toFixed(3);
    if (labelOp > .01) {
      group.updateMatrixWorld();
      labelEls.forEach(({el, n}) => {
        v3.set(n.x, n.y - (n.box ? HALF + .13 : n.r + .13), 0).applyMatrix4(group.matrixWorld).project(camera);
        el.style.transform = `translate(${((v3.x + 1) / 2 * innerWidth).toFixed(1)}px, ${((1 - v3.y) / 2 * innerHeight).toFixed(1)}px) translate(-50%, -50%)`;
      });
    }

    // Mouse → coordenadas locales del grupo
    let mx = 1e4, my = 1e4;
    if (hasMouse && opacity > .2) {
      const wpp = 2 * halfH / innerHeight;
      mx = ((mouseX - innerWidth / 2) * wpp - gx) / gs;
      my = (-(mouseY - innerHeight / 2) * wpp - gy) / gs;
    }
    const ry = group.rotation.y, c = Math.cos(ry), s = Math.sin(ry);
    const R = .55, R2 = R * R, k = reduce ? .2 : .06;
    for (let i = 0; i < N; i++){
      const i3 = i * 3;
      let x = pos[i3], y = pos[i3+1], z = pos[i3+2];
      x += (target[i3] - x) * k; y += (target[i3+1] - y) * k; z += (target[i3+2] - z) * k;
      const lx = x * c + z * s, dx = lx - mx, dy = y - my, d2 = dx * dx + dy * dy;
      if (d2 < R2) {
        const d = Math.sqrt(d2) || .001, f = (R - d) / R * .3;
        const px = dx / d * f, py = dy / d * f;
        x += c * px; z += s * px; y += py;
      }
      pos[i3] = x; pos[i3+1] = y; pos[i3+2] = z;
    }
    geo.attributes.position.needsUpdate = true;
    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
})();
