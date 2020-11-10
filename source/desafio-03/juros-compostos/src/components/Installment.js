import React from "react";
import css from "./installment.module.css";
import { formatMoney, formatPercentual } from "../helpers/formatHelpers.js";

export default function Installment({ installment }) {
  const classes = `card ${css.box} `;
  const {
    mes,
    capitalAtualizado,
    rendimento,
    rendimentoPercentual,
  } = installment;

  return (
    <div className={classes}>
      <div className={css.position}>{mes}</div>
      <div>
        <div>{formatMoney(capitalAtualizado)}</div>
        <div>{formatMoney(rendimento)}</div>
        <div>{formatPercentual(rendimentoPercentual)}</div>
      </div>
    </div>
  );
}
