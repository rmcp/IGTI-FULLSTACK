"use strict";

import accountModel from "../models/accountModel.js";
import mongoose from "mongoose";

{
  /*Conexao com o MongoDB*/
  (async () => {
    try {
      await mongoose.connect(
        "mongodb+srv://igtiBootcamp:vakPGci9mJ9sToN3@cluster0.usxoz.mongodb.net/bank?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
      );

      console.log("Conectado no MongoDB");
    } catch (error) {
      console.log("erro ao conecat no banco de dados:" + error);
    }
  })();
}

const add = async (account) => {
  try {
  } catch (err) {
    throw err;
  }
};

const update = async (agencyNumber, accountNumber, value) => {
  try {
    const query = { agencia: agencyNumber, conta: accountNumber };

    const accountDb = await accountModel.findOneAndUpdate(
      query,
      {
        $inc: { balance: value },
      },
      { new: true }
    );

    return accountDb;
  } catch (err) {
    throw err;
  }
};

const remove = async (account) => {
  const query = { agencia: account.agencia, conta: account.conta };

  return await accountModel.deleteOne(query);
};

const get = async (accountNumber) => {
  const query = { conta: accountNumber };

  return await accountModel.findOne(query);
};

const getBalance = async (agencyNumber, accountNumber) => {
  const query = { agencia: agencyNumber, conta: accountNumber };

  return await accountModel.findOne(query);
};

const getByAgencyNumber = async (agencyNumber) => {
  const query = { agencia: agencyNumber };

  return await accountModel.find(query);
};

const getAll = async () => {
  const accounts = await accountModel.find();

  return accounts;
};

const moveToAgency = async (account, agencyNumber) => {
  const query = { agencia: account.agencia, conta: account.conta };

  const accountDb = await accountModel.findOneAndUpdate(
    query,
    {
      agencia: agencyNumber,
    },
    { new: true }
  );

  return accountDb;
};

const menoresSaldos = async (limit) => {
  const accounts = await accountModel.find().sort({ balance: 1 }).limit(limit);

  return accounts;
};

const maioresSaldos = async (limit) => {
  const accounts = await accountModel.find().sort({ balance: -1 }).limit(limit);

  return accounts;
};

const maiorPorAgencia = async (agencyNumber) => {
  const account = await accountModel
    .findOne({ agencia: agencyNumber })
    .sort({ balance: -1 });
  //.limit(1);

  return account;
};

const maxByAgency = async () => {
  const accounts = await accountModel
    .aggregate([
      {
        $group: {
          _id: "$agencia",
          max: {
            $max: "$balance",
          },
        },
      },
    ])
    .exec();

  return accounts;
};

const averageBalance = async (agencyNumber) => {
  const accounts = await accountModel
    .aggregate([
      {
        $match: {
          agencia: agencyNumber,
        },
      },
      {
        $group: {
          _id: "$agencia",
          average: {
            $avg: "$balance",
          },
        },
      },
    ])
    .exec();

  return accounts;
};

export default {
  add,
  update,
  remove,
  get,
  getBalance,
  getAll,
  averageBalance,
  maioresSaldos,
  menoresSaldos,
  maxByAgency,
  maiorPorAgencia,
  moveToAgency,
  getByAgencyNumber,
};
