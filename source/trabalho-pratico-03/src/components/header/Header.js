import React, { Component } from "react";
import { formatNumber, formatPercentual } from "../../helpers/formatHelpers";

import css from "./header.module.css";

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      teste: "",
      salarioFull: 1000,
    };
  }

  handleInputChange = (event) => {
    const newText = event.target.value;

    this.props.onChangeFilter(newText);

    this.setState({ salarioFull: 100 });
  };

  formatDescricao = (value, total) => {
    return formatNumber(value) + " (" + formatPercentual(value, total) + " %)";
  };

  //

  render() {
    const { filter } = this.props;
    let { salario } = this.props;

    if (!salario) {
      salario = {
        baseINSS: 0,
        discountINSS: 0,
        baseIRPF: 0,
        discountIRPF: 0,
        netSalary: 0,
      };
    }

    console.log(this.state.salarioFull);

    return (
      <div className={css.flexRow}>
        <label>{"Salario Bruto"}</label>
        <input
          id="inpSalarioBruto"
          type="number"
          min="0"
          value={this.salarioFull}
          onChange={this.handleInputChange}
          placeholder="Salario Bruto"
        />

        <label>{"Base INSS"}</label>
        <input
          id="inpBaseINSS"
          type="text"
          value={formatNumber(salario.baseINSS)}
          placeholder="Base INSS"
          readOnly
        />

        <label>{"Disconto INSS"}</label>
        <input
          id="inpDiscontoINSS"
          type="text"
          value={this.formatDescricao(salario.discountINSS, filter)}
          placeholder="Disconto INSS"
          style={{ color: "#e67e22" }}
          readOnly
        />

        <label htmlFor="inpBaseIRPF">{"Base IRPF"}</label>
        <input
          id="inpBaseIRPF"
          type="text"
          min="0"
          value={formatNumber(salario.baseIRPF)}
          placeholder="Base IRPF"
          readOnly
        />

        <label htmlFor="inpDescontoIRPF">{"Disconto IRPF"}</label>
        <input
          id="inpDescontoIRPF"
          type="text"
          value={this.formatDescricao(salario.discountIRPF, filter)}
          placeholder="Disconto IRPF"
          style={{ color: "#c0392b" }}
          readOnly
        />

        <label htmlFor="inpSalarioLiquido">{"Salario Liquido"}</label>
        <input
          id="inpSalarioLiquido"
          type="text"
          value={this.formatDescricao(salario.netSalary, filter)}
          placeholder="Salario Liquido"
          style={{ color: "#16a085" }}
          readOnly
        />
      </div>
    );
  }
}
