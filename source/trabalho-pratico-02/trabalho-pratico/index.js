import functions from "./functions.js";

const init = async () => {
  await functions.createEstados();

  console.log("Top 5:\n");
  console.log(
    (await functions.getTopN(5)).map(
      ({ UF, CidadesCount }) => `${UF} - ${CidadesCount}`
    )
  );

  console.log("\n\nBottom 5:\n");
  console.log(
    (await functions.getBottomN(5)).map(
      ({ UF, CidadesCount }) => `${UF} - ${CidadesCount}`
    )
  );

  console.log("\n\nEstados e cidades de maiores nomes: \n");
  console.log(
    (await functions.getFormattedUFs()).map(
      ({ UF, MaiorNome }) => `${UF} - ${MaiorNome}`
    )
  );

  console.log("\n\nEstados e cidades de menores nomes: \n");
  console.log(
    (await functions.getFormattedUFs()).map(
      ({ UF, MenorNome }) => `${UF} - ${MenorNome}`
    )
  );

  console.log("\n\nMaior nome de cidade:\n");
  console.log(
    (await functions.getBiggestName())
      .slice(0, 1)
      .map(({ UF, MaiorNome }) => `${UF} - ${MaiorNome}`)
  );

  console.log("\n\nMenor nome de cidade:\n");
  console.log(
    (await functions.getShortestName())
      .slice(0, 1)
      .map(({ UF, MenorNome }) => `${UF} - ${MenorNome}`)
  );

  console.log("\n\nSoma cinco maiores:\n");
  const sum5Maiores = (await functions.getTopN(5)).reduce(
    (acumulator, current) => {
      return (acumulator += current.CidadesCount);
    },
    0
  );
  console.log(sum5Maiores);

  console.log("\n\nSoma cinco menores:\n");
  const teste = console.log(
    (await functions.getBottomN(5)).reduce((acumulator, current) => {
      return (acumulator += current.CidadesCount);
    }, 0)
  );
};

init();

const imprime5Maiores = async () => {
  console.log(await functions.getTopN(5));
};

const imprime5Menores = async () => {
  console.log("Bottom 5:\n");
  console.log(await functions.getBottomN(5));
};

const imprimeEstadosECidadesMaiorNome = async () => {
  console.log("Estados e cidades de maiores nomes: \n");
  //console.log(await functions.getFormattedUFs());
  console.log(
    (await functions.getFormattedUFs()).map(({ UF, MaiorNome }) => {
      return `${UF} - ${MaiorNome}`;
    })
  );
};

const imprimeEstadosECidadesMenorNome = async () => {
  console.log("Estados e cidades de menores nomes: \n");
  console.log(
    (await functions.getFormattedUFs()).map(({ UF, MenorNome }) => {
      return `${UF} - ${MenorNome}`;
    })
  );
};

const imprimeMaiorNomeCidade = async () => {
  console.log("Maior nome de cidade:\n");
  console.log((await functions.getBiggestName()).slice(0, 1));
};

const imprimeMenorNomeCidade = async () => {
  console.log("Menor nome de cidade:\n");
  console.log((await functions.getShortestName()).slice(0, 1));
};
