/* ============ PERGUNTAS ============
 tipo "c" (múltipla escolha): o = [[ícone, texto], ...], a = índice correta
 tipo "d" (arrastar): it = [[ícone, texto, destino]] (destino -1 = errada), z = zonas [[ícone, texto]]
 wav:1 = usa audios/Pxx.wav ; sem wav = voz do navegador lê a pergunta (troque por áudio gravado) */
const Q = [
  {
    t: "Contagem",
    q: "Quantos patinhos estão nadando no lago?",
    v: "🦆🦆🦆 🌊",
    o: [["2", "2 patinhos"], ["3", "3 patinhos"], ["4", "4 patinhos"], [
      "5",
      "5 patinhos",
    ]],
    a: 1,
    wav: 1,
  },
  {
    t: "Cores",
    q: "Qual é a cor do céu num dia de sol?",
    v: "☀️ ☁️",
    o: [["🟥", "Vermelho"], ["🟦", "Azul"], ["🟩", "Verde"], ["🟨", "Amarelo"]],
    a: 1,
    wav: 1,
  },
  {
    t: "Animais e Habitats",
    q: "Arraste cada bichinho até o lugar onde ele mora!",
    d: 1,
    it: [["🐟", "Peixinho", 0], ["🐦", "Passarinho", 2], [
      "🐒",
      "Macaquinho",
      1,
    ]],
    z: [["🌊", "Água"], ["🌳", "Árvore"], ["☁️", "Céu"]],
  },
  {
    t: "Consciência Silábica",
    q: "Escuta bem: CA-SA. Quantos pedacinhos tem a palavra CASA?",
    v: "🏠 CA - SA",
    o: [["1", "1 pedacinho"], ["2", "2 pedacinhos"], ["3", "3 pedacinhos"], [
      "4",
      "4 pedacinhos",
    ]],
    a: 1,
    wav: 1,
  },
  {
    t: "Noções Espaciais",
    q: "O gatinho está em cima da cama ou embaixo da cama?",
    v: "🐱🛏️",
    o: [["⏺️", "Dentro da cama"], ["⬆️", "Em cima da cama"], [
      "↩️",
      "Atrás da cama",
    ], ["↔️", "Ao lado da cama"]],
    a: 1,
    wav: 1,
  },
  {
    t: "Letras e Palavras",
    q: "Qual é a primeira letra da palavra BOLA?",
    v: "⚽ BOLA",
    o: [["A", ""], ["O", ""], ["B", ""], ["L", ""]],
    a: 2,
    wav: 1,
  },
  {
    t: "Grandezas",
    q: "Qual árvore é maior: a pequenininha ou a grandona?",
    v: "🌱 🌳",
    o: [["🌱", "A pequenininha"], ["🌳", "A grandona"], [
      "🟰",
      "As duas são iguais",
    ], ["❌", "Nenhuma das duas"]],
    a: 1,
    wav: 1,
  },
  {
    t: "Percepção Visual",
    q: "Arraste o círculo até a caixa!",
    d: 1,
    it: [
      ["🟦", "Quadrado", -1],
      ["🔺", "Triângulo", -1],
      ["🔵", "Círculo", 0],
      ["▬", "Retângulo", -1],
    ],
    z: [["📦", "Caixa"]],
  },
  {
    t: "Compreensão Auditiva",
    q: "Escuta o som: MIAU! Qual animal faz esse som?",
    v: "🔊 MIAU!",
    o: [["🐶", "Cachorro"], ["🐱", "Gato"], ["🐦", "Pássaro"], ["🐮", "Vaca"]],
    a: 1,
    wav: 1,
  },
  {
    t: "Contagem",
    q: "Qual cesto tem mais maçãs? Arraste até a taça!",
    d: 1,
    it: [["🍎🍎", "Cesto vermelho", -1], ["🍎", "Cesto amarelo", -1], [
      "🍎🍎🍎🍎",
      "Cesto verde",
      0,
    ], ["🍎🍎🍎", "Cesto azul", -1]],
    z: [["🏆", "Mais maçãs"]],
  },

  {
    t: "Contagem",
    q: "Quantos dedinhos tem a mão na tela? Conta bem!",
    v: "✋",
    o: [["4", "4 dedinhos"], ["6", "6 dedinhos"], ["5", "5 dedinhos"], [
      "3",
      "3 dedinhos",
    ]],
    a: 2,
  },
  {
    t: "Cores",
    q: "Qual cor você faz misturando azul e amarelo? Arraste até o pote!",
    v: "🟦 + 🟨 = ?",
    d: 1,
    it: [["🟧", "Laranja", -1], ["🟪", "Roxo", -1], ["🟩", "Verde", 0], [
      "🩷",
      "Rosa",
      -1,
    ]],
    z: [["🎨", "Pote de tinta"]],
  },
  {
    t: "Animais e Habitats",
    q: "Leve cada animal até o lugar onde ele vive!",
    d: 1,
    it: [["🦒", "Girafa", 0], ["🐻‍❄️", "Urso polar", 1], [
      "🐠",
      "Peixe-palhaço",
      2,
    ], ["🐒", "Macaco", 3]],
    z: [["🌾", "Savana"], ["🧊", "Polo norte"], ["🌊", "Oceano"], [
      "🌲",
      "Floresta",
    ]],
  },
  {
    t: "Consciência Fonológica",
    q: "Qual palavra começa com o som BA? Escuta: BA-LA, BA-LA!",
    v: "BA - LA",
    o: [["🌙", "Lua"], ["🍬", "Bala"], ["🏠", "Casa"], ["🎲", "Dado"]],
    a: 1,
  },
  {
    t: "Noções Espaciais",
    q: "O livro está dentro da mochila ou fora da mochila?",
    v: "📘 ➜ 🎒",
    o: [["⏺️", "Dentro da mochila"], ["↗️", "Fora da mochila"], [
      "↩️",
      "Atrás da mochila",
    ], ["⬆️", "Em cima da mochila"]],
    a: 0,
  },
  {
    t: "Letras e Palavras",
    q: "Quantas letras tem a palavra SOL?",
    v: "☀️ S O L",
    o: [["2", "2 letras"], ["4", "4 letras"], ["3", "3 letras"], [
      "5",
      "5 letras",
    ]],
    a: 2,
  },
  {
    t: "Grandezas",
    q: "O elefante é maior que o ratinho. E o ratinho é ______ que o elefante.",
    v: "🐘 ➜ 🐭",
    o: [["⬆️", "Maior"], ["🟰", "Igual"], ["⬇️", "Menor"], [
      "💪",
      "Mais forte",
    ]],
    a: 2,
  },
  {
    t: "Percepção Visual",
    q: "Qual dessas figuras é diferente das outras? Arraste até a lupa!",
    d: 1,
    it: [["🔴", "Círculo vermelho", -1], ["🔵", "Círculo azul", -1], [
      "🟩",
      "Quadrado verde",
      0,
    ], ["🟡", "Círculo amarelo", -1]],
    z: [["🔍", "É diferente!"]],
  },
  {
    t: "Compreensão Auditiva",
    q: "Escuta o som: TOC-TOC-TOC! O que pode estar fazendo esse som?",
    v: "🔊 TOC! TOC! TOC!",
    o: [["🚗", "Um carro"], ["🐦", "Um pássaro"], [
      "🚪",
      "Alguém batendo na porta",
    ], ["⚽", "Uma bola"]],
    a: 2,
  },
  {
    t: "Contagem",
    q: "Se a borboleta pousar em mais 2 flores, quantas flores ela vai ter visitado no total?",
    v: "🦋 🌸🌸🌸 + 🌸🌸",
    o: [["3", "3 flores"], ["4", "4 flores"], ["5", "5 flores"], [
      "6",
      "6 flores",
    ]],
    a: 2,
  },

  {
    t: "Consciência Silábica",
    q: "A palavra BOR-BO-LE-TA tem quantos pedacinhos de som?",
    v: "🦋 BOR-BO-LE-TA",
    o: [["3", "3 pedacinhos"], ["4", "4 pedacinhos"], ["5", "5 pedacinhos"], [
      "2",
      "2 pedacinhos",
    ]],
    a: 1,
  },
  {
    t: "Cores",
    q: "O morango está escondido! Ele é vermelho. Arraste o morango até a cesta!",
    d: 1,
    it: [["🍇", "Uva roxa", -1], ["🍓", "Morango vermelho", 0], [
      "🍋",
      "Limão verde",
      -1,
    ], ["🍊", "Laranja", -1]],
    z: [["🧺", "Cesta"]],
  },
  {
    t: "Contagem",
    q: "Quantas rodas têm 2 carrinhos juntos?",
    v: "🚗 🚗",
    o: [["6", "6 rodas"], ["8", "8 rodas"], ["4", "4 rodas"], [
      "10",
      "10 rodas",
    ]],
    a: 1,
  },
  {
    t: "Cores",
    q: "Qual dessas cores é a cor da noite, do céu escuro? Arraste até a lua!",
    d: 1,
    it: [["⬜", "Branco", -1], ["🟨", "Amarelo", -1], ["🟥", "Vermelho", -1], [
      "⬛",
      "Preto / azul escuro",
      0,
    ]],
    z: [["🌙", "Céu da noite"]],
  },
  {
    t: "Animais e Habitats",
    q: "Leve cada bichinho para a sua casa! A abelha faz mel.",
    d: 1,
    it: [["🐝", "Abelha", 0], ["🐟", "Peixe", 1], ["🐦", "Pássaro", 2], [
      "🐭",
      "Ratinho",
      3,
    ]],
    z: [["🍯", "Colmeia"], ["🏞️", "Rio"], ["🌳", "Árvore"], ["🕳️", "Buraco"]],
  },
  {
    t: "Consciência Fonológica",
    q: "Escuta o som: SSSSS como de uma cobrinha. Qual palavra tem esse som no começo?",
    v: "🐍 SSSSS",
    o: [["🐸", "Sapo"], ["🐱", "Gato"], ["🐭", "Rato"], ["🦆", "Pato"]],
    a: 0,
  },
  {
    t: "Noções Espaciais",
    q: "O gato está à direita do cachorro. O cachorro está à ______ do gato.",
    v: "🐶 🐱",
    o: [["➡️", "Direita"], ["⬅️", "Esquerda"], ["⏫", "Frente"], [
      "⏬",
      "Atrás",
    ]],
    a: 1,
  },
  {
    t: "Letras e Palavras",
    q: "A palavra GATO tem a letra A no meio. Qual letra vem DEPOIS do A em GATO?",
    v: "🐱 G A T O",
    o: [["G", ""], ["T", ""], ["O", ""], ["A", ""]],
    a: 1,
  },
  {
    t: "Consciência Silábica",
    q: "Junte os pedacinhos: E-LÉ-FAN-TE. Arraste o animal até o balão!",
    v: "E - LÉ - FAN - TE",
    d: 1,
    it: [["🐴", "Cavalo", -1], ["🐘", "Elefante", 0], ["🦒", "Girafa", -1], [
      "🦁",
      "Leão",
      -1,
    ]],
    z: [["💬", "Esse é o animal!"]],
  },
  {
    t: "Percepção Visual",
    q: "Observe a sequência. Qual figura vem depois? Arraste até o ponto de interrogação!",
    v: "🔵 🟦 🔵 🟦 ❓",
    d: 1,
    it: [
      ["🔺", "Triângulo", -1],
      ["🔵", "Círculo", 0],
      ["🟦", "Quadrado", -1],
      ["⭐", "Estrela", -1],
    ],
    z: [["❓", "Próxima figura"]],
  },
];
Q.forEach((q, i) => {
  q.n = Math.floor(i / 10) + 1;
  q.id = String(i + 1).padStart(2, "0");
});

const ESCOLAS = ["Escola Municipal 1", "Escola Municipal 2", "Outra escola"]; // <- troque pelos nomes reais
const NIV = [0, {
  n: "Lago dos Patinhos",
  ic: "🦆",
  c: "g",
  tag: "Nível Fácil",
  d: "Contagem, cores e animais do dia a dia.",
}, {
  n: "Jardim dos Sons",
  ic: "🐦",
  c: "o",
  tag: "Nível Médio",
  d: "Sílabas, sons e letrinhas.",
}, {
  n: "Floresta dos Desafios",
  ic: "🐘",
  c: "r",
  tag: "Nível Difícil",
  d: "Desafios para quem já é craque!",
}];
const $ = (s) => document.querySelector(s);
let P = {}, lv, list, idx, total, hits, errs, left, streak = 0;

/* troca emojis por ilustrações (assets/ilustracoes/*.svg); se faltar o arquivo, mostra o próprio emoji */
const EMO =
  /\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic}\uFE0F?)*/gu;
const emo = (s) =>
  String(s).replace(
    EMO,
    (m) =>
      `<img class="ilus" alt="" src="assets/ilustracoes/${
        [...m].map((c) => c.codePointAt(0).toString(16)).join("-")
      }.svg" onerror="this.replaceWith(document.createTextNode('${m}'))">`,
  );

/* imagens do Figma: se o arquivo não existir, mostra o emoji */
function fix(i) {
  const f = () => {
    const s = document.createElement("span");
    s.className = i.className + " fb";
    s.innerHTML = emo(i.dataset.fb);
    i.replaceWith(s);
  };
  i.complete && !i.naturalWidth ? f() : i.onerror = f;
}
const fixAll = () => document.querySelectorAll("img[data-fb]").forEach(fix);
fixAll();

/* ---- som ---- */
const AC = window.AudioContext || window.webkitAudioContext;
let ac;
function beep(f, d = .15, w = 0) {
  try {
    ac = ac || new AC();
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.value = f;
    o.type = "triangle";
    g.gain.value = .15;
    o.connect(g);
    g.connect(ac.destination);
    o.start(ac.currentTime + w);
    o.stop(ac.currentTime + w + d);
  } catch (e) {}
}
const sOk = () => [523, 659, 784].forEach((f, i) => beep(f, .18, i * .12)),
  sNo = () => {
    streak = 0;
    beep(180, .25);
  };

/* confete */
const cv = $("#confete"), cx = cv.getContext("2d");
let ps = [], raf = 0;
const fit = () => {
  cv.width = innerWidth;
  cv.height = innerHeight;
};
addEventListener("resize", fit);
fit();
function boom(n = 60, x = innerWidth / 2, y = innerHeight * .4) {
  for (let i = 0; i < n; i++) {
    ps.push({
      x,
      y,
      vx: (Math.random() - .5) * 15,
      vy: -Math.random() * 14 - 3,
      r: Math.random() * 8 + 5,
      c: `hsl(${Math.random() * 360} 95% 60%)`,
      l: 80 + Math.random() * 50,
      a: Math.random() * 6,
    });
  }
  if (!raf) tick();
}
function tick() {
  cx.clearRect(0, 0, cv.width, cv.height);
  ps = ps.filter((p) => p.l-- > 0);
  ps.forEach((p) => {
    p.vy += .38;
    p.x += p.vx;
    p.y += p.vy;
    p.a += .22;
    cx.fillStyle = p.c;
    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.a);
    cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * .6);
    cx.restore();
  });
  raf = ps.length ? requestAnimationFrame(tick) : 0;
}
/* Toca arquivos em sequência: tocar("opcoes/P01_2","feedback/acerto"). Arquivo que não existe é ignorado (fica mudo). */
let audio, seq = 0;
function stop() {
  seq++;
  if (audio) {
    audio.onended = audio.onerror = null;
    audio.pause();
  }
}
function tocar(...fs) {
  stop();
  const id = seq;
  const nx = () => {
    if (id !== seq || !fs.length) return;
    const f = fs.shift();
    if (!f) return nx();
    const a = audio = new Audio("audios/" + f + ".wav");
    let d = 0;
    const go = () => {
      if (!d) {
        d = 1;
        nx();
      }
    };
    a.onended = a.onerror = go;
    a.play().catch(go);
  };
  nx();
}
const say = (q) => tocar("perguntas/P" + q.id);

/* ---- telas ---- */
function show(id) {
  stop();
  document.querySelectorAll(".screen").forEach((s) =>
    s.classList.toggle("on", s.id === id)
  );
  scrollTo(0, 0);
}
$("#escola").innerHTML = '<option value="">Escola</option>' +
  ESCOLAS.map((e) => `<option>${e}</option>`).join("");
$("#lform").onsubmit = (e) => {
  e.preventDefault();
  P = {
    nome: $("#nome").value.trim(),
    idade: $("#idade").value,
    escola: $("#escola").value,
  };
  menu();
};
$("#login").addEventListener("pointerdown", () => tocar("telas/login"), {
  once: true,
});
$(".hint").onclick = (e) => {
  if (e.target.id !== "next") tocar("dicas/P" + list[idx].id);
};
$("#lvback").onclick = () => show("login");
$("#gback").onclick = menu;
$("#emenu").onclick = menu;
$("#eagain").onclick = () => play(lv);
$("#ear").onclick = () => say(list[idx]);
$("#next").onclick = () => ++idx < list.length ? load() : end();

function menu() {
  show("levels");
  $("#who").textContent = "👤 " + P.nome;
  let best = {};
  try {
    best = JSON.parse(localStorage.getItem("jb") || "{}");
  } catch (e) {}
  $("#lvcards").innerHTML = NIV.slice(1).map((x, i) =>
    `<article class="card-nivel ${x.c}"><span class="numero-nivel">${
      i + 1
    }</span><span class="tag">${x.tag}</span>
    <div class="medalhao"><img src="assets/nivel${
      i + 1
    }.png" data-fb="${x.ic}" alt=""></div><h3>${x.n}</h3><p>${x.d}</p>
    <span class="pips">${"●".repeat(i + 1)}${
      "○".repeat(2 - i)
    }</span><span class="best">⭐ Melhor: ${best[i + 1] || 0}/30</span>
    <button data-lv="${i + 1}">Jogar ▸</button></article>`
  ).join("");
  tocar("telas/niveis");
  document.querySelectorAll(".card-nivel").forEach((c, i) =>
    c.onclick = (e) => {
      if (e.target.tagName !== "BUTTON") tocar("telas/nivel" + (i + 1));
    }
  );
  fixAll();
  document.querySelectorAll("[data-lv]").forEach((b) =>
    b.onclick = () => play(+b.dataset.lv)
  );
}
function play(l) {
  streak = 0;
  lv = l;
  list = Q.filter((q) => q.n === l);
  idx = 0;
  total = 0;
  hits = 0;
  show("game");
  $("#game").dataset.c = NIV[l].c;
  load();
}

function load() {
  const q = list[idx], cards = q.t.startsWith("Compreensão");
  errs = 0;
  $("#panel").classList.toggle("solo", cards);
  $("#prog").textContent = `${idx + 1}/${list.length}`;
  $("#dots").innerHTML = list.map((_, i) =>
    `<i class="${i < idx ? "on" : i == idx ? "cur" : ""}"></i>`
  ).join("");
  $("#streak").textContent = streak > 1 ? "🔥 " + streak : "";
  $("#score").textContent = "⭐ " + total;
  $("#tag").textContent = q.t;
  $("#q").textContent = q.q;
  $("#v").innerHTML = emo(q.v || "");
  $("#ht").textContent = "💡 " +
    (q.dica || "Clique no 🔊 para ouvir a pergunta de novo.");
  $("#next").style.display = "none";
  const a = $("#area");
  a.innerHTML = "";
  a.className = "";
  q.d ? buildDrag(q, a) : buildChoice(q, a, cards);
  say(q);
}
function done() {
  const s = Math.max(1, 3 - errs);
  total += s;
  if (!errs) {
    hits++;
    streak++;
  }
  sOk();
  boom(55);
  $("#streak").textContent = streak > 1 ? "🔥 " + streak : "";
  const sc = $("#score");
  sc.classList.remove("pop");
  void sc.offsetWidth;
  sc.classList.add("pop");
  sc.textContent = "⭐ " + total;
  $("#ht").textContent = "⭐".repeat(s) + " Muito bem!";
  $("#next").style.display = "block";
  $("#next").scrollIntoView({ behavior: "smooth", block: "nearest" });
}
function end() {
  show("end");
  const ok = hits / list.length >= .8;
  try {
    const b = JSON.parse(localStorage.getItem("jb") || "{}");
    b[lv] = Math.max(b[lv] || 0, total);
    localStorage.setItem("jb", JSON.stringify(b));
  } catch (e) {}
  if (ok) {
    for (let i = 0; i < 4; i++) {
      setTimeout(
        () => boom(90, innerWidth * (.2 + i * .2), innerHeight * .3),
        i * 260,
      );
    }
  } else boom(60);
  $("#etxt").textContent = ok
    ? "Parabéns, você já tem bastante conhecimento geral."
    : "Foi super divertido! Vamos jogar de novo para descobrir coisas novas?";
  tocar(ok ? "telas/fim_parabens" : "telas/fim_divertido");
  $("#esc").textContent =
    `${P.nome}, você acertou ${hits} de ${list.length} de primeira!`;
}

/* ---- múltipla escolha (cards coloridos nas perguntas de som) ---- */
function buildChoice(q, a, cards) {
  a.className = cards ? "cards" : "opts";
  const C = ["g", "o", "r", "b"];
  q.o.forEach(([ic, tx], i) => {
    const b = document.createElement("button");
    b.className = "opt" + (cards ? " card " + C[i % 4] : "");
    b.innerHTML = cards
      ? `<span class="medalhao">${emo(ic)}</span><em>${emo(tx || ic)}</em>`
      : `<i class="letra">${"ABCD"[i]}</i><b>${emo(ic)}</b><span>${tx}</span>`;
    b.onclick = () => {
      const f = "opcoes/P" + q.id + "_" + (i + 1);
      if (i === q.a) {
        b.classList.add("ok");
        a.querySelectorAll(".opt").forEach((x) => x.disabled = true);
        done();
        tocar(f, "feedback/acerto");
      } else {
        errs++;
        sNo();
        b.classList.add("no");
        b.disabled = true;
        tocar(f, "feedback/erro");
      }
    };
    a.append(b);
  });
}

/* ---- arrastar e soltar ---- */
function buildDrag(q, a) {
  const zs = document.createElement("div"), tr = document.createElement("div");
  zs.className = "zones";
  tr.className = "tray";
  q.z.forEach(([ic, tx], i) => {
    const z = document.createElement("div");
    z.className = "zone";
    z.dataset.i = i;
    z.onclick = () => tocar("zonas/P" + q.id + "_" + (i + 1));
    z.innerHTML = `<b>${emo(ic)}</b>${tx}`;
    zs.append(z);
  });
  left = q.it.filter((x) => x[2] >= 0).length;
  q.it.map((x, i) => [...x, i]).sort(() => Math.random() - .5).forEach(
    ([ic, tx, t, k]) => {
      const e = document.createElement("div");
      e.className = "item";
      e.innerHTML = `<b>${emo(ic)}</b>${tx}`;
      makeDrag(e, t, "opcoes/P" + q.id + "_" + (k + 1));
      tr.append(e);
    },
  );
  a.append(zs, tr);
}
function zoneAt(x, y) {
  return document.elementsFromPoint(x, y).find((n) =>
    n.classList && n.classList.contains("zone")
  );
}
function makeDrag(el, t, af) {
  el.onpointerdown = (e) => {
    if (el.classList.contains("done")) return;
    e.preventDefault();
    tocar(af);
    const r = el.getBoundingClientRect(),
      g = el.cloneNode(true),
      dx = e.clientX - r.left,
      dy = e.clientY - r.top;
    g.classList.add("ghost");
    g.style.cssText = `left:${r.left}px;top:${r.top}px;width:${r.width}px`;
    document.body.append(g);
    el.classList.add("lift");
    const mv = (ev) => {
      g.style.left = ev.clientX - dx + "px";
      g.style.top = ev.clientY - dy + "px";
      document.querySelectorAll(".zone.hot").forEach((z) =>
        z.classList.remove("hot")
      );
      const z = zoneAt(ev.clientX, ev.clientY);
      if (z && !z.classList.contains("full")) z.classList.add("hot");
    };
    const up = (ev) => {
      removeEventListener("pointermove", mv);
      removeEventListener("pointerup", up);
      removeEventListener("pointercancel", up);
      g.remove();
      el.classList.remove("lift");
      document.querySelectorAll(".zone.hot").forEach((z) =>
        z.classList.remove("hot")
      );
      const z = zoneAt(ev.clientX, ev.clientY);
      if (!z || z.classList.contains("full")) return;
      if (t === +z.dataset.i) {
        z.classList.add("full");
        z.innerHTML = el.innerHTML + emo("✅");
        el.classList.add("done");
        sOk();
        if (--left === 0) {
          done();
          tocar("feedback/acerto");
        }
      } else {
        errs++;
        sNo();
        tocar("feedback/erro");
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 400);
      }
    };
    addEventListener("pointermove", mv);
    addEventListener("pointerup", up);
    addEventListener("pointercancel", up);
  };
}
