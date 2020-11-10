import React, { Component } from "react";
import Barras from "./barras/Barras";
import Header from "./components/header/Header";
import { calculateSalaryFrom } from "./helpers/salary";

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      filter: 0,
    };
  }

  async componentDidMount() {}

  calculateSalario = (value) => {
    const salarioDescontos = calculateSalaryFrom(value);

    return salarioDescontos;
  };

  handleChangeFilter = (newText) => {
    const salario = this.calculateSalario(newText);

    this.setState({
      filter: newText,
      salario,
    });
  };

  render() {
    const { salario, filter } = this.state;

    return (
      <div className="container">
        <h1 style={styles.centeredTitle}>
          Cálculo com desconto de INSS + IRPF
        </h1>

        <Header
          filter={filter}
          salario={salario}
          onChangeFilter={this.handleChangeFilter}
        />

        <Barras salario={salario}></Barras>
      </div>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: "center",
  },
};
