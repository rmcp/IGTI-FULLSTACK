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
