"use strict";

const mapa = document.querySelector("#map");

const getEstado = ({ target }) => {
  const estado = target.id.replace("BR-", "");
  console.log(estado);

  // const nomeEstado = target.getAttribute('title')
  const listarCidades = async (estado) => {
    const url = `http://localhost:8080/v1/senai/cidades/${estado}`;

    const response = await fetch(url);
    const data = await response.json();

    
    return {
      uf: data.uf,
      nome: data.descricao,
      cidades: data.cidades,
    };
  };
  listarCidades(estado).then((item) => {
    console.log(item);
  });

  const dadosEstado = async (estado) => {
    const url = `http://localhost:8080/senai/estado/sigla/${estado}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      capital: data.capital,
      regiao: data.regiao,
    };
  };

  dadosEstado(estado).then((item) => {
    console.log(item);
  });

  const cidadesContainer = document.querySelector(".card__cidades-container");
  const preencherDados = async () => {
    const listaCidades = await listarCidades(estado);
    const dadosDoEstado = await dadosEstado(estado);
    document.querySelector(".card__sigla").textContent = listaCidades.uf;
    document.querySelector(".card__title").textContent = listaCidades.nome;
    document.querySelector(".capital__nome").textContent =
      dadosDoEstado.capital;
    document.querySelector(".regiao__nome").textContent = dadosDoEstado.regiao;
    listaCidades.cidades.forEach((item) => {
      const cidade = document.createElement("span");
      cidade.textContent = item;
      cidadesContainer.append(cidade);
    });
    console.log(cidadesContainer);
  };

  cidadesContainer.innerHTML = "";
  preencherDados();
};

const showTitle = function ({ target }) {
  const nomeEstado = target.getAttribute("title");
  console.log(nomeEstado);
};

mapa.addEventListener("click", getEstado);
mapa.addEventListener("mouseover", showTitle);

