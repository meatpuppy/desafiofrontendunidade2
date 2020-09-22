let carrinho = window.localStorage.getItem("carrinho");
let pagar = window.localStorage.getItem("pagar");
let top20filmes = {};
let generos = {};
let filtroatual = 0;
let outrositems = [];
let itemssacola = [];
let precototal = 0;


const topfilmes = document.querySelector(".topfilmes");
const filmes = document.querySelector(".outrosfilmes");
const conteudosacola = document.querySelector(".conteudo");
const sacola = document.querySelector(".sacola");
const confirmarcontainer = document.querySelector(".confirmarcontainer");
const filtros = document.querySelector(".filtros");
const todosfilter = document.getElementById("todos");
const acaofilter = document.getElementById("acao");
const romancefilter = document.getElementById("romance");
const scififilter = document.getElementById("scifi");
const terrorfilter = document.getElementById("terror");


// =====================================================================================================

confirmarcontainer.addEventListener("click", function(){
  if(itemssacola.length != 0){
    localStorage.setItem("carrinho", JSON.stringify(itemssacola));
    localStorage.setItem("pagar", precototal);
    window.location= "form.html";
  }
  else{alert("Você precisa adicionar algum item na sacola!")};
});

// =====================================================================================================

function filterclick(event) {
  let alvo = event.target;
  ligarfiltro(alvo);
  ativarfiltro(alvo.innerHTML);
  preencherfilmes(filmes);
}

// =====================================================================================================

todosfilter.addEventListener("click", filterclick);
romancefilter.addEventListener("click", filterclick);
acaofilter.addEventListener("click", filterclick);
scififilter.addEventListener("click", filterclick);
terrorfilter.addEventListener("click", filterclick);

// =====================================================================================================

function ativarfiltro(genre) {
  if (genre == "Todos") {
    filtroatual = 0;
  } else {
    for (let i = 0; i < generos.length; i++) {
      if (genre == generos[i].name) {
        filtroatual = generos[i].id;
        break;
      }
    }
  }
}

// =====================================================================================================

const ligarfiltro = function (target) {
  let filterbuttons = filtros.childNodes;
  for (let i = 1; i < filterbuttons.length; i++) {
    filterbuttons[i].className = "desligado";
  }
  target.className = "ligado";
};

// =====================================================================================================

const criarposter = function (parent, i, lista) {
  let filme = lista[i];

  let divposter = document.createElement("div");
  divposter.className = "poster";

  let imagem = document.createElement("img");
  imagem.src = lista[i].poster_path;
  divposter.appendChild(imagem);

  let transparencia = document.createElement("div");
  transparencia.className = "transparencia";
  divposter.appendChild(transparencia);

  let favorito = document.createElement("div");
  favorito.className = "favorito";
  let imagem2 = document.createElement("img");
  imagem2.src = "imagens/Star 2.png";
  favorito.appendChild(imagem2);
  divposter.appendChild(favorito);

  let titulo = document.createElement("div");
  titulo.className = "titulo";
  titulo.innerText = lista[i].title;
  divposter.appendChild(titulo);

  let nota = document.createElement("div");
  nota.className = "nota";
  let imagem3 = document.createElement("img");
  imagem3.src = "imagens/Star 1.png";
  let textonota = document.createElement("div");
  textonota.innerText = lista[i].vote_average;
  nota.appendChild(imagem3);
  nota.appendChild(textonota);
  divposter.appendChild(nota);

  let addsaco = document.createElement("div");
  addsaco.className = "addsaco";
  let botao = document.createElement("div");
  botao.className = "botaosaco";
  botao.innerText = "Sacola";
  let preco = document.createElement("div");
  preco.innerText = "R$ " + lista[i].price;
  addsaco.appendChild(botao);
  addsaco.appendChild(preco);
  divposter.appendChild(addsaco);
  addsaco.addEventListener("click", function () {
    adicionarsacola(conteudosacola, filme);
  });

  parent.appendChild(divposter);
};

// =====================================================================================================

const criardivsacola = function (parent, filme) {
  let divitem = document.createElement("div");
  divitem.className = "item";

  let miniposter = document.createElement("div");
  miniposter.className = "miniposter";
  let imagem = document.createElement("img");
  imagem.src = filme.poster_path;
  let dados = document.createElement("div");
  dados.className = "dados";
  let nome = document.createElement("div");
  nome.className = "nome";
  nome.innerText = filme.title;
  let preco = document.createElement("div");
  preco.className = "preco";
  preco.innerText = "R$ " + filme.price;
  dados.appendChild(nome);
  dados.appendChild(preco);
  miniposter.appendChild(imagem);
  miniposter.appendChild(dados);
  divitem.appendChild(miniposter);

  let quantidade = document.createElement("div");
  quantidade.className = "quantidade";
  quantidade.id = filme.id;
  let adicionar = document.createElement("img");
  adicionar.src = "imagens/add.png";
  adicionar.className = "adicionar";
  adicionar.addEventListener("click", function (e) {
    botaoadicionar(e, filme);
    atualizarpreco();
  });
  let numero = document.createElement("div");
  numero.className = "numero";
  numero.innerText = `${filme.quantidade}`;
  let remover = document.createElement("img");
  remover.className = "remover";
  remover.src = "imagens/lixo.png";
  remover.addEventListener("click", function (e) {
    deletarfilme(e, filme);
  });
  quantidade.appendChild(adicionar);
  quantidade.appendChild(numero);
  quantidade.appendChild(remover);
  divitem.appendChild(quantidade);

  parent.appendChild(divitem);
};

// =====================================================================================================

const botaoadicionar = function (e, filme) {
  const quantidade = document.getElementById(filme.id);
  const numero = quantidade.querySelector(".numero");
  const remover = quantidade.querySelector(".remover");
  filme.quantidade++;
  numero.innerText = filme.quantidade;
  remover.src = "imagens/remover.png";

  precototal = precototal + filme.price;

  localStorage.setItem("carrinho", JSON.stringify(itemssacola));
  localStorage.setItem("pagar", precototal);

};

// =====================================================================================================

const adicionarsacola = function (parent, filme) {
  if (itemssacola.length === 0) {
    conteudosacola.innerHTML = "";
    criarconfirmar(confirmarcontainer);
  }

  let encontrou = false;

  let atualizarfilme = {};

  for (let i = 0; i < itemssacola.length; i++) {
    if (itemssacola[i].id === filme.id) {
      itemssacola[i].quantidade++;
      encontrou = true;
      atualizarfilme = itemssacola[i];
    }
  }

  if (encontrou === false) {
    filme.quantidade = 1;
    itemssacola.push(filme);

    criardivsacola(parent, filme);
  } else {
    const quantidade = document.getElementById(filme.id);
    const numero = quantidade.querySelector(".numero");
    numero.innerText = atualizarfilme.quantidade;
    const remover = quantidade.querySelector(".remover");
    remover.src = "imagens/remover.png";
  }
  precototal = precototal + filme.price;

  atualizarpreco();

  localStorage.setItem("carrinho", JSON.stringify(itemssacola));
  localStorage.setItem("pagar", precototal);
};

// =====================================================================================================

const atualizarpreco = function () {
  const confirmar = document.querySelector(".confirmar");
  const total = confirmar.querySelector(".total");
  for (let i = 0; i < itemssacola.length; i++) {
    total.innerText = `R$ ${precototal}`;
  }
};

// =====================================================================================================

const criarconfirmar = function (parent) {
  let confirmar = document.createElement("div");
  confirmar.className = "confirmar";

  let texto = document.createElement("div");
  texto.innerText = "Confirme seus dados";
  confirmar.appendChild(texto);

  let total = document.createElement("div");
  total.className = "total";
  confirmar.appendChild(total);

  parent.appendChild(confirmar);
};

// =====================================================================================================

const sacolavazia = function (parent) {
  conteudosacola.innerHTML = "";

  let texto1 = document.createElement("div");
  texto1.className = "texto1";
  texto1.innerText = "Sua sacola está vazia";
  let texto2 = document.createElement("div");
  texto2.className = "texto2";
  texto2.innerText = "Adicione filmes agora";
  let imagem = document.createElement("img");
  imagem.src = "imagens/sacolavazia.png";

  parent.appendChild(texto1);
  parent.appendChild(texto2);
  parent.appendChild(imagem);
};

// =====================================================================================================

const deletarfilme = function (e, filme) {
  const botao = e.target;
  const item = botao.closest("div.item");
  const quantidade = document.getElementById(filme.id);
  const numero = quantidade.querySelector(".numero");
  const remover = quantidade.querySelector(".remover");

  precototal = precototal - filme.price;

  if (itemssacola.length === 1 && itemssacola[0].quantidade === 1) {
    sacolavazia(conteudosacola);
    confirmarcontainer.innerHTML = "";
  }

  if (filme.quantidade === 1) {
    item.remove();
    for (let i = itemssacola.length - 1; i >= 0; i--) {
      if (filme.id === itemssacola[i].id) {
        itemssacola.splice(i, 1);
      }
    }
    atualizarpreco();
  } else if (filme.quantidade === 2) {
    remover.src = "imagens/lixo.png";
    filme.quantidade--;
    numero.innerText = filme.quantidade;
    atualizarpreco();
  } else {
    filme.quantidade--;
    numero.innerText = filme.quantidade;
    atualizarpreco();
  }

  localStorage.setItem("carrinho", JSON.stringify(itemssacola));
  localStorage.setItem("pagar", precototal);

};

// =====================================================================================================

const preenchertopfilmes = function (parent) {
  const lista = top20filmes;
  for (let i = 0; i < 5; i++) {
    criarposter(parent, i, lista);
  }
};

// =====================================================================================================

const preencherfilmes = function (parent) {
  const lista = filtrarlista();
  parent.innerHTML = "";
  for (let i = 0; i < Math.min(lista.length, 10); i++) {
    criarposter(parent, i, lista);
  }
};

// =====================================================================================================

function filtrarlista() {
  if (filtroatual === 0) {
    return top20filmes;
  } 
  
  else {
    return top20filmes.filter(function (filme) {
      for (let i = 0; i < filme.genre_ids.length; i++) {
        if (filtroatual === filme.genre_ids[i]) {
          return true;
        }
      }
      return false;
    });
  }
}

// =====================================================================================================



// EXECUÇÕES ===========================================================================================

fetch(
  "https://tmdb-proxy-workers.vhfmag.workers.dev/3/genre/movie/list?language=pt-BR"
)
  .then((retorno) => {
    return retorno.json();
  })
  .then((json) => {
    generos = json.genres;
  });

fetch(
  "https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR"
)
  .then((retorno) => {
    return retorno.json();
  })
  .then((json) => {
    top20filmes = json.results;
    preenchertopfilmes(topfilmes);
    preencherfilmes(filmes);
  });

  console.log(carrinho);

if(carrinho === null){
sacolavazia(conteudosacola);
}

else{
  pagar = JSON.parse(pagar);
  precototal = pagar;
  carrinho = JSON.parse(carrinho);
  itemssacola = carrinho;
  conteudosacola.innerHTML="";
  for(let i = 0; i < itemssacola.length; i++){
    criardivsacola(conteudosacola, itemssacola[i]);
    
  }
  criarconfirmar(confirmarcontainer)
  atualizarpreco()

  ;
}