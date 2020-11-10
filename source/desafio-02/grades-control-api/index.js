import express from "express";
import grades from "./routes/grades.js";
import notaTotal from "./routes/notaTotal.js";
import media from "./routes/media.js";
import topN from "./routes/topN.js";

const app = express();
app.use(express.json());

app.use("/grade", grades);
app.use("/notaTotal", notaTotal);
app.use("/media", media);
app.use("/topN", topN);

app.listen(3000, () => {
  console.log("iniciado com sucesso");
});
