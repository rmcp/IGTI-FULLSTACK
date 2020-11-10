import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
  agencia: {
    type: Number,
    require: true,
  },
  conta: {
    type: Number,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  balance: {
    type: Number,
    require: true,
    min: [0],
    validade(balance) {
      if (balance < 0)
        throw new Error("Valor negativo para o saldo nao permitido");
    },
  },
});

const accountModel = mongoose.model("accounts", accountSchema);

export default accountModel;
