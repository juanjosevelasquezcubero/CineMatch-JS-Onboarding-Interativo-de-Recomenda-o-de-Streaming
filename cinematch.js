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
//==================Criar catálogo de filmes e séries===================//

const catalogoBase = [
  { id: 1, titulo: 'John Wick', tipo: 'Filme', generos: ['Ação', 'Thriller'], duracaoMinutos: 101 },
  { id: 2, titulo: 'O Contador', tipo: 'Filme', generos: ['Ação', 'Drama', 'Thriller'], duracaoMinutos: 128 },
  { id: 3, titulo: 'Stranger Things', tipo: 'Série', generos: ['Ficção Científica', 'Terror', 'Drama'], duracaoMinutos: 50, temporadas: 4 },
  { id: 4, titulo: 'La Casa de Papel', tipo: 'Série', generos: ['Ação', 'Crime', 'Suspense'], duracaoMinutos: 45, temporadas: 5 },
  { id: 5, titulo: 'Interestelar', tipo: 'Filme', generos: ['Ficção Científica', 'Drama', 'Aventura'], duracaoMinutos: 169 },
  { id: 6, titulo: 'The Witcher', tipo: 'Série', generos: ['Ação', 'Fantasia', 'Aventura'], duracaoMinutos: 60, temporadas: 3 },
  { id: 7, titulo: 'Matrix', tipo: 'Filme', generos: ['Ação', 'Ficção Científica'], duracaoMinutos: 136 },
  { id: 8, titulo: 'Breaking Bad', tipo: 'Série', generos: ['Drama', 'Crime', 'Suspense'], duracaoMinutos: 47, temporadas: 5 }
];

function exibirCatalogo(catalogo) {
  console.clear();
  console.log('\n===== CATÁLOGO COMPLETO =====\n');

  catalogo.forEach((item, index) => {
    console.log(`${index + 1}. ${item.titulo} (${item.tipo}) — ${item.duracaoMinutos} min`);
    console.log(`   Gêneros: ${item.generos.join(', ')}`);
    if (item.temporadas) {
      console.log(`   Temporadas: ${item.temporadas}`);
    }
    console.log('');
  });
}
// função para remover acentos e normalizar o texto para comparação//

function removerAcentos(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}