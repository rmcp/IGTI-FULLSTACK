"use strict";

import express from "express";
import logger from "../logger.js";
import accountsController from "../controllers/accountsController.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    try {
      const { agencyNumber, accountNumber } = req.body;

      const accountDb = await accountsController.getBalance(
        agencyNumber,
        accountNumber
      );

      if (!!accountDb) {
        res.send(JSON.stringify(accountDb.balance));
      } else {
        res.send(404, "Conta nao encontrada");
      }
    } catch (err) {
      next(err);
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
