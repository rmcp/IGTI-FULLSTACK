"use strict";

import express from "express";
import accounts from "./routes/accountsRouter.js";
import saldos from "./routes/saldoRouter.js";

const app = express();
app.use(express.json());

app.use("/accounts", accounts);
app.use("/saldos", saldos);

app.listen(3000, () => {
  console.log("iniciado com sucesso");
});
