import React, { Fragment } from "react";
import Bar from "./Bar";

export default class Barras extends React.Component {
  constructor() {
    super();

    // this.state = {
    //   colorINSS: "#e67e22",
    //   colorIRPF: "#c0392b",
    //   colorNetSalary: "#16a085",
    // };
  }

  render() {
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

    const { discountINSS = 0, discountIRPF = 0, netSalary = 0 } = salario;

    const colorINSS = "#e67e22";
    const colorIRPF = "#c0392b";
    const colorNetSalary = "#16a085";

    const total = discountINSS + discountIRPF + netSalary;
    const percINSS = (discountINSS / total) * 100;
    const percIRPF = (discountIRPF / total) * 100;
    const percNetSalary = (netSalary / total) * 100;

    return (
      <Fragment>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bar value={percINSS} color={colorINSS} />
          <Bar value={percIRPF} color={colorIRPF} />
          <Bar value={percNetSalary} color={colorNetSalary} />
        </div>
      </Fragment>
    );
  }
}
