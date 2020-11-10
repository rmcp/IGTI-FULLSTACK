"use strict";

import express from "express";
import gradesRepo from "../Repository/GradesRepository.js";
import logger from "../logger.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    res.send(await gradesRepo.add(req.body));
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const grades = await gradesRepo.getAll();
    res.send(grades);
  } catch (err) {
    next(err);
  }
});

router.get(["/:id"], async (req, res, next) => {
  try {
    const grade = await gradesRepo.get(parseInt(req.params.id));

    if (grade === undefined)
      res.status(404).send({ error: "grade nao encontrada" });
    else res.send(grade);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const result = await gradesRepo.remove(parseInt(req.params.id));

    res.status(200).send("grade excluida com sucesso");
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    res.send(await gradesRepo.update(req.body));
  } catch (err) {
    next(err);
  }
});

router.patch("/updateNota", async (req, res, next) => {
  try {
    res.send(await gradesRepo.updateNota(req.body));
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send({ error: err.message });
});

export default router;
