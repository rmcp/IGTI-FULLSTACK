"use strict";

import express from "express";
import logger from "../logger.js";
import accountsController from "../controllers/accountsController.js";

const router = express.Router();

router.post("/transferir", async (req, res, next) => {
  try {
    res.send(await accountsController.transferir(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const accounts = await accountsController.getAll();
    res.send(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/account/:conta", async (req, res, next) => {
  try {
    const accountDb = await accountsController.get(req.params.conta);

    if (!!accountDb) {
      res.send(accountDb);
    } else {
      res.send(404, "Conta nao encontrada");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/mediaSaldos/:agency", async (req, res, next) => {
  try {
    try {
      const accounts = await accountsController.mediaSaldos(
        parseInt(req.params.agency)
      );

      res.send(accounts);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/menoresSaldos/:limit", async (req, res, next) => {
  try {
    try {
      const accounts = await accountsController.menoresSaldos(
        parseInt(req.params.limit)
      );

      res.send(accounts);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/maioresSaldos/:limit", async (req, res, next) => {
  try {
    try {
      const accounts = await accountsController.maioresSaldos(
        parseInt(req.params.limit)
      );

      res.send(accounts);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.get("/maximoPorAgencia", async (req, res, next) => {
  try {
    try {
      const accounts = await accountsController.maxByAgency();

      res.send(accounts);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/mover", async (req, res, next) => {
  try {
    try {
      const accounts = await accountsController.moveToPrivateAgency();

      res.send(accounts);
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/", async (req, res, next) => {
  try {
    await accountsController.remove(req.body);
    const accountsCount = (await accountsController.getAll()).length;
    res.send(JSON.stringify(accountsCount));
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    res.send(await accountsController.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch("/depositar", async (req, res, next) => {
  try {
    const { agencyNumber, accountNumber, value } = req.body;
    const accountDb = await accountsController.depositar(
      agencyNumber,
      accountNumber,
      value
    );

    if (!!accountDb) {
      res.send(accountDb);
    } else {
      res.send(404, "Conta nao encontrada");
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/sacar", async (req, res, next) => {
  try {
    const { agencyNumber, accountNumber, value } = req.body;
    const accountDb = await accountsController.sacar(
      agencyNumber,
      accountNumber,
      value
    );

    if (!!accountDb) {
      res.send(accountDb);
    } else {
      res.send(404, "Conta nao encontrada");
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ error: err.message });
});

export default router;
