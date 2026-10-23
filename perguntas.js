// Configurações do jogo
const PERGUNTAS_POR_PARTIDA = 5;
const PONTOS_POR_ACERTO = 100;
const BONUS_COMBO = 25;
const LIMITE_BOM_DESEMPENHO = 90; // % mínimo pra aparecer a tela de parabéns

// TODO: colocar a lista de escolas quando a prefeitura mandar
const ESCOLAS = [];

// sons dos animais (ainda não temos os arquivos)
const SONS_ARQUIVOS = {};

const NIVEIS = {
  facil:   { nome: 'Lago dos Patinhos',     rotulo: 'Fácil' },
  medio:   { nome: 'Jardim dos Sons',       rotulo: 'Médio' },
  dificil: { nome: 'Floresta dos Desafios', rotulo: 'Difícil' }
};

// Cada pergunta tem: opcoes (id a/b/c/d), correta (id da certa) e faixa de idade [min, max].
// Perguntas com "tipo" (ordenar / agrupar) são de arrastar e soltar.
const BANCO_PERGUNTAS = {
  facil: [
    {
      id: 'f1', categoria: 'Contagem', local: 'Lago dos Patinhos',
      enunciado: 'Quantos patinhos aparecem na imagem?',
      ilustracao: () => Ilustracoes.cenaPatinhos(3),
      opcoes: [
        { id: 'a', texto: '2 patinhos', icone: '🦆' },
        { id: 'b', texto: '3 patinhos', icone: '🦆' },
        { id: 'c', texto: '4 patinhos', icone: '🦆' },
        { id: 'd', texto: '5 patinhos', icone: '🦆' }
      ],
      correta: 'b',
      dica: 'Aponte com o dedo para cada patinho e conte devagar: 1, 2, 3...',
      faixa: [3, 7]
    },
    {
      id: 'f2', categoria: 'Cores', local: 'Lago dos Patinhos',
      enunciado: 'De que cor é o patinho?',
      ilustracao: () => Ilustracoes.cenaPatinhoColorido('#facc15', '#eab308', 'amarelo'),
      opcoes: [
        { id: 'a', texto: 'Azul', icone: Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'b', texto: 'Amarelo', icone: Ilustracoes.bolinha('#facc15', 'amarelo') },
        { id: 'c', texto: 'Verde', icone: Ilustracoes.bolinha('#22c55e', 'verde') },
        { id: 'd', texto: 'Vermelho', icone: Ilustracoes.bolinha('#ef4444', 'vermelho') }
      ],
      correta: 'b',
      dica: 'Pense na cor do sol e das bananas maduras!',
      faixa: [3, 7]
    },
    {
      id: 'f3', categoria: 'Contagem', local: 'Lago dos Patinhos',
      enunciado: 'Quantas flores cor-de-rosa existem no lago?',
      ilustracao: () => Ilustracoes.cenaFlores(4),
      opcoes: [
        { id: 'a', texto: '2 flores', icone: '🌸' },
        { id: 'b', texto: '3 flores', icone: '🌸' },
        { id: 'c', texto: '4 flores', icone: '🌸' },
        { id: 'd', texto: '5 flores', icone: '🌸' }
      ],
      correta: 'c',
      dica: 'Conte só as flores cor-de-rosa, não as folhas verdes.',
      faixa: [3, 7]
    },
    {
      id: 'f4', categoria: 'Cores', local: 'Lago dos Patinhos',
      enunciado: 'Qual bolinha é da cor VERDE?',
      ilustracao: () => Ilustracoes.cenaLagoPergunta('Um patinho no lago com uma interrogação'),
      opcoes: [
        { id: 'a', texto: 'Vermelha', icone: Ilustracoes.bolinha('#ef4444', 'vermelha') },
        { id: 'b', texto: 'Amarela', icone: Ilustracoes.bolinha('#facc15', 'amarela') },
        { id: 'c', texto: 'Azul', icone: Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'd', texto: 'Verde', icone: Ilustracoes.bolinha('#22c55e', 'verde') }
      ],
      correta: 'd',
      dica: 'Verde é a cor das folhas e do capim.',
      faixa: [3, 7]
    },
    {
      id: 'f5', categoria: 'Formas', local: 'Lago dos Patinhos',
      enunciado: 'Qual destas formas é um TRIÂNGULO?',
      ilustracao: () => Ilustracoes.cenaLagoPergunta('Um patinho no lago com uma interrogação'),
      opcoes: [
        { id: 'a', texto: 'Círculo', icone: Ilustracoes.forma('circulo', 'círculo azul') },
        { id: 'b', texto: 'Triângulo', icone: Ilustracoes.forma('triangulo', 'triângulo verde') },
        { id: 'c', texto: 'Quadrado', icone: Ilustracoes.forma('quadrado', 'quadrado laranja') },
        { id: 'd', texto: 'Estrela', icone: Ilustracoes.forma('estrela', 'estrela amarela') }
      ],
      correta: 'b',
      dica: 'O triângulo tem 3 pontinhas e 3 lados.',
      faixa: [3, 7]
    },
    {
      id: 'f6', categoria: 'Cálculo', local: 'Cantinho da Soma',
      enunciado: 'Quanto é 3 + 4?',
      emoji: '➕',
      opcoes: [
        { id: 'a', texto: '5' }, { id: 'b', texto: '6' },
        { id: 'c', texto: '7' }, { id: 'd', texto: '8' }
      ],
      correta: 'c',
      dica: 'Conte nos dedos: 3 e mais 4.',
      faixa: [6, 12]
    },
    {
      id: 'f7', categoria: 'Cálculo', local: 'Cantinho da Subtração',
      enunciado: 'Quanto é 10 − 6?',
      emoji: '➖',
      opcoes: [
        { id: 'a', texto: '3' }, { id: 'b', texto: '4' },
        { id: 'c', texto: '5' }, { id: 'd', texto: '6' }
      ],
      correta: 'b',
      dica: 'Tire 6 de 10 e conte o que sobra.',
      faixa: [6, 12]
    },
    {
      id: 'fx1', tipo: 'ordenar', categoria: 'Números', local: 'Arraste e solte',
      enunciado: 'Arraste os números para a fila: do 1 ao 5!',
      emoji: '🔢',
      itens: ['1', '2', '3', '4', '5'],
      dica: 'Comece pelo menor número.',
      faixa: [3, 7]
    },
    {
      id: 'fx2', tipo: 'agrupar', categoria: 'Classificação', local: 'Arraste e solte',
      enunciado: 'Arraste cada bichinho para o seu lugar.',
      emoji: '🐾',
      grupos: ['Vive na água', 'Vive na terra'],
      itens: [
        { t: '🐟', g: 0 }, { t: '🐄', g: 1 }, { t: '🐠', g: 0 }, { t: '🐕', g: 1 }
      ],
      dica: 'Peixes precisam de água para viver.',
      faixa: [3, 12]
    },
    {
      id: 'fx3', tipo: 'agrupar', categoria: 'Classificação', local: 'Arraste e solte',
      enunciado: 'Separe as frutas dos legumes.',
      emoji: '🧺',
      grupos: ['Frutas', 'Legumes'],
      itens: [
        { t: '🍎', g: 0 }, { t: '🥕', g: 1 }, { t: '🍌', g: 0 }, { t: '🥦', g: 1 }, { t: '🍇', g: 0 }
      ],
      dica: 'Frutas costumam ser doces.',
      faixa: [5, 12]
    }
  ],

  medio: [
    {
      id: 'm1', categoria: 'Sons dos animais', local: 'Jardim dos Sons',
      enunciado: 'De qual animal é este som?',
      som: { chave: 'vaca', texto: 'Muuuuu!' },
      ilustracao: () => Ilustracoes.cenaSom('???'),
      opcoes: [
        { id: 'a', texto: 'Galinha', imagem: 'assets/imagens/animal-galinha.png', alt: 'Galinha sobre um ninho' },
        { id: 'b', texto: 'Vaca', imagem: 'assets/imagens/animal-vaca.png', alt: 'Vaca preta e branca' },
        { id: 'c', texto: 'Cachorro', imagem: 'assets/imagens/animal-cachorro.png', alt: 'Cachorro marrom sentado' }
      ],
      correta: 'b',
      dica: 'Toque no alto-falante para ouvir ou ler o som. Esse animal dá leite!',
      faixa: [3, 8]
    },
    {
      id: 'm2', categoria: 'Consciência silábica', local: 'Fábrica das Palavras',
      enunciado: 'Quantos pedacinhos (sílabas) tem a palavra BO - LA?',
      ilustracao: () => Ilustracoes.bolaComSilabas(['BO', 'LA']),
      iconeDepois: true,
      opcoes: [
        { id: 'a', texto: '1 pedaço', icone: '🧩' },
        { id: 'b', texto: '2 pedaços', icone: '🧩🧩' },
        { id: 'c', texto: '3 pedaços', icone: '🧩🧩🧩' },
        { id: 'd', texto: '4 pedaços', icone: '🧩🧩🧩🧩' }
      ],
      correta: 'b',
      dica: 'Bata palmas enquanto fala: "BO... LA!"',
      faixa: [3, 8]
    },
    {
      id: 'm3', categoria: 'Consciência silábica', local: 'Fábrica das Palavras',
      enunciado: 'Quantos pedacinhos (sílabas) tem a palavra GA - LI - NHA?',
      ilustracao: () => Ilustracoes.galinhaComSilabas(['GA', 'LI', 'NHA']),
      iconeDepois: true,
      opcoes: [
        { id: 'a', texto: '1 pedaço', icone: '🧩' },
        { id: 'b', texto: '2 pedaços', icone: '🧩🧩' },
        { id: 'c', texto: '3 pedaços', icone: '🧩🧩🧩' },
        { id: 'd', texto: '4 pedaços', icone: '🧩🧩🧩🧩' }
      ],
      correta: 'c',
      dica: 'Bata palmas a cada pedacinho: "GA... LI... NHA!"',
      faixa: [3, 8]
    },
    {
      id: 'm4', categoria: 'Rimas', local: 'Fábrica das Palavras',
      enunciado: 'Qual palavra rima com BOLA?',
      ilustracao: () => Ilustracoes.rimaComBola(),
      opcoes: [
        { id: 'a', texto: 'Pato', icone: '🦆' },
        { id: 'b', texto: 'Cola', icone: '🧴' },
        { id: 'c', texto: 'Mesa', icone: '🪑' },
        { id: 'd', texto: 'Livro', icone: '📖' }
      ],
      correta: 'b',
      dica: 'Palavras que rimam terminam com o mesmo som: BO-LA, ___-LA.',
      faixa: [3, 8]
    },
    {
      id: 'm5', categoria: 'Sons dos animais', local: 'Jardim dos Sons',
      enunciado: 'Au-au! Qual animal faz esse som?',
      som: { chave: 'cachorro', texto: 'Au-au!' },
      ilustracao: () => Ilustracoes.cenaSom('Au-au!'),
      opcoes: [
        { id: 'a', texto: 'Gatinho', icone: '🐱' },
        { id: 'b', texto: 'Pato', icone: '🦆' },
        { id: 'c', texto: 'Cachorro', icone: '🐶' },
        { id: 'd', texto: 'Vaca', icone: '🐮' }
      ],
      correta: 'c',
      dica: 'Esse animal é um grande amigo das pessoas e balança o rabinho.',
      faixa: [3, 8]
    },
    {
      id: 'm6', categoria: 'Cálculo', local: 'Cantinho da Soma',
      enunciado: 'Quanto é 7 + 8?',
      emoji: '🧮',
      opcoes: [
        { id: 'a', texto: '14' }, { id: 'b', texto: '15' },
        { id: 'c', texto: '16' }, { id: 'd', texto: '17' }
      ],
      correta: 'b',
      dica: 'Some 7 + 3 para chegar em 10 e depois mais 5.',
      faixa: [7, 12]
    },
    {
      id: 'm7', categoria: 'Sílabas', local: 'Fábrica das Palavras',
      enunciado: 'Qual palavra tem MAIS sílabas?',
      emoji: '🔠',
      opcoes: [
        { id: 'a', texto: 'Sol' }, { id: 'b', texto: 'Gato' },
        { id: 'c', texto: 'Borboleta' }, { id: 'd', texto: 'Pé' }
      ],
      correta: 'c',
      dica: 'Bata palmas em cada palavra e compare.',
      faixa: [6, 12]
    },
    {
      id: 'mx1', tipo: 'ordenar', categoria: 'Monte a palavra', local: 'Arraste e solte',
      enunciado: 'Arraste as sílabas para formar a palavra PATO.',
      emoji: '🦆',
      itens: ['PA', 'TO'],
      dica: 'Fale devagar: PA... TO!',
      faixa: [3, 7]
    },
    {
      id: 'mx2', tipo: 'ordenar', categoria: 'Monte a palavra', local: 'Arraste e solte',
      enunciado: 'Arraste as sílabas para formar o nome do inseto colorido.',
      emoji: '🦋',
      itens: ['BOR', 'BO', 'LE', 'TA'],
      dica: 'Ele tem asas e começa com BOR.',
      faixa: [7, 12]
    },
    {
      id: 'mx3', tipo: 'agrupar', categoria: 'Letras', local: 'Arraste e solte',
      enunciado: 'Separe as vogais das consoantes.',
      emoji: '🔤',
      grupos: ['Vogais', 'Consoantes'],
      itens: [
        { t: 'A', g: 0 }, { t: 'M', g: 1 }, { t: 'E', g: 0 },
        { t: 'T', g: 1 }, { t: 'O', g: 0 }, { t: 'R', g: 1 }
      ],
      dica: 'As vogais são A, E, I, O, U.',
      faixa: [6, 12]
    },
    {
      id: 'mx4', tipo: 'ordenar', categoria: 'Frases', local: 'Arraste e solte',
      enunciado: 'Arraste as palavras para formar uma frase.',
      emoji: '📝',
      itens: ['O', 'PATO', 'NADA', 'NO', 'LAGO'],
      dica: 'Quem faz a ação vem primeiro.',
      faixa: [6, 12]
    }
  ],

  dificil: [
    {
      id: 'd1', categoria: 'Grandezas e medidas', local: 'Comparação de Tamanhos',
      enunciado: 'Qual destes animais é o MAIOR de todos?',
      ilustracao: () => Ilustracoes.elefanteGrande(),
      opcoes: [
        { id: 'a', texto: 'Joaninha', icone: '🐞' },
        { id: 'b', texto: 'Elefante', icone: '🐘' },
        { id: 'c', texto: 'Ratinho', icone: '🐭' },
        { id: 'd', texto: 'Sapinho', icone: '🐸' }
      ],
      correta: 'b',
      dica: 'Observe qual animal precisa de mais espaço na floresta!',
      faixa: [3, 8]
    },
    {
      id: 'd2', categoria: 'Grandezas e medidas', local: 'Comparação de Tamanhos',
      enunciado: 'Qual bola é a MENOR de todas?',
      ilustracao: () => Ilustracoes.tresBolas(),
      opcoes: [
        { id: 'a', texto: 'Bola vermelha', icone: Ilustracoes.bolinha('#ef4444', 'vermelha') },
        { id: 'b', texto: 'Bola azul', icone: Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'c', texto: 'Bola amarela', icone: Ilustracoes.bolinha('#facc15', 'amarela') }
      ],
      correta: 'a',
      dica: 'A menor é a que ocupa menos espaço no chão.',
      faixa: [3, 8]
    },
    {
      id: 'd3', categoria: 'Noções espaciais', local: 'Dentro e Fora',
      enunciado: 'Qual bola está DENTRO da caixa?',
      ilustracao: () => Ilustracoes.caixaComBola(),
      opcoes: [
        { id: 'a', texto: 'A bola azul', icone: Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'b', texto: 'Nenhuma bola', icone: '🚫' },
        { id: 'c', texto: 'As duas bolas', icone: Ilustracoes.bolinha('#ef4444', 'vermelha') + Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'd', texto: 'A bola vermelha', icone: Ilustracoes.bolinha('#ef4444', 'vermelha') }
      ],
      correta: 'd',
      dica: 'Dentro é o que está guardado no meio da caixa.',
      faixa: [3, 8]
    },
    {
      id: 'd4', categoria: 'Noções espaciais', local: 'Em cima e Embaixo',
      enunciado: 'Onde está a bola vermelha?',
      ilustracao: () => Ilustracoes.mesaComBolinha(),
      opcoes: [
        { id: 'a', texto: 'Em cima da mesa', icone: '⬆️' },
        { id: 'b', texto: 'Embaixo da mesa', icone: '⬇️' },
        { id: 'c', texto: 'Dentro do vaso', icone: '🏺' },
        { id: 'd', texto: 'Longe da mesa', icone: '↔️' }
      ],
      correta: 'b',
      dica: 'Olhe para o chão, perto das pernas da mesa.',
      faixa: [3, 8]
    },
    {
      id: 'd5', categoria: 'Sequência lógica', local: 'Qual vem depois?',
      enunciado: 'Qual bolinha continua a fila?',
      ilustracao: () => Ilustracoes.sequenciaDeBolinhas(),
      opcoes: [
        { id: 'a', texto: 'Azul', icone: Ilustracoes.bolinha('#3b82f6', 'azul') },
        { id: 'b', texto: 'Verde', icone: Ilustracoes.bolinha('#22c55e', 'verde') },
        { id: 'c', texto: 'Amarela', icone: Ilustracoes.bolinha('#facc15', 'amarela') },
        { id: 'd', texto: 'Vermelha', icone: Ilustracoes.bolinha('#ef4444', 'vermelha') }
      ],
      correta: 'd',
      dica: 'A fila repete: vermelha, azul, vermelha, azul...',
      faixa: [3, 8]
    },
    {
      id: 'd6', categoria: 'Sequência lógica', local: 'Qual vem depois?',
      enunciado: 'Complete: 2, 4, 8, 16, ?',
      emoji: '🧠',
      opcoes: [
        { id: 'a', texto: '18' }, { id: 'b', texto: '24' },
        { id: 'c', texto: '30' }, { id: 'd', texto: '32' }
      ],
      correta: 'd',
      dica: 'Cada número é o dobro do anterior.',
      faixa: [9, 12]
    },
    {
      id: 'd7', categoria: 'Multiplicação', local: 'Desafio das Tabuadas',
      enunciado: 'Quanto é 6 × 7?',
      emoji: '✖️',
      opcoes: [
        { id: 'a', texto: '36' }, { id: 'b', texto: '42' },
        { id: 'c', texto: '48' }, { id: 'd', texto: '49' }
      ],
      correta: 'b',
      dica: 'Faça 6 × 6 e some mais 6.',
      faixa: [9, 12]
    },
    {
      id: 'd8', categoria: 'Conhecendo Brusque', local: 'Nossa cidade',
      enunciado: 'Em qual estado brasileiro fica Brusque?',
      emoji: '🗺️',
      opcoes: [
        { id: 'a', texto: 'Paraná' }, { id: 'b', texto: 'Santa Catarina' },
        { id: 'c', texto: 'Rio Grande do Sul' }, { id: 'd', texto: 'São Paulo' }
      ],
      correta: 'b',
      dica: 'Pense no estado de Florianópolis.',
      faixa: [8, 12]
    },
    {
      id: 'd9', categoria: 'Conhecendo Brusque', local: 'Nossa cidade',
      enunciado: 'Qual rio passa pela cidade de Brusque?',
      emoji: '🌊',
      opcoes: [
        { id: 'a', texto: 'Rio Amazonas' }, { id: 'b', texto: 'Rio Itajaí-Mirim' },
        { id: 'c', texto: 'Rio São Francisco' }, { id: 'd', texto: 'Rio Tietê' }
      ],
      correta: 'b',
      dica: 'O nome do rio lembra a cidade de Itajaí.',
      faixa: [8, 12]
    },
    {
      id: 'dx1', tipo: 'ordenar', categoria: 'Ordem crescente', local: 'Arraste e solte',
      enunciado: 'Arraste os números do MENOR para o MAIOR.',
      emoji: '📊',
      itens: ['9', '27', '48', '130'],
      dica: 'Compare primeiro quantos algarismos cada um tem.',
      faixa: [8, 12]
    },
    {
      id: 'dx2', tipo: 'ordenar', categoria: 'Ciclo da vida', local: 'Arraste e solte',
      enunciado: 'Coloque as etapas da planta na ordem certa.',
      emoji: '🌱',
      itens: ['🌰', '🌱', '🌿', '🌸'],
      dica: 'Tudo começa com a semente.',
      faixa: [5, 12]
    },
    {
      id: 'dx3', tipo: 'agrupar', categoria: 'Pares e ímpares', local: 'Arraste e solte',
      enunciado: 'Separe os números pares dos ímpares.',
      emoji: '🎲',
      grupos: ['Pares', 'Ímpares'],
      itens: [
        { t: '12', g: 0 }, { t: '7', g: 1 }, { t: '20', g: 0 },
        { t: '9', g: 1 }, { t: '14', g: 0 }, { t: '3', g: 1 }
      ],
      dica: 'Pares podem ser divididos em duas partes iguais.',
      faixa: [8, 12]
    }
  ]
};
