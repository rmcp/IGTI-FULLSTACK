"use strict";

import express from "express";
import gradesRepo from "../Repository/GradesRepository.js";
import logger from "../logger.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const notaTotal = await gradesRepo.getNotaTotal(
      req.body.student,
      req.body.subject
    );
    res.send(JSON.stringify(notaTotal));
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ error: err.message });
});

export default router;
