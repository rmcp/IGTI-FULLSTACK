"use strict";

import { promises as fs } from "fs";

const PATH_FILE = "./Arquivos/grades.json";

const add = async (grade) => {
  try {
    const arquivo = JSON.parse(await getFile());

    let newGrade = {
      id: arquivo.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date(),
    };

    arquivo.grades.push(newGrade);

    await saveFile(JSON.stringify(arquivo));

    return newGrade;
  } catch (err) {
    throw err;
  }
};

const update = async (parGrade) => {
  try {
    const arquivo = JSON.parse(await getFile());

    const index = arquivo.grades.findIndex((grade) => grade.id === parGrade.id);

    if (index === -1) throw new Error("Grade nao encontrada");

    arquivo.grades[index].student = parGrade.student;
    arquivo.grades[index].subject = parGrade.subject;
    arquivo.grades[index].type = parGrade.type;
    arquivo.grades[index].value = parGrade.value;

    saveFile(JSON.stringify(arquivo));

    return arquivo.grades[index];
  } catch (err) {
    throw err;
  }
};

const updateNota = async (parGrade) => {
  try {
    const arquivo = JSON.parse(await getFile());

    const index = arquivo.grades.findIndex((grade) => grade.id === parGrade.id);

    arquivo.grades[index].value = parGrade.value;

    saveFile(JSON.stringify(arquivo));

    return arquivo.grades[index];
  } catch (err) {
    throw err;
  }
};

const remove = async (id) => {
  const arquivo = JSON.parse(await getFile());

  arquivo.grades = arquivo.grades.filter((grade) => grade.id !== id);

  saveFile(JSON.stringify(arquivo));

  return true;
};

const get = async (id) => {
  const arquivo = JSON.parse(await getFile());

  return arquivo.grades.find((grade) => grade.id === id);
};

const getAll = async (id) => {
  const arquivo = JSON.parse(await getFile());

  return arquivo.grades;
};

const getNotaTotal = async (student, subject) => {
  const arquivo = JSON.parse(await getFile());

  const notaTotal = arquivo.grades.reduce((acum, grade) => {
    if (grade.student === student && grade.subject === subject)
      return (acum += grade.value);
    else return acum;
  }, 0);

  return notaTotal;
};

const getMedia = async (subject, type) => {
  const arquivo = JSON.parse(await getFile());

  const notaTotal = arquivo.grades.reduce((acum, grade) => {
    if (grade.subject === subject && grade.type === type)
      return (acum += grade.value);
    else return acum;
  }, 0);

  const total = arquivo.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  ).length;

  return notaTotal / total;
};

const getTopN = async (subject, type, n) => {
  const arquivo = JSON.parse(await getFile());

  const filteredGrades = arquivo.grades.filter(
    (grade) => grade.subject === subject && grade.type === type
  );

  filteredGrades.sort((a, b) => b.value - a.value);

  return filteredGrades.splice(0, n);
};

const getFile = async () => {
  return await fs.readFile(PATH_FILE);
};

const saveFile = async (content) => {
  try {
    await fs.writeFile(PATH_FILE, content);
  } catch (err) {
    throw err;
  }
};

export default {
  add,
  update,
  updateNota,
  remove,
  get,
  getAll,
  getNotaTotal,
  getMedia,
  getTopN,
};
