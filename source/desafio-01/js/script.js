"use strict";

const urlApi =
  "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo ";
const NAO_ENCONTRADO = ["NENHUM USUÁRIO ENCONTRADO", "NADA ENCONTRADO"];

let usersArray = [];
let filteredUsers = [];
let inputName = null;
let listDiv = null;
let statisticsDiv = null;
let statistisc = { male: 0, female: 0, ageSum: 0, ageAvg: 0 };
let template = "Sexo Masculino {$}";
let h5Users = document.createElement("h5");
let h5Statistics = document.createElement("h5");
let spanMales = document.createElement("span");
let spanFemale = document.createElement("span");
let spanAgeSum = document.createElement("span");
let spanAgeAvg = document.createElement("span");

window.addEventListener("load", async () => {
  inputName = document.querySelector("#inpUserName");
  listDiv = document.querySelector("#list");
  statisticsDiv = document.querySelector("#statistics");

  await getUsers();

  document.querySelector("#inpUserName").addEventListener("keyup", doKeyUp);
  document.querySelector("#btnBuscar").addEventListener("click", doClick);

  const alunos = [
    { nome: "Rebeca", genero: "F", nota: 10 },
    { nome: "Carla", genero: "F", nota: 7 },
    { nome: "Cris", genero: "M", nota: 8 },
    { nome: "João", genero: "M", nota: 2 },
    { nome: "Aline", genero: "F", nota: 0 },
  ];

  // var teste = alunos
  //   .filter((aluno) => aluno.genero == "M")
  //   .filter((aluno) => aluno.nota >= 7)
  //   .map((aluno) => ({ nota: aluno.nota }))
  //   .reduce((notas, aluno) => (notas += aluno.nota));

  // console.log(teste);

  const name = "Foo";
  const lastName = String("Bar");

  console.log(name.constructor === lastName.constructor);
  console.log(name.prototype === String.prototype);
  console.log(lastName.__proto__ === String.prototype);
  console.log(name.__proto__.split === lastName.__proto__.split);

  // let totalDeDias = parseInt(gets())
  // Implemente aqui o cálculo
  // Implemente aqui o cálculo

  // let totalDeDias = parseInt(gets());
  // // Implemente aqui o cálculo

  // let anos = parseInt(totalDeDias / 365);
  // let meses = parseInt(totalDeDias - anos * 365);
  // let dias = totalDeDias - parseInt(totalDeDias - anos * 365);
  // console.log(anos + "anos(s)");
  // console.log(meses + "mes(es)");
  // console.log(dias + "dia(s)");

  // let totalItems = gets();

  // for (var i = 0; i < totalItems; i++) {
  //   let itens = gets();
  //   let itensOrdenados = itens.split(" ").sort();
  //   let itensUnicos = itensOrdenados; // Implemente aqui a lógica para ter os itens unicos

  //   itensUnicos.filter()
  //   itensUnicos.indexOf()

  //   let resposta = [...itensUnicos].join(" ");
  //   console.log(resposta);
  // }

  let totalItems = 10;
  let items = [];
  let pares = [];
  let impares = [];

  items = [4, 32, 34, 543, 3456, 654, 567, 87, 6789, 98];

  for (let i = 0; i < totalItems; i++) {
    let input = items[i];

    itens.push(input);

    if (input % 2 === 0) pares.push(input);
    else impares.push(input);
  }

  pares = pares.sort((a, b) => a - b);
  impares = impares.sort((a, b) => b - a);

  const result = [...pares, ...impares];

  console.log(result.join("/n"));
});

//adicionar eventos
//Fazer fetch na api de usuários
//criar função para buscar usuarios

const doKeyUp = (event) => {
  let filtro = null;
  filtro = inputName.value;

  if (event.key === "Enter") {
    filtrar(filtro);
    renderUsers();
    renderStatistics();
  }
};

const doClick = (event) => {
  let filtro = null;
  filtro = inputName.value;
  filtrar(filtro);
  renderUsers();
  renderStatistics();
};

const getUsers = async () => {
  let resource = await (await fetch(urlApi)).json();
  usersArray = resource.results;
  usersArray = await usersArray.map((user) => {
    return {
      name: user.name.first + " " + user.name.last,
      picture: user.picture,
      age: user.dob.age,
      gender: user.gender,
    };
  });

  filteredUsers = usersArray;

  console.log(filteredUsers);
};

const filtrar = (filtro) => {
  filtro = filtro.toLowerCase();
  console.log(filtro);

  filteredUsers = usersArray.filter((user) => {
    return user.name.toLowerCase().indexOf(filtro) !== -1;
  });
};

const renderUsers = () => {
  listDiv.textContent = "";

  if (filteredUsers.length === 0) {
    listDiv.textContent = NAO_ENCONTRADO[1];

    return;
  }

  h5Users.innerHTML = filteredUsers.length + " usuário(s) encontrado(s)";
  listDiv.appendChild(h5Users);

  filteredUsers.forEach((user) => {
    let divUser = document.createElement("div");
    let img = document.createElement("img");

    img.src = user.picture.thumbnail;
    img.alt = "foto de " + user.name;
    divUser.appendChild(img);

    let spanUser = document.createElement("span");
    spanUser.innerHTML = `${user.name}, ${user.age} anos`;
    divUser.appendChild(spanUser);

    listDiv.appendChild(divUser);
  });
};

const renderStatistics = async () => {
  statisticsDiv.textContent = "";

  if (filteredUsers.length === 0) {
    statisticsDiv.textContent = NAO_ENCONTRADO[0];

    return;
  }

  h5Statistics.innerHTML = "Estatísticas";
  statisticsDiv.appendChild(h5Statistics);

  const sumAge = filteredUsers.reduce((acumulator, user) => {
    return (acumulator += user.age);
  }, 0);

  console.log(sumAge);

  const maleCount = filteredUsers.reduce((acumulator, user) => {
    if (user.gender === "male") return ++acumulator;
    else return acumulator;
  }, 0);

  const femaleCount = filteredUsers.reduce((acumulator, user) => {
    if (user.gender === "female") return ++acumulator;
    else return acumulator;
  }, 0);

  const avgAge = sumAge / filteredUsers.length;

  spanMales.innerHTML = `Sexo masculino: <b>${maleCount}</b><br>`;
  statisticsDiv.appendChild(spanMales);

  spanFemale.innerHTML = `Sexo feminino: <b>${femaleCount}</b><br>`;
  statisticsDiv.appendChild(spanFemale);

  spanAgeSum.innerHTML = `Soma das idades: <b>${sumAge}</b><br>`;
  statisticsDiv.appendChild(spanAgeSum);

  spanAgeAvg.innerHTML = `Média das idades: <b>${avgAge}</b><br>`;
  statisticsDiv.appendChild(spanAgeAvg);
};
