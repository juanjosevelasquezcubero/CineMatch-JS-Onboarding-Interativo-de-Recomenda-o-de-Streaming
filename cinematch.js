const prompt = require('prompt-sync')({ sigint: true });

// ============================================================
// RF15 - MENU
// ============================================================

function exibirMenu(usuario, catalogo) {
  let opcao;

  do {
    console.clear();
    console.log('\n===== CineMatch JS =====');
    console.log('1 - Ver meu perfil');
    console.log('2 - Ver catálogo completo');
    console.log('3 - Calcular compatibilidade');
    console.log('4 - Ver recomendação principal');
    console.log('5 - Sair');

    opcao = prompt('Escolha uma opção: ').trim();

    switch (opcao) {
      case '1':
        exibirPerfil(usuario);
        prompt('\nPressione ENTER para voltar...');
        break;
      case '2':
        exibirCatalogo(catalogo);
        prompt('\nPressione ENTER para voltar...');
        break;
      case '3':
        calcularCompatibilidades(usuario, catalogo);
        prompt('\nPressione ENTER para voltar...');
        break;
      case '4':
        gerarRecomendacaoPersonalizada(usuario, catalogo);
        prompt('\nPressione ENTER para voltar...');
        break;
      case '5':
        console.log('\nAté a próxima maratona!');
        finalizarOnboarding(usuario.nome, exibirMensagemFinal);
        break;
      default:
        console.log('\nOpção inválida.');
        prompt('\nPressione ENTER para voltar...');
    }

  } while (opcao !== '5');
}
/*==================coleta interativa do perfil (com validação)===================*/ 


function criarPerfil() {
  console.clear();
  console.log('=============================================');
  console.log('       BEM-VINDO AO CINEMATCH JS');
  console.log('=============================================\n');

  let nome = '';
  while (nome === '') {
    nome = prompt('Qual é o seu nome? ').trim();
    if (nome === '') {
      console.log('Nome obrigatório. Digite novamente.');
    }
  }

  let idade = null;
  while (idade === null) {
    const idadeTexto = prompt('Qual é a sua idade? ').trim();

    if (idadeTexto === '') {
      console.log('Idade obrigatória. Digite um número.');
    } else {
      const idadeNumero = Number(idadeTexto);
      if (isNaN(idadeNumero) || idadeNumero <= 0) {
        console.log('Idade inválida. Digite um número maior que 0.');
      } else {
        idade = idadeNumero;
      }
    }
  }

  console.log('\nDigite seus gêneros favoritos (um por vez).');
  console.log('Quando terminar, digite "fim" ou pressione ENTER.\n');

  const generosFavoritos = [];
  let genero = '';

  do {
    genero = prompt('Gênero: ').trim();
    if (genero !== '' && genero.toLowerCase() !== 'fim') {
      generosFavoritos.push(genero);
    }
  } while (genero !== '' && genero.toLowerCase() !== 'fim');

  return {
    nome: nome,
    idade: idade,
    generosFavoritos: generosFavoritos
  };
}

function exibirPerfil(usuario) {
  console.clear();
  console.log('\n===== MEU PERFIL =====\n');
  console.log(`O seu nome é: ${usuario.nome}`);
  console.log(`A sua idade é: ${usuario.idade}`);
  console.log(`Seus gêneros favoritos são: ${usuario.generosFavoritos.join(', ')}`);
}
