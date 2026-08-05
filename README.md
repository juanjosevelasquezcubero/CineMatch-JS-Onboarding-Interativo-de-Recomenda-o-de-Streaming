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