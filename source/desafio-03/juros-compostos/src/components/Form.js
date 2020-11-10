import React from "react";

export default function Form({
  capitalInicial,
  taxaJurosMensal,
  periodo,
  onChangeValues,
}) {
  const handleOnChange = (event) => {
    console.log(event.target.id);
    const newValue = parseFloat(event.target.value);

    switch (event.target.id) {
      case "inputP":
        onChangeValues(newValue, taxaJurosMensal, periodo);
        break;
      case "inputTaxa":
        onChangeValues(capitalInicial, newValue, periodo);
        break;
      case "inputPeriodo":
        onChangeValues(capitalInicial, taxaJurosMensal, newValue);
        break;

      default:
        break;
    }
  };

  return (
    <form>
      <div style={styles.flexRow}>
        <div className="input-field">
          <input
            id="inputP"
            type="number"
            min={0}
            max={100000}
            value={capitalInicial}
            onChange={handleOnChange}
            step="100"
            autoFocus
          />
          <label className="active" htmlFor="inputType">
            Capital Inicial:
          </label>
        </div>
        <div className="input-field">
          <input
            id="inputTaxa"
            type="number"
            value={taxaJurosMensal}
            onChange={handleOnChange}
          />
          <label className="active" htmlFor="0">
            Taxa de juros mensal:
          </label>
        </div>
        <div className="input-field">
          <input
            id="inputPeriodo"
            type="number"
            value={periodo}
            onChange={handleOnChange}
          />
          <label className="active" htmlFor="inputType">
            Periodo (meses):
          </label>
        </div>
      </div>
    </form>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
};
