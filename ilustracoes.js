// Desenhos em SVG usados nas perguntas
const Ilustracoes = (() => {
  const CAMINHO = 'assets/imagens/';

  const svg = (descricao, corpo, caixa = '0 0 360 340') =>
    `<svg viewBox="${caixa}" role="img" aria-label="${descricao}" xmlns="http://www.w3.org/2000/svg">${corpo}</svg>`;

  const pato = (x, y, escala = 1, corpo = '#facc15', asa = '#eab308') => `
    <g transform="translate(${x} ${y}) scale(${escala})">
      <path d="M-30 -8 q-16 -6 -14 -22 q12 4 22 12z" fill="${corpo}"/>
      <ellipse cx="0" cy="0" rx="34" ry="22" fill="${corpo}"/>
      <ellipse cx="-4" cy="3" rx="17" ry="11" fill="${asa}"/>
      <circle cx="22" cy="-22" r="17" fill="${corpo}"/>
      <path d="M36 -23 q15 -2 15 4 q0 6 -15 4z" fill="#fb923c"/>
      <circle cx="26" cy="-27" r="3.6" fill="#1e293b"/><circle cx="27.2" cy="-28.2" r="1.2" fill="#fff"/>
      <circle cx="18" cy="-17" r="4.2" fill="#fda4af" opacity=".85"/>
    </g>`;

  const lago = `
    <ellipse cx="180" cy="245" rx="170" ry="82" fill="#38bdf8"/>
    <ellipse cx="180" cy="252" rx="140" ry="62" fill="#0ea5e9" opacity=".55"/>
    <path d="M70 262 q30 -8 60 0 M230 232 q30 -8 60 0" stroke="#fff" stroke-width="4" stroke-linecap="round" fill="none" opacity=".8"/>`;

  const folhaLirio = (x, y, rx = 30) => `
    <g transform="translate(${x} ${y})"><ellipse rx="${rx}" ry="${rx * 0.45}" fill="#16a34a"/>
    <path d="M0 0 L${rx} -${rx * 0.12} L${rx} ${rx * 0.12}z" fill="#38bdf8"/></g>`;

  const flor = (x, y) => `
    <g transform="translate(${x} ${y})">
      ${[-50, -25, 0, 25, 50].map(a => `<ellipse cx="0" cy="-11" rx="6" ry="12" fill="#f472b6" transform="rotate(${a})"/>`).join('')}
      <circle cx="0" cy="-2" r="5" fill="#fde047"/>
    </g>`;

  // cenas do nível fácil (lago)
  function cenaPatinhos(quantidade) {
    const posicoes = [[110, 205], [220, 195], [165, 252], [265, 250], [90, 258]];
    const patos = posicoes.slice(0, quantidade).map(([x, y]) => pato(x, y, 0.95)).join('');
    return svg(`${quantidade} patinhos amarelos nadando no lago`, lago + folhaLirio(300, 292, 26) + patos, '0 120 360 220');
  }

  function cenaPatinhoColorido(corpo, asa, nomeCor) {
    return svg(`Um patinho ${nomeCor} no lago`, lago + folhaLirio(60, 292, 28) + pato(170, 205, 2.3, corpo, asa), '0 60 360 280');
  }

  function cenaFlores(quantidade) {
    const folhas = [[70, 215], [170, 190], [270, 215], [110, 280], [220, 270], [300, 285], [50, 275]];
    const flores = folhas.slice(0, quantidade).map(([x, y]) => flor(x, y - 2)).join('');
    const todas = folhas.map(([x, y]) => folhaLirio(x, y, 34)).join('');
    return svg(`${quantidade} flores cor-de-rosa sobre folhas no lago`, lago + todas + flores, '0 140 360 200');
  }

  function cenaLagoPergunta(descricao) {
    return svg(descricao, lago + folhaLirio(70, 280, 30) + folhaLirio(290, 215, 28) + pato(185, 200, 1.7) +
      `<g transform="translate(250 70)"><rect x="-34" y="-34" width="68" height="60" rx="22" fill="#fff" stroke="#10b981" stroke-width="4"/>
       <path d="M-8 26 l-6 18 l22 -18z" fill="#fff" stroke="#10b981" stroke-width="4" stroke-linejoin="round"/>
       <rect x="-12" y="22" width="30" height="8" fill="#fff"/>
       <text y="12" text-anchor="middle" font-size="46" font-weight="800" fill="#059669" font-family="Inter, Segoe UI, Arial, sans-serif">?</text></g>`);
  }

  const bolinha = (cor, nome) =>
    `<svg viewBox="0 0 40 40" role="img" aria-label="${nome}" width="44" height="44"><circle cx="20" cy="20" r="16" fill="${cor}" stroke="rgba(0,0,0,.25)" stroke-width="2.5"/><circle cx="14" cy="14" r="4" fill="#fff" opacity=".55"/></svg>`;

  const forma = (tipo, nome) => {
    const formas = {
      circulo: '<circle cx="20" cy="20" r="16" fill="#3b82f6"/>',
      quadrado: '<rect x="5" y="5" width="30" height="30" rx="4" fill="#f97316"/>',
      triangulo: '<path d="M20 4 L37 35 H3z" fill="#10b981" stroke="#10b981" stroke-width="3" stroke-linejoin="round"/>',
      estrela: '<path d="M20 3 L25 15 L38 16 L28 25 L31 38 L20 31 L9 38 L12 25 L2 16 L15 15z" fill="#facc15" stroke="#eab308" stroke-width="1.5" stroke-linejoin="round"/>'
    };
    return `<svg viewBox="0 0 40 40" role="img" aria-label="${nome}" width="44" height="44">${formas[tipo]}</svg>`;
  };

  // bola de praia e peças de sílaba
  const bolaDePraia = (cx, cy, r) => {
    const k = r / 70;
    return `<g transform="translate(${cx} ${cy}) scale(${k})">
      <ellipse cx="0" cy="${r / k + 22}" rx="64" ry="12" fill="#000" opacity=".12"/>
      <circle r="70" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <path d="M0 -70 C-32 -35 -32 35 0 70z" fill="#facc15"/>
      <path d="M0 -70 C32 -35 32 35 0 70z" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1.5"/>
      <ellipse cx="-34" cy="-30" rx="10" ry="20" fill="#fff" opacity=".4"/>
    </g>`;
  };

  const peca = (x, y, largura, texto, cor, borda, tamanhoFonte = 32) => `
    <rect x="${x}" y="${y}" width="${largura}" height="58" rx="14" fill="${cor}" stroke="${borda}" stroke-width="3"/>
    <text x="${x + largura / 2}" y="${y + 40}" text-anchor="middle" font-size="${tamanhoFonte}" font-weight="800" fill="#fff" font-family="Inter, Segoe UI, Arial, sans-serif">${texto}</text>`;

  const mais = (x, y) => `<text x="${x}" y="${y}" text-anchor="middle" font-size="32" font-weight="800" fill="#f59e0b" font-family="Inter, Segoe UI, Arial, sans-serif">+</text>`;

  function bolaComSilabas(silabas) {
    const cores = [['#3b82f6', '#1d4ed8'], ['#10b981', '#047857'], ['#a855f7', '#7e22ce']];
    const larg = silabas.length === 2 ? 100 : 84;
    const espaco = 30;
    const total = silabas.length * larg + (silabas.length - 1) * espaco;
    let x = (360 - total) / 2, corpo = bolaDePraia(180, 100, 66);
    silabas.forEach((s, i) => {
      corpo += peca(x, 215, larg, s, cores[i][0], cores[i][1]);
      if (i < silabas.length - 1) corpo += mais(x + larg + espaco / 2, 254);
      x += larg + espaco;
    });
    return svg(`Uma bola de praia e a palavra ${silabas.join('-')} dividida em ${silabas.length} pedaços`, corpo);
  }

  function galinhaComSilabas(silabas) {
    const cores = [['#3b82f6', '#1d4ed8'], ['#10b981', '#047857'], ['#f59e0b', '#b45309']];
    const larg = 88, espaco = 26;
    const total = silabas.length * larg + (silabas.length - 1) * espaco;
    let x = (360 - total) / 2;
    let corpo = `<image href="${CAMINHO}animal-galinha.png" x="105" y="20" width="150" height="150"/>`;
    silabas.forEach((s, i) => {
      corpo += peca(x, 215, larg, s, cores[i][0], cores[i][1], 28);
      if (i < silabas.length - 1) corpo += mais(x + larg + espaco / 2, 254);
      x += larg + espaco;
    });
    return svg(`Uma galinha e a palavra ${silabas.join('-')} dividida em ${silabas.length} pedaços`, corpo);
  }

  function rimaComBola() {
    const corpo = bolaDePraia(180, 96, 62) +
      peca(22, 222, 120, 'BOLA', '#3b82f6', '#1d4ed8', 30) +
      `<text x="180" y="248" text-anchor="middle" font-size="19" font-weight="800" fill="#b45309" font-family="Inter, Segoe UI, Arial, sans-serif">rima</text>
       <text x="180" y="270" text-anchor="middle" font-size="19" font-weight="800" fill="#b45309" font-family="Inter, Segoe UI, Arial, sans-serif">com</text>` +
      peca(218, 222, 120, '?', '#f59e0b', '#b45309', 38);
    return svg('A palavra BOLA ao lado de uma interrogação: qual palavra rima com ela?', corpo);
  }

  function cenaSom(texto) {
    const onda = (r, o) => `<path d="M${150 + r} ${150 - r} A${r * 1.6} ${r * 1.6} 0 0 1 ${150 + r} ${150 + r}" fill="none" stroke="#f59e0b" stroke-width="9" stroke-linecap="round" opacity="${o}"/>`;
    const corpo = `
      <path d="M70 120 h38 l48 -36 v132 l-48 -36 h-38z" fill="#f59e0b" stroke="#b45309" stroke-width="5" stroke-linejoin="round"/>
      ${onda(30, 1)}${onda(62, 0.75)}${onda(94, 0.5)}
      <text x="270" y="70" font-size="42" fill="#1e293b">♪</text><text x="300" y="120" font-size="34" fill="#1e293b">♫</text>
      <g transform="translate(40 232)"><rect width="280" height="70" rx="35" fill="#fff" stroke="#fcd34d" stroke-width="5"/>
      <text x="140" y="48" text-anchor="middle" font-size="34" font-weight="800" fill="#b45309" font-family="Inter, Segoe UI, Arial, sans-serif">${texto}</text></g>`;
    return svg(`Um alto-falante tocando o som ${texto}`, corpo);
  }

  // cenas do nível difícil
  const arvore = (x, y) => `
    <g transform="translate(${x} ${y})"><rect x="-7" y="30" width="14" height="86" rx="3" fill="#7c3d12"/>
    <ellipse cx="0" cy="0" rx="40" ry="46" fill="#16a34a"/>
    <circle cx="14" cy="-16" r="8" fill="#f43f5e"/><circle cx="-14" cy="8" r="6" fill="#facc15"/></g>`;

  function elefanteGrande() {
    const corpo = arvore(52, 78) +
      `<ellipse cx="300" cy="250" rx="52" ry="30" fill="#22c55e"/><ellipse cx="60" cy="262" rx="46" ry="28" fill="#4ade80"/>
       <ellipse cx="180" cy="296" rx="100" ry="15" fill="#166534" opacity=".28"/>
       <image href="${CAMINHO}elefante.png" x="86" y="108" width="200" height="193"/>
       <g transform="translate(318 306)"><ellipse rx="14" ry="11" fill="#ef4444" stroke="#b91c1c" stroke-width="2"/>
       <path d="M0 -11 V11" stroke="#7f1d1d" stroke-width="2"/><circle cx="-5" cy="-3" r="2" fill="#1e293b"/><circle cx="5" cy="3" r="2" fill="#1e293b"/></g>
       <text x="318" y="288" text-anchor="middle" font-size="12" font-weight="700" fill="#9f1239" font-family="Inter, Segoe UI, Arial, sans-serif">Menor</text>`;
    return svg('Um elefante grande ao lado de uma árvore e uma joaninha minúscula', corpo);
  }

  function tresBolas() {
    const bola = (x, r, cor, borda) => `<g><ellipse cx="${x}" cy="262" rx="${r * 0.9}" ry="${r * 0.22}" fill="#166534" opacity=".25"/>
      <circle cx="${x}" cy="${258 - r}" r="${r}" fill="${cor}" stroke="${borda}" stroke-width="3"/>
      <circle cx="${x - r * 0.35}" cy="${258 - r * 1.35}" r="${r * 0.2}" fill="#fff" opacity=".5"/></g>`;
    return svg('Três bolas de tamanhos diferentes: uma vermelha pequena, uma azul grande e uma amarela média',
      bola(80, 24, '#ef4444', '#b91c1c') + bola(190, 62, '#3b82f6', '#1d4ed8') + bola(300, 40, '#facc15', '#ca8a04'));
  }

  function caixaComBola() {
    const corpo = `
      <ellipse cx="140" cy="272" rx="112" ry="14" fill="#166534" opacity=".25"/>
      <path d="M40 152 L4 112 L66 112 L74 130z" fill="#f59e0b" stroke="#92400e" stroke-width="3" stroke-linejoin="round"/>
      <path d="M60 130 L240 130 L276 96 L224 96z" fill="#fbbf24" stroke="#92400e" stroke-width="3" stroke-linejoin="round"/>
      <path d="M40 152 L60 130 L240 130 L220 152z" fill="#78350f"/>
      <circle cx="132" cy="150" r="34" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <circle cx="120" cy="137" r="8" fill="#fff" opacity=".5"/>
      <path d="M220 152 L240 130 L240 246 L220 268z" fill="#b45309" stroke="#92400e" stroke-width="3" stroke-linejoin="round"/>
      <rect x="40" y="152" width="180" height="116" rx="6" fill="#d97706" stroke="#92400e" stroke-width="4"/>
      <rect x="96" y="176" width="68" height="12" rx="6" fill="#92400e" opacity=".5"/>
      <ellipse cx="306" cy="280" rx="34" ry="8" fill="#166534" opacity=".25"/>
      <circle cx="306" cy="246" r="32" fill="#3b82f6" stroke="#1d4ed8" stroke-width="3"/>
      <circle cx="294" cy="234" r="7" fill="#fff" opacity=".5"/>`;
    return svg('Uma caixa aberta com uma bola vermelha dentro e uma bola azul do lado de fora', corpo);
  }

  function mesaComBolinha() {
    const corpo = `
      <rect x="40" y="136" width="280" height="22" rx="8" fill="#a16207" stroke="#713f12" stroke-width="3"/>
      <rect x="62" y="158" width="18" height="120" fill="#a16207" stroke="#713f12" stroke-width="3"/>
      <rect x="280" y="158" width="18" height="120" fill="#a16207" stroke="#713f12" stroke-width="3"/>
      <ellipse cx="180" cy="284" rx="60" ry="9" fill="#166534" opacity=".25"/>
      <circle cx="180" cy="256" r="26" fill="#ef4444" stroke="#b91c1c" stroke-width="3"/>
      <circle cx="170" cy="246" r="6" fill="#fff" opacity=".5"/>
      <path d="M150 136 q-6 -34 8 -52 h40 q14 18 8 52z" fill="#38bdf8" stroke="#0284c7" stroke-width="3"/>
      ${flor(168, 74)}${flor(190, 66)}${flor(206, 78)}`;
    return svg('Uma mesa com um vaso de flores em cima e uma bola vermelha embaixo', corpo);
  }

  function sequenciaDeBolinhas() {
    const cores = ['#ef4444', '#3b82f6', '#ef4444', '#3b82f6'];
    const itens = cores.map((c, i) => `<circle cx="${42 + i * 62}" cy="150" r="26" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="3"/>`).join('');
    const duvida = `<rect x="262" y="120" width="60" height="60" rx="16" fill="#fff" stroke="#f43f5e" stroke-width="4" stroke-dasharray="8 6"/>
      <text x="292" y="165" text-anchor="middle" font-size="44" font-weight="800" fill="#e11d48" font-family="Inter, Segoe UI, Arial, sans-serif">?</text>`;
    return svg('Uma fila com bolinhas vermelha, azul, vermelha, azul e uma interrogação no final', itens + duvida);
  }

  return { cenaPatinhos, cenaPatinhoColorido, cenaFlores, cenaLagoPergunta, bolinha, forma,
           bolaComSilabas, galinhaComSilabas, rimaComBola, cenaSom,
           elefanteGrande, tresBolas, caixaComBola, mesaComBolinha, sequenciaDeBolinhas };
})();
