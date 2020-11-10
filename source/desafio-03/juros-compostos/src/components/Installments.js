import React from "react";
import Installment from "./Installment";
import css from "./installment.module.css";

export default function Installments({ installments }) {
  console.log(installments);
  return (
    <div className={css.flexRow}>
      {installments.map((elem, index) => {
        console.log(elem);
        return (
          <div key={index}>
            <Installment installment={elem}></Installment>
          </div>
        );
      })}
    </div>
  );
}
