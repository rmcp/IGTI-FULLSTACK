import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Installments from "./components/Installments";
import { calculoJuros } from "../src/helpers/calculoJuros.js";

export default function App() {
  const [capitalInicial, setCapitalInicial] = useState(0);
  const [taxaJurosMensal, setTaxaJurosMensal] = useState(0);
  const [periodo, setPeriodo] = useState(1);
  const [installments, setInstallments] = useState([]);

  const handleChangeValues = (parCapitalInicial, parTaxa, parPeriodo) => {
    setCapitalInicial(parCapitalInicial);
    setTaxaJurosMensal(parTaxa);
    setPeriodo(parPeriodo);
  };

  // useEffect(() => {
  //   if (!!installments)

  // }, [installments]);

  useEffect(() => {
    let arrayInstallments = [];
    let capitalAtualizado = capitalInicial;

    const formataArrayInstallments = () => {
      for (let i = 0; i < periodo; i++) {
        capitalAtualizado = calculoJuros(capitalAtualizado, taxaJurosMensal);
        let rendimento = capitalAtualizado - capitalInicial;
        let rendimentoPercentual = rendimento / capitalInicial;

        arrayInstallments.push({
          mes: i + 1,
          capitalAtualizado,
          rendimento,
          rendimentoPercentual,
        });
      }

      setInstallments(arrayInstallments);
    };

    formataArrayInstallments();
  }, [capitalInicial, taxaJurosMensal, periodo]);

  return (
    // style={{ maxWidth: "500px" }}
    <div className="container">
      <h2 className="center">React - Juros Compostos</h2>

      <Form
        capitalInicial={capitalInicial}
        taxaJurosMensal={taxaJurosMensal}
        periodo={periodo}
        onChangeValues={handleChangeValues}
      ></Form>
      <div>
        <Installments installments={installments}></Installments>
      </div>
    </div>
  );
}
