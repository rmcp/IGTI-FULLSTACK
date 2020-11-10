"use strict";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import accounts from "./routes/accountsRouter.js";
import saldos from "./routes/saldoRouter.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/accounts", accounts);
app.use("/saldos", saldos);

app.listen(process.env.PORT_API, () => {
  console.log("iniciado com sucesso");
});

{
  /*Conexao com o MongoDB*/

  (async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://${process.env.USERDB}:${process.env.PASSWORD}@cluster0.usxoz.mongodb.net/bank?retryWrites=true&w=majority`,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      console.log("Conectado no MongoDB");
    } catch (error) {
      console.log("erro ao conecat no banco de dados:" + error);
    }
  })();
}
