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

const input01 = document.getElementById("a1");
const input02 = document.getElementById("a2");
const input03 = document.getElementById("a3");
const input04 = document.getElementById("b1");
const input05 = document.getElementById("b2");
const input06 = document.getElementById("b3");
const input07 = document.getElementById("b4");
const input08 = document.getElementById("b5");
const input09 = document.getElementById("c1");
const input10 = document.getElementById("c2");
const input11 = document.getElementById("c3");
const input12 = document.getElementById("c4");

let listainputs = [input01,input02,input03,input04,input05,input06,input07,input08,input09,input10,input11,input12]




// =====================================================================================================

confirmarcontainer.addEventListener("click", function(){

  for(let i = 0; i < listainputs.length; i++){
    if (listainputs[i].value === ""){
      alert("Preencha os campos restantes");
      return
    }
  }
  if(itemssacola.length != 0){
    localStorage.setItem("carrinho", JSON.stringify(itemssacola));
    localStorage.setItem("pagar", precototal);
    window.location= "sucesso.html";
  }
  else{alert("Você precisa adicionar algum item na sacola!")};
});

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
  texto.innerText = "Comprar agora";
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
};

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
  });

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