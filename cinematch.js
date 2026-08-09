/**
 * ============================================================
 *  CineMatch JS - Mini-Projeto (prototipo motor de recomendação de streaming)
 *  Autor: Juan José Velasquez Cubero
 * ============================================================
 */



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
//====================================================================//
//Compatabilidade entre o perfil do usuário e os itens do catálogo//
//====================================================================//
function calcularCompatibilidadeItem(usuario, conteudo) {
  const generosUsuario = usuario.generosFavoritos.map(g => removerAcentos(g.trim()));
  const generosConteudo = conteudo.generos.map(g => removerAcentos(g.trim()));

  const generosEmComum = generosConteudo.filter(g => generosUsuario.includes(g));
  const generosNaoExplorados = generosConteudo.filter(g => !generosUsuario.includes(g));

  const totalGeneros = generosConteudo.length || 1;
  const percentual = Math.round((generosEmComum.length / totalGeneros) * 100);

  let classificacao;
  if (percentual >= 80) {
    classificacao = 'Alta afinidade';
  } else if (percentual >= 50) {
    classificacao = 'Média afinidade';
  } else {
    classificacao = 'Baixa afinidade';
  }

  const generosEmComumOriginais = conteudo.generos.filter(g =>
    generosUsuario.includes(removerAcentos(g))
  );

  const generosNaoExploradosOriginais = conteudo.generos.filter(g =>
    !generosUsuario.includes(removerAcentos(g))
  );

  return {
    conteudo,
    percentual,
    classificacao,
    generosEmComum: generosEmComumOriginais,
    generosNaoExplorados: generosNaoExploradosOriginais
  };
}

function calcularCompatibilidades(usuario, catalogo) {
  console.clear();
  console.log('\n===== COMPATIBILIDADE COM O CATÁLOGO =====\n');

  const resultados = catalogo.map(conteudo => calcularCompatibilidadeItem(usuario, conteudo));

  resultados.forEach(resultado => {
    const { conteudo, percentual, classificacao, generosEmComum, generosNaoExplorados } = resultado;

    console.log(`Título: ${conteudo.titulo}`);
    console.log(`Tipo: ${conteudo.tipo}`);
    console.log(`Compatibilidade: ${percentual}%`);
    console.log(`Gêneros em comum: ${generosEmComum.length > 0 ? generosEmComum.join(', ') : 'Nenhum'}`);
    console.log(`Gêneros não explorados: ${generosNaoExplorados.length > 0 ? generosNaoExplorados.join(', ') : 'Nenhum'}`);
    console.log(`Classificação: ${classificacao}`);
    console.log('----------------------------------------');
  });
}
//====================================================================//
//======================= RECOMENDAÇÃO ===============================//
//====================================================================//
function encontrarMaiorCompatibilidade(usuario, catalogo) {
  if (catalogo.length === 0) return null;

  const resultados = catalogo.map(c => calcularCompatibilidadeItem(usuario, c));

  return resultados.reduce((maior, atual) => {
    return atual.percentual > maior.percentual ? atual : maior;
  });
}

function gerarRecomendacaoPersonalizada(usuario, catalogo) {
  console.clear();
  console.log('\n===== RECOMENDAÇÃO PRINCIPAL =====\n');

  const melhor = encontrarMaiorCompatibilidade(usuario, catalogo);

  if (!melhor) {
    console.log('Nenhum conteúdo disponível.');
    return;
  }

  console.log(`Recomendação principal:`);
  console.log(`${melhor.conteudo.titulo} (${melhor.conteudo.tipo})`);
  console.log(`Compatibilidade: ${melhor.percentual}%`);
  console.log(`Classificação: ${melhor.classificacao}`);

  console.log(`\nRecomendação para ${usuario.nome}:`);

  if (melhor.generosNaoExplorados.length > 0) {
    console.log(`Você já curte ${usuario.generosFavoritos.join(', ')} — que tal experimentar ${melhor.generosNaoExplorados[0]}?`);
    console.log(`"${melhor.conteudo.titulo}" pode ser uma ótima escolha.`);
  } else {
    console.log(`Esse conteúdo combina 100% com o seu gosto.`);
  }
}
//=========================================================================//
//====================Funcao Sair do programa(callback)=====================//
//=========================================================================//
function finalizarOnboarding(nomeUsuario, callback) {
  console.log('\nOnboarding finalizado com sucesso.');
  callback(nomeUsuario);
}

function exibirMensagemFinal(nome) {
  console.log(`${nome}, aproveite sua maratona! Bom streaming na PlayNow.`);
}
//========================Classes=========================//
//=========================================================//
class Conteudo {
  constructor(id, titulo, tipo, generos, duracaoMinutos) {
    this.id = id;
    this.titulo = titulo;
    this.tipo = tipo;
    this.generos = generos;
    this.duracaoMinutos = duracaoMinutos;
  }

  exibirResumo() {
    return `${this.titulo} (${this.tipo}) — ${this.duracaoMinutos} min`;
  }
}

class Serie extends Conteudo {
  constructor(id, titulo, generos, duracaoMinutos, temporadas) {
    super(id, titulo, 'Série', generos, duracaoMinutos);
    this.temporadas = temporadas;
  }

  exibirTemporadas() {
    return `${this.titulo} tem ${this.temporadas} temporada(s)`;
  }
}
//==================================================================//
//=================== Clousure======================================//
function criarContadorDeRecomendacoes() {
  let total = 0;
  return function () {
    total++;
    return total;
  };
}

const contadorRecomendacoes = criarContadorDeRecomendacoes();
//==================================================================//
//=================== Promise ======================================//
function buscarCatalogoSimulado() {
  return new Promise((resolve) => {
    console.log('\nBuscando catálogo no servidor da PlayNow...');
    setTimeout(() => {
      resolve(catalogoBase);
    }, 1200);
  });
}
//==================================================================//
//===================liga o programa(async /  await)==================//
//==================================================================//
async function iniciarSistema() {
  const usuario = criarPerfil();
  console.log(`\nOlá, ${usuario.nome}! Perfil criado com sucesso.`);

  const catalogo = await buscarCatalogoSimulado();
  console.log('Catálogo carregado com sucesso!');

  exibirMenu(usuario, catalogo);
}

iniciarSistema().catch(erro => {
  console.error('Erro:', erro.message);
});