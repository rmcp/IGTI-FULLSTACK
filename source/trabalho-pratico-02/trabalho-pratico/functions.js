"use strict";

import { promises as fs } from "fs";

const PATH_FILES = "./trabalho-pratico/Arquivos/";

const createEstados = async () => {
  try {
    const estados = await getJsonFromFile("Estados.json");
    const cidades = await getJsonFromFile("Cidades.json");

    estados.forEach(({ Sigla, ID }) => {
      const cidadesEstado = cidades.filter((cidade) => {
        return cidade.Estado === ID;
      });

      if (cidadesEstado.length > 0) {
        criarArquivoEstado(Sigla, cidadesEstado);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

const criarArquivoEstado = async (uf, content) => {
  try {
    const fileName = `${PATH_FILES}${uf}.json`;

    await fs.writeFile(fileName, JSON.stringify(content));

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getCountCidades = async (uf) => {
  try {
    const fileName = `${PATH_FILES}${uf}.json`;

    const cidades = JSON.parse(await fs.readFile(fileName, "utf-8"));

    return cidades.length;
  } catch (error) {
    console.error(error);
    return -1;
  }
};

const getJsonFromFile = async (fileName) => {
  try {
    const fileFullName = `${PATH_FILES}${fileName}`;

    const file = await fs.readFile(fileFullName, "utf-8");

    return JSON.parse(file);
  } catch (error) {
    console.log(error);
  }
};

const getFormattedUFs = async () => {
  const result = [];

  try {
    const estados = await getJsonFromFile("Estados.json");
    const cidades = await getJsonFromFile("Cidades.json");

    estados.forEach(({ Sigla, ID }) => {
      let cidadesEstado = cidades.filter((cidade) => {
        return cidade.Estado === ID; //&& cidade.Estado === "3"
      });

      if (cidadesEstado.length <= 0) return;

      let cidadesOrderedByName = cidadesEstado.sort((a, b) => {
        if (a.Nome.length > b.Nome.length) return -1;
        if (a.Nome.length < b.Nome.length) return 1;
        if (a.Nome.length === b.Nome.length)
          return a.Nome.localeCompare(b.Nome);
      });

      const maiorNome = cidadesOrderedByName[0].Nome;

      cidadesOrderedByName = cidadesEstado.sort((a, b) => {
        if (a.Nome.length < b.Nome.length) return -1;
        if (a.Nome.length > b.Nome.length) return 1;
        if (a.Nome.length === b.Nome.length)
          return a.Nome.localeCompare(b.Nome);
      });

      const menorNome = cidadesOrderedByName[0].Nome;

      // if (ID === "21") {
      //   console.log(cidadesOrderedByName);
      //   console.log("Menor: " + menorNome + "Maior: " + maiorNome);
      // }

      result.push({
        UF: Sigla,
        CidadesCount: cidadesEstado.length,
        MaiorNome: maiorNome,
        MenorNome: menorNome,
      });
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

const getBottomN = async (n) => {
  try {
    return (await getFormattedUFs())
      .sort((a, b) => a.CidadesCount - b.CidadesCount)
      .slice(0, n);
  } catch (error) {
    console.log(error);
  }
};

const getTopN = async (n) => {
  try {
    return (await getFormattedUFs())
      .sort((a, b) => b.CidadesCount - a.CidadesCount)
      .slice(0, n);
  } catch (error) {
    console.log(error);
  }
};

const getBiggestName = async () => {
  try {
    return (await getFormattedUFs()).sort((a, b) => {
      if (a.MaiorNome.length > b.MaiorNome.length) return -1;
      if (a.MaiorNome.length < b.MaiorNome.length) return 1;
      if (a.MaiorNome.length === b.MaiorNome.length)
        return a.MaiorNome.localeCompare(b.MaiorNome);
    }); //[0];
  } catch (error) {
    console.log(error);
  }
};

const getShortestName = async () => {
  try {
    return (await getFormattedUFs()).sort((a, b) => {
      if (a.MenorNome.length < b.MenorNome.length) return -1;
      if (a.MenorNome.length > b.MenorNome.length) return 1;
      if (a.MenorNome.length === b.MenorNome.length)
        return a.MenorNome.localeCompare(b.MenorNome);
    }); //[0];
  } catch (error) {
    console.log(error);
  }
};

export default {
  createEstados,
  getCountCidades,
  getTopN,
  getBottomN,
  getShortestName,
  getBiggestName,
  getFormattedUFs,
};
