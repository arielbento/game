// Jogo educativo de Brusque
// fluxo: inicio -> niveis -> perguntas -> tela final

const estado = {
  aluno: { nome: "", idade: 0, escola: "" },
  nivel: null,
  perguntas: [],
  indice: 0,
  respostas: [],
  respondida: false,
  tela: "inicio",
  trocando: false,
};

let pecaSelecionada = null;
let ultimoPlacar = "";

const ID_TELAS = {
  "inicio": "tela-inicio",
  "niveis": "tela-niveis",
  "pergunta": "tela-pergunta",
  "final-otimo": "tela-final-otimo",
  "final-incentivo": "tela-final-incentivo",
};

// ---------- funções pequenas ----------

function $(id) {
  return document.getElementById(id);
}

function todos(seletor, raiz) {
  return Array.from((raiz || document).querySelectorAll(seletor));
}

function semMovimento() {
  return window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function esperar(ms) {
  return new Promise(function (ok) {
    setTimeout(ok, semMovimento() ? 0 : ms);
  });
}

function embaralhar(lista) {
  const copia = lista.slice();
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const guardado = copia[i];
    copia[i] = copia[j];
    copia[j] = guardado;
  }
  return copia;
}

function escaparHtml(texto) {
  const trocas = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return String(texto).replace(/[&<>"']/g, function (c) {
    return trocas[c];
  });
}

function perguntaAtual() {
  return estado.perguntas[estado.indice];
}

// ---------- pontuação ----------

function contarAcertos() {
  return estado.respostas.filter(function (r) {
    return r.correta;
  }).length;
}

function contarErros() {
  return estado.respostas.filter(function (r) {
    return !r.correta;
  }).length;
}

// 100 por acerto + bônus se acertar seguido
function calcularPontos() {
  let combo = 0;
  let pontos = 0;
  estado.respostas.forEach(function (r) {
    if (!r.correta) {
      combo = 0;
      return;
    }
    combo++;
    pontos += PONTOS_POR_ACERTO;
    if (combo > 1) pontos += BONUS_COMBO * (combo - 1);
  });
  return pontos;
}

function calcularPercentual() {
  const total = estado.perguntas.length;
  if (total === 0) return 0;
  return Math.round((contarAcertos() / total) * 100);
}

// ---------- som ----------

let somLigado = true;
let audioCtx = null;

function lerPreferenciaSom() {
  try {
    somLigado = localStorage.getItem("brusque-som") !== "desligado";
  } catch (e) {
    somLigado = true;
  }
}

function salvarPreferenciaSom() {
  try {
    localStorage.setItem("brusque-som", somLigado ? "ligado" : "desligado");
  } catch (e) {
    // sem localStorage, tudo bem
  }
}

function pegarAudioCtx() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  if (audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
}

function tocarNota(freq, atraso, duracao, volume, tipo) {
  const ctx = pegarAudioCtx();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const ganho = ctx.createGain();
  const t0 = ctx.currentTime + atraso;
  osc.type = tipo || "triangle";
  osc.frequency.setValueAtTime(freq, t0);
  ganho.gain.setValueAtTime(0.0001, t0);
  ganho.gain.exponentialRampToValueAtTime(volume || 0.18, t0 + 0.02);
  ganho.gain.exponentialRampToValueAtTime(0.0001, t0 + duracao);
  osc.connect(ganho);
  ganho.connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + duracao + 0.05);
}

function tocarEfeito(nome) {
  if (!somLigado) return;
  try {
    if (nome === "acerto") {
      [523, 659, 784].forEach(function (f, i) {
        tocarNota(f, i * 0.09, 0.22);
      });
    } else if (nome === "erro") {
      [392, 330].forEach(function (f, i) {
        tocarNota(f, i * 0.14, 0.26, 0.12, "sine");
      });
    } else if (nome === "vitoria") {
      [523, 659, 784, 1047].forEach(function (f, i) {
        tocarNota(f, i * 0.12, 0.3);
      });
    } else if (nome === "incentivo") {
      [440, 523, 587].forEach(function (f, i) {
        tocarNota(f, i * 0.12, 0.26, 0.14);
      });
    }
  } catch (e) {
    // se o navegador não deixar tocar, ignora
  }
}

// devolve false se não tem arquivo de áudio pra esse animal
function tocarAnimal(chave) {
  const arquivo = SONS_ARQUIVOS[chave];
  if (!somLigado || !arquivo) return false;
  try {
    new Audio(arquivo).play().catch(function () {});
    return true;
  } catch (e) {
    return false;
  }
}

function falar(texto) {
  if (!somLigado || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 0.9;
  window.speechSynthesis.speak(fala);
  return true;
}

function pararFala() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
}

function atualizarBotoesSom() {
  todos(".js-som").forEach(function (botao) {
    const icone = somLigado ? "🔈" : "🔇";
    botao.setAttribute("aria-pressed", String(somLigado));
    botao.setAttribute(
      "aria-label",
      somLigado
        ? "Som ligado. Clique para desligar"
        : "Som desligado. Clique para ligar",
    );
    if (botao.classList.contains("btn-som")) {
      botao.innerHTML = '<span aria-hidden="true">' + icone + "</span> Som";
    } else {
      botao.innerHTML = '<span aria-hidden="true">' + icone + "</span>";
    }
    botao.classList.toggle("som-desligado", !somLigado);
  });
}

function alternarSom() {
  somLigado = !somLigado;
  if (!somLigado) pararFala();
  salvarPreferenciaSom();
  atualizarBotoesSom();
  if (somLigado) tocarEfeito("acerto");
}

// ---------- trocar de tela ----------

async function irParaTela(nome, aoMostrar) {
  if (estado.trocando || !ID_TELAS[nome]) return;
  const atual = $(ID_TELAS[estado.tela]);
  const proxima = $(ID_TELAS[nome]);
  if (atual === proxima) return;

  estado.trocando = true;
  pararFala();

  atual.classList.add("saindo");
  await esperar(200);
  atual.hidden = true;
  atual.classList.remove("saindo", "entrando");

  if (aoMostrar) aoMostrar();
  proxima.hidden = false;
  proxima.classList.add("entrando");
  estado.tela = nome;
  window.scrollTo(0, 0);

  const foco = proxima.querySelector('[tabindex="-1"]');
  if (foco) foco.focus({ preventScroll: true });
  estado.trocando = false;

  setTimeout(function () {
    proxima.classList.remove("entrando");
  }, semMovimento() ? 0 : 900);
}

// ---------- tela inicial ----------

function preencherEscolas() {
  const select = $("campo-escola");
  const lista = ESCOLAS.length ? ESCOLAS : ["Escola não listada"];
  lista.forEach(function (nome) {
    const opcao = document.createElement("option");
    opcao.value = nome;
    opcao.textContent = nome;
    select.appendChild(opcao);
  });
}

function mostrarErro(campo, idErro, mensagem) {
  $(idErro).textContent = mensagem;
  campo.setAttribute("aria-invalid", mensagem ? "true" : "false");
  campo.classList.toggle("invalido", Boolean(mensagem));
}

function validarFormulario() {
  const campoNome = $("campo-nome");
  const campoIdade = $("campo-idade");
  const campoEscola = $("campo-escola");

  const nome = campoNome.value.trim().replace(/\s+/g, " ");
  const idadeTexto = campoIdade.value.trim();
  const idade = Number(idadeTexto);

  let erroNome = "";
  if (nome.length < 2) {
    erroNome = "Escreva o nome do aluno.";
  } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ][A-Za-zÀ-ÖØ-öø-ÿ'’.\- ]*$/.test(nome)) {
    erroNome = "Use só letras no nome.";
  }

  let erroIdade = "";
  if (idadeTexto === "") {
    erroIdade = "Escreva a idade.";
  } else if (!Number.isInteger(idade) || idade < 3 || idade > 12) {
    erroIdade = "Escreva uma idade entre 3 e 12 anos.";
  }

  const erroEscola = campoEscola.value === "" ? "Escolha a escola." : "";

  mostrarErro(campoNome, "erro-nome", erroNome);
  mostrarErro(campoIdade, "erro-idade", erroIdade);
  mostrarErro(campoEscola, "erro-escola", erroEscola);

  // foca no primeiro campo com problema
  if (erroNome) {
    campoNome.focus();
    return false;
  }
  if (erroIdade) {
    campoIdade.focus();
    return false;
  }
  if (erroEscola) {
    campoEscola.focus();
    return false;
  }

  estado.aluno = { nome: nome, idade: idade, escola: campoEscola.value };
  return true;
}

function enviarFormulario(e) {
  e.preventDefault();
  if (validarFormulario()) irParaTela("niveis");
}

// ---------- partida ----------

function distanciaIdade(pergunta, idade) {
  if (idade < pergunta.faixa[0]) return pergunta.faixa[0] - idade;
  if (idade > pergunta.faixa[1]) return idade - pergunta.faixa[1];
  return 0;
}

// pega as perguntas mais perto da idade do aluno, com no máximo 2 de arrastar
function sortearPerguntas(nivel) {
  const idade = estado.aluno.idade || 7;
  const banco = embaralhar(BANCO_PERGUNTAS[nivel]);
  banco.sort(function (a, b) {
    return distanciaIdade(a, idade) - distanciaIdade(b, idade);
  });

  const arrastos = banco.filter(function (p) {
    return p.tipo;
  }).slice(0, 2);
  const normais = banco.filter(function (p) {
    return !p.tipo;
  })
    .slice(0, PERGUNTAS_POR_PARTIDA - arrastos.length);

  return embaralhar(arrastos.concat(normais));
}

function iniciarPartida(nivel) {
  if (!BANCO_PERGUNTAS[nivel]) return;
  estado.nivel = nivel;
  estado.perguntas = sortearPerguntas(nivel);
  estado.indice = 0;
  estado.respostas = [];
  estado.respondida = false;
  $("tela-pergunta").dataset.nivel = nivel;
  $("dialogo-sair").dataset.nivel = nivel;
  irParaTela("pergunta", function () {
    carregarPergunta(false);
  });
}

function reiniciarPartida() {
  if (estado.nivel) iniciarPartida(estado.nivel);
}

function carregarPergunta(animar) {
  const pergunta = perguntaAtual();
  const arrasto = Boolean(pergunta.tipo);
  const modoImagens = !arrasto && pergunta.opcoes.every(function (o) {
    return o.imagem;
  });

  estado.respondida = false;
  pecaSelecionada = null;

  const cartao = $("cartao-pergunta");
  cartao.classList.toggle("modo-arrasto", arrasto);
  cartao.classList.toggle("modo-imagens", modoImagens);

  $("local-pergunta").textContent = pergunta.local;
  $("categoria-pergunta").textContent = pergunta.categoria;
  $("enunciado").textContent = pergunta.enunciado;
  $("dica").innerHTML = '<span aria-hidden="true">💡</span> Dica: ' +
    pergunta.dica;

  if (pergunta.ilustracao) {
    $("ilustracao").innerHTML = pergunta.ilustracao();
  } else {
    $("ilustracao").innerHTML =
      '<div class="emoji-grande" aria-hidden="true">' + pergunta.emoji +
      "</div>";
  }

  mostrarSomEscrito(pergunta);
  $("btn-ouvir").setAttribute(
    "aria-label",
    pergunta.som ? "Ouvir o som" : "Ouvir a pergunta",
  );

  // esconde o feedback da pergunta anterior
  $("feedback").hidden = true;
  $("feedback").className = "feedback";

  if (arrasto) {
    montarArrasto(pergunta);
  } else {
    montarOpcoes(pergunta, modoImagens);
  }

  atualizarProgresso();
  atualizarPlacar();

  if (animar) {
    cartao.classList.remove("entrando-pergunta");
    void cartao.offsetWidth; // força o navegador a reiniciar a animação
    cartao.classList.add("entrando-pergunta");
  }
}

function montarOpcoes(pergunta, modoImagens) {
  const area = $("opcoes");
  area.innerHTML = "";
  area.className = "opcoes";
  area.setAttribute("role", "group");
  area.classList.toggle("opcoes-imagens", modoImagens);

  pergunta.opcoes.forEach(function (opcao, posicao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "opcao";
    botao.dataset.opcao = opcao.id;
    botao.style.setProperty("--atraso", (posicao * 70) + "ms");

    if (modoImagens) {
      botao.classList.add("opcao-imagem", "cor-" + (posicao % 3));
      botao.innerHTML = '<span class="moldura-imagem"><img src="' +
        opcao.imagem + '" alt="' + (opcao.alt || "") + '"></span>' +
        '<span class="rotulo-opcao">' + opcao.texto + "</span>" +
        '<span class="marca-resultado" aria-hidden="true"></span>';
    } else {
      const icone = '<span class="icone-opcao" aria-hidden="true">' +
        (opcao.icone || "") + "</span>";
      const rotulo = '<span class="rotulo-opcao">' + opcao.texto + "</span>";
      botao.innerHTML =
        (pergunta.iconeDepois ? rotulo + icone : icone + rotulo) +
        '<span class="marca-resultado" aria-hidden="true"></span>';
    }

    area.appendChild(botao);
  });
}

function atualizarProgresso() {
  const total = estado.perguntas.length;
  const numero = estado.indice + 1;
  const nome = NIVEIS[estado.nivel].rotulo.toUpperCase();

  $("rotulo-progresso").textContent = "PERGUNTA " + numero + " DE " + total +
    " (" + nome + ")";
  $("barra-progresso").style.width = ((numero / total) * 100) + "%";
  $("trilho-progresso").setAttribute("aria-valuemax", String(total));
  $("trilho-progresso").setAttribute("aria-valuenow", String(numero));
}

function atualizarPlacar() {
  const pontos = calcularPontos();
  const chip = $("placar-pontos");
  chip.innerHTML = '<span aria-hidden="true">⭐</span> ' + pontos + " Pontos";

  // só faz a animação quando a pontuação mudou
  if (String(pontos) === ultimoPlacar) return;
  ultimoPlacar = String(pontos);
  chip.classList.remove("pulsar");
  void chip.offsetWidth;
  chip.classList.add("pulsar");
}

// ---------- responder ----------

function verificarResposta(idOpcao) {
  if (estado.respondida || estado.tela !== "pergunta") return;
  const pergunta = perguntaAtual();
  if (
    !pergunta.opcoes || !pergunta.opcoes.some(function (o) {
      return o.id === idOpcao;
    })
  ) return;

  estado.respondida = true;
  const acertou = idOpcao === pergunta.correta;
  estado.respostas.push({
    perguntaId: pergunta.id,
    escolhida: idOpcao,
    correta: acertou,
  });

  marcarOpcoes(pergunta, idOpcao);

  const certa = pergunta.opcoes.find(function (o) {
    return o.id === pergunta.correta;
  });
  mostrarFeedback(acertou, certa.texto);
  atualizarPlacar();
  tocarEfeito(acertou ? "acerto" : "erro");
}

function marcarOpcoes(pergunta, idEscolhida) {
  todos(".opcao", $("opcoes")).forEach(function (botao) {
    const id = botao.dataset.opcao;
    const marca = botao.querySelector(".marca-resultado");
    botao.disabled = true;
    botao.setAttribute("aria-disabled", "true");

    if (id === pergunta.correta) {
      botao.classList.add("correta");
      marca.textContent = "✔ Certa";
      if (id === idEscolhida) botao.classList.add("escolhida");
    } else if (id === idEscolhida) {
      botao.classList.add("errada", "escolhida");
      marca.textContent = "✖ Quase";
    } else {
      botao.classList.add("apagada");
    }
  });
}

// textoCerto é opcional (nas de agrupar não tem um texto só)
function mostrarFeedback(acertou, textoCerto) {
  const ultima = estado.indice === estado.perguntas.length - 1;
  const caixa = $("feedback");
  const texto = $("feedback-texto");

  caixa.className = "feedback " +
    (acertou ? "feedback-certo" : "feedback-errado");
  if (acertou) {
    texto.textContent = "Muito bem! Resposta certa!";
  } else if (textoCerto) {
    texto.innerHTML = "Quase! A resposta certa era: <strong>" + textoCerto +
      "</strong>. Vamos tentar a próxima!";
  } else {
    texto.textContent =
      "Quase! Olhe as peças marcadas e vamos tentar a próxima!";
  }

  $("btn-proxima").textContent = ultima ? "Ver resultado" : "Próxima pergunta";
  caixa.hidden = false;
  $("btn-proxima").focus();
}

async function avancar() {
  if (!estado.respondida || estado.trocando) return;

  if (estado.indice >= estado.perguntas.length - 1) {
    finalizarPartida();
    return;
  }

  estado.trocando = true;
  const cartao = $("cartao-pergunta");
  cartao.classList.add("saindo-pergunta");
  await esperar(180);
  cartao.classList.remove("saindo-pergunta");

  estado.indice++;
  carregarPergunta(true);
  estado.trocando = false;
  $("enunciado").focus({ preventScroll: true });
}

// ---------- perguntas de arrastar ----------

function montarArrasto(pergunta) {
  const area = $("opcoes");
  const ordenar = pergunta.tipo === "ordenar";

  // limpa o que sobrou da pergunta anterior (alternativas, peças, botão)
  area.innerHTML = "";
  area.className = "container-arrasto";
  area.removeAttribute("role");

  const instrucao = document.createElement("p");
  instrucao.className = "instrucao-arrasto";
  instrucao.textContent =
    "Arraste as peças (ou toque na peça e depois no lugar).";

  const bandeja = document.createElement("div");
  bandeja.className = "bandeja alvo";

  const alvos = document.createElement("div");
  alvos.className = ordenar ? "trilha-lugares" : "grupos";

  const nomes = ordenar
    ? pergunta.itens.map(function (_, k) {
      return k + 1;
    })
    : pergunta.grupos;
  nomes.forEach(function (nome, k) {
    const alvo = document.createElement("div");
    alvo.className = ordenar ? "lugar alvo" : "caixa alvo";
    alvo.dataset.posicao = k;
    if (ordenar) {
      alvo.dataset.numero = nome;
    } else {
      alvo.innerHTML = '<p class="titulo-grupo">' + nome + "</p>";
    }
    alvos.appendChild(alvo);
  });

  // cada peça guarda a posição certa: i (ordenar) ou g (grupo)
  const pecas = pergunta.itens.map(function (item, i) {
    return ordenar ? { texto: item, i: i } : { texto: item.t, g: item.g };
  });
  embaralhar(pecas).forEach(function (p) {
    const peca = document.createElement("button");
    peca.type = "button";
    peca.className = "peca";
    peca.textContent = p.texto;
    if (ordenar) peca.dataset.i = p.i;
    else peca.dataset.g = p.g;
    bandeja.appendChild(peca);
  });

  const conferir = document.createElement("button");
  conferir.type = "button";
  conferir.className = "btn btn-nivel-cor btn-verificar";
  conferir.textContent = "Conferir";
  conferir.disabled = true;

  area.appendChild(instrucao);
  area.appendChild(bandeja);
  area.appendChild(alvos);
  area.appendChild(conferir);
}

// só libera o botão quando todas as peças saíram da bandeja
function atualizarBotaoConferir() {
  const bandeja = document.querySelector("#opcoes .bandeja");
  const botao = document.querySelector("#opcoes .btn-verificar");
  if (bandeja && botao) {
    botao.disabled = bandeja.querySelector(".peca") !== null;
  }
}

function soltarPeca(peca, alvo) {
  if (!alvo || estado.respondida) return;
  const bandeja = document.querySelector("#opcoes .bandeja");

  // nos lugares da fila cabe só uma peça, a outra volta pra bandeja
  if (alvo.classList.contains("lugar")) {
    const ocupante = alvo.querySelector(".peca");
    if (ocupante && ocupante !== peca) bandeja.appendChild(ocupante);
  }
  alvo.appendChild(peca);
  atualizarBotaoConferir();
}

function cliqueNaArea(e) {
  const opcao = e.target.closest(".opcao");
  if (opcao) {
    if (!opcao.disabled) verificarResposta(opcao.dataset.opcao);
    return;
  }

  if (e.target.closest(".btn-verificar")) {
    conferirArrasto();
    return;
  }

  const pergunta = perguntaAtual();
  if (!pergunta || !pergunta.tipo || estado.respondida) return;

  const peca = e.target.closest(".peca");
  const alvo = e.target.closest(".alvo");

  if (peca && !peca.dataset.arrastou) {
    // toque na peça: seleciona (ou tira a seleção)
    const mesma = peca === pecaSelecionada;
    todos(".peca", $("opcoes")).forEach(function (p) {
      p.classList.remove("selecionada");
    });
    if (mesma) {
      pecaSelecionada = null;
    } else {
      peca.classList.add("selecionada");
      pecaSelecionada = peca;
    }
  } else if (alvo && pecaSelecionada) {
    // toque no lugar: coloca a peça selecionada
    soltarPeca(pecaSelecionada, alvo);
    pecaSelecionada.classList.remove("selecionada");
    pecaSelecionada = null;
  }

  if (peca) delete peca.dataset.arrastou;
}

function comecarArrasto(e) {
  const pergunta = perguntaAtual();
  if (!pergunta || !pergunta.tipo || estado.respondida) return;
  const peca = e.target.closest(".peca");
  if (!peca) return;

  const inicioX = e.clientX;
  const inicioY = e.clientY;
  let movendo = false;

  function mover(ev) {
    if (!movendo) {
      // só vira arrasto se mexer mais de 8px (senão é um clique)
      if (Math.hypot(ev.clientX - inicioX, ev.clientY - inicioY) < 8) return;
      movendo = true;
      peca.classList.add("arrastando");
      peca.dataset.arrastou = "1";
    }
    peca.style.left = ev.clientX + "px";
    peca.style.top = ev.clientY + "px";
  }

  function soltou(ev) {
    document.removeEventListener("pointermove", mover);
    document.removeEventListener("pointerup", soltou);
    document.removeEventListener("pointercancel", soltou);
    if (!movendo) return;

    peca.classList.remove("arrastando");
    peca.style.left = "";
    peca.style.top = "";

    const embaixo = document.elementFromPoint(ev.clientX, ev.clientY);
    soltarPeca(peca, embaixo && embaixo.closest(".alvo"));

    if (pecaSelecionada) {
      pecaSelecionada.classList.remove("selecionada");
      pecaSelecionada = null;
    }
  }

  document.addEventListener("pointermove", mover);
  document.addEventListener("pointerup", soltou);
  document.addEventListener("pointercancel", soltou);
}

function conferirArrasto() {
  const pergunta = perguntaAtual();
  const botao = document.querySelector("#opcoes .btn-verificar");
  if (estado.respondida || !botao || botao.disabled) return;

  const ordenar = pergunta.tipo === "ordenar";
  let acertou = true;

  todos(".alvo:not(.bandeja)", $("opcoes")).forEach(function (alvo, k) {
    todos(".peca", alvo).forEach(function (peca) {
      const posicaoCerta = ordenar
        ? Number(peca.dataset.i)
        : Number(peca.dataset.g);
      const certa = posicaoCerta === k;
      peca.classList.add(certa ? "peca-certa" : "peca-errada");
      if (!certa) acertou = false;
    });
  });

  botao.hidden = true;
  estado.respondida = true;
  estado.respostas.push({
    perguntaId: pergunta.id,
    escolhida: "arrasto",
    correta: acertou,
  });

  // na de ordenar mostra a ordem certa, na de agrupar só manda olhar as marcações
  mostrarFeedback(acertou, ordenar ? pergunta.itens.join(" → ") : "");
  atualizarPlacar();
  tocarEfeito(acertou ? "acerto" : "erro");
}

// ---------- ouvir a pergunta ----------

function mostrarSomEscrito(pergunta) {
  const balao = $("balao-som");
  balao.hidden = !pergunta.som;
  if (pergunta.som) {
    balao.innerHTML = '<span aria-hidden="true">🔊</span> O som é: <strong>' +
      pergunta.som.texto + "</strong>";
  } else {
    balao.innerHTML = "";
  }
}

function ouvirPergunta() {
  const pergunta = perguntaAtual();
  if (!pergunta) return;
  const balao = $("balao-som");

  if (!somLigado) {
    balao.hidden = false;
    balao.textContent =
      "O som está desligado. Toque no botão de som para ligar.";
    return;
  }

  if (pergunta.som) {
    if (!tocarAnimal(pergunta.som.chave)) falar(pergunta.som.texto);
    mostrarSomEscrito(pergunta);
    balao.classList.remove("pulsar");
    void balao.offsetWidth;
    balao.classList.add("pulsar");
  } else if (!falar(pergunta.enunciado)) {
    balao.hidden = false;
    balao.textContent =
      "Este navegador não lê textos em voz alta. Peça para um adulto ler a pergunta com você.";
  }
}

// ---------- sair da partida ----------

function abrirDialogoSair() {
  const dialogo = $("dialogo-sair");
  if (typeof dialogo.showModal === "function") dialogo.showModal();
  else dialogo.setAttribute("open", "");
  $("btn-continuar").focus();
}

function fecharDialogoSair() {
  const dialogo = $("dialogo-sair");
  if (typeof dialogo.close === "function") dialogo.close();
  else dialogo.removeAttribute("open");
}

function confirmarSaida() {
  fecharDialogoSair();
  estado.respostas = [];
  irParaTela("niveis");
}

// ---------- final ----------

function finalizarPartida() {
  const bom = calcularPercentual() >= LIMITE_BOM_DESEMPENHO;
  preencherResultado($(bom ? "resultado-otimo" : "resultado-incentivo"));

  irParaTela(bom ? "final-otimo" : "final-incentivo", function () {
    tocarEfeito(bom ? "vitoria" : "incentivo");
    if (bom) setTimeout(lancarConfete, semMovimento() ? 0 : 350);
  });
}

function preencherResultado(caixa) {
  const total = estado.perguntas.length;
  const nivel = NIVEIS[estado.nivel];

  caixa.innerHTML = '<p class="resultado-aluno"><strong>' +
    escaparHtml(estado.aluno.nome) + "</strong> · " + nivel.nome + "</p>" +
    '<ul class="resultado-itens">' +
    '<li><span class="valor" data-campo="acertos">' + contarAcertos() + " de " +
    total + '</span><span class="legenda">acertos</span></li>' +
    '<li><span class="valor" data-campo="pontos">⭐ ' + calcularPontos() +
    '</span><span class="legenda">pontos</span></li>' +
    '<li><span class="valor" data-campo="percentual">' + calcularPercentual() +
    '%</span><span class="legenda">de aproveitamento</span></li>' +
    "</ul>";
}

function lancarConfete() {
  if (semMovimento()) return;
  const area = $("confete");
  const cores = [
    "#facc15",
    "#f43f5e",
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#a855f7",
  ];
  area.innerHTML = "";

  for (let i = 0; i < 40; i++) {
    const pedaco = document.createElement("span");
    pedaco.style.left = (Math.random() * 100) + "%";
    pedaco.style.background = cores[i % cores.length];
    pedaco.style.animationDelay = (Math.random() * 0.8) + "s";
    pedaco.style.animationDuration = (2.2 + Math.random() * 1.6) + "s";
    pedaco.style.setProperty("--giro", Math.floor(Math.random() * 720) + "deg");
    area.appendChild(pedaco);
  }

  setTimeout(function () {
    area.innerHTML = "";
  }, 4500);
}

// ---------- começo ----------

function registrarEventos() {
  $("form-inicio").addEventListener("submit", enviarFormulario);

  // tirar a mensagem de erro quando a pessoa começa a corrigir
  const erros = {
    "campo-nome": "erro-nome",
    "campo-idade": "erro-idade",
    "campo-escola": "erro-escola",
  };
  Object.keys(erros).forEach(function (id) {
    $(id).addEventListener("input", function () {
      mostrarErro($(id), erros[id], "");
    });
  });

  $("btn-voltar-inicio").addEventListener("click", function () {
    irParaTela("inicio");
  });

  todos(".btn-nivel[data-nivel]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      iniciarPartida(botao.dataset.nivel);
    });
  });

  todos(".js-som").forEach(function (b) {
    b.addEventListener("click", alternarSom);
  });
  todos(".js-menu").forEach(function (b) {
    b.addEventListener("click", function () {
      irParaTela("niveis");
    });
  });
  todos(".js-repetir").forEach(function (b) {
    b.addEventListener("click", reiniciarPartida);
  });

  $("btn-sair").addEventListener("click", abrirDialogoSair);
  $("btn-continuar").addEventListener("click", fecharDialogoSair);
  $("btn-confirmar-sair").addEventListener("click", confirmarSaida);
  $("btn-ouvir").addEventListener("click", ouvirPergunta);
  $("btn-proxima").addEventListener("click", avancar);

  $("opcoes").addEventListener("click", cliqueNaArea);
  $("opcoes").addEventListener("pointerdown", comecarArrasto);

  // teclas 1 a 4 escolhem a alternativa
  document.addEventListener("keydown", function (e) {
    if (
      estado.tela !== "pergunta" || estado.respondida || $("dialogo-sair").open
    ) return;
    if (perguntaAtual().tipo) return;
    const numero = Number(e.key);
    if (numero >= 1 && numero <= 4) {
      const botao = todos(".opcao", $("opcoes"))[numero - 1];
      if (botao) verificarResposta(botao.dataset.opcao);
    }
  });
}

lerPreferenciaSom();
preencherEscolas();
atualizarBotoesSom();
registrarEventos();

$("tela-inicio").classList.add("entrando");
setTimeout(function () {
  $("tela-inicio").classList.remove("entrando");
}, 1200);
