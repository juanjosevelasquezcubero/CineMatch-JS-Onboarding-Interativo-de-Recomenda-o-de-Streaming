### Como a Internet funciona (explicação curta)

A internet funciona através de um modelo de ***requisição e resposta***:

1. O **cliente** (seu computador, celular ou, neste projeto, o terminal) faz uma solicitação (request) para um servidor.
2. O **servidor** processa a solicitação e devolve uma resposta (response) com os dados.
3. Essa comunicação acontece por meio de protocolos (principalmente HTTP/HTTPS) e envolve latência (tempo de ida e volta da informação).

Neste projeto, não fazemos uma chamada real à internet, mas **simulamos** exatamente esse comportamento usando `Promise` + `setTimeout`. Isso representa o tempo que o servidor demoraria para responder.

### Arquitetura Cliente-Servidor

O CineMatch JS demonstra de forma prática a **arquitetura cliente-servidor**:

- O **terminal** atua como o **cliente** (quem solicita os dados).
- A função `buscarCatalogoSimulado()` atua como o **servidor** (quem fornece o catálogo).
- A `Promise` + `setTimeout` simula a **latência de rede**.
- O `async/await` permite esperar a resposta do “servidor” de forma limpa, sem travar o restante do código.

Essa é a mesma lógica usada por aplicativos reais de streaming (Netflix, Spotify, etc.) quando buscam o catálogo de conteúdos.


O **CineMatch JS** é um simulador interativo de recomendação de streaming.

O sistema conversa com a pessoa usuária pelo terminal, coleta seu perfil
(nome, idade e gêneros favoritos(ATENÇÂO!! sitema pede para pre-encher todos os campos para SAIR dele coloque fim após cadastro)  ) tamben  compara com um catálogo de filmes e séries além o usuario NÂO pode pular idade ou deixar campo sim cadastro o sistema rejeita até pre-encher 

O projeto mostra:

- percentual de compatibilidade com cada conteúdo;
- gêneros em comum;
- gêneros ainda não explorados;
- conteúdo mais compatível;
- recomendação personalizada;
- menu interativo para navegar entre as funcionalidades.
## Como executar

Este projeto precisa de **Node.js**.

1. Clone o repositório
2. Rode `npm install` para instalar o `prompt-sync`
3. Rode `node cinematch.js`
4. Responda as perguntas exibidas no terminal
5. Use o menu para navegar entre perfil, catálogo, compatibilidade, recomendação e sair

---

## Estrutura do projeto

```txt
cinematch-js/
│
├── cinematch.js
├── package.json
└── README.md


## Tecnologias utilizadas

JavaScript (Node.js)
prompt-sync


Autor
Juan José Velasquez Cubero
Turma: Mobile React Native T1 – SCTech
