"use strict";

import express from "express";
import gradesRepo from "../Repository/GradesRepository.js";
import logger from "../logger.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const topN = await gradesRepo.getTopN(
      req.body.subject,
      req.body.type,
      req.body.n
    );
    res.send(topN);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ error: err.message });
});

export default router;
