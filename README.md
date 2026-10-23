# Jogo Educativo - Brusque

Jogo educativo para crianças feito só com HTML, CSS e JavaScript. Não precisa instalar nada.

## Como abrir

1. Extrair o zip.
2. Abrir o `index.html` no navegador (dois cliques já funciona).

Se alguma imagem não aparecer, confira se a pasta `assets` está junto do `index.html`.

## Arquivos

- `index.html` - as telas do jogo
- `style.css` - visual e animações
- `script.js` - lógica (telas, perguntas, pontos, som)
- `perguntas.js` - perguntas, níveis e configurações
- `ilustracoes.js` - desenhos em SVG das perguntas
- `assets/` - imagens e a pasta de sons

## Como funciona

- Na tela inicial o aluno coloca nome, idade (3 a 12) e escola.
- Tem 3 níveis: Lago dos Patinhos (fácil), Jardim dos Sons (médio) e Floresta dos Desafios (difícil).
- Cada partida tem 5 perguntas, escolhidas de acordo com a idade. Algumas são de arrastar e soltar.
- Acerto vale 100 pontos, e cada acerto seguido ganha 25 de bônus a mais que o anterior.
- Com 90% ou mais aparece a tela de parabéns (com confete). Abaixo disso aparece a tela de incentivo.

## Mudando o conteúdo

Tudo fica no `perguntas.js`:

- **Escolas:** colocar os nomes na lista `ESCOLAS`. Enquanto estiver vazia aparece só "Escola não listada".
- **Perguntas:** copiar uma pergunta de dentro do nível, mudar o texto e o campo `correta`.
- **Sons dos animais:** colocar os arquivos em `assets/sons/` e preencher `SONS_ARQUIVOS`.

## Pendências

- Lista de escolas.
- Arquivos de áudio dos animais (por enquanto o botão de som lê o texto com a voz do navegador).
- Imagens em resolução maior.
