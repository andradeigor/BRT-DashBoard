import express from "express";
import cors from "cors";
import EstacaoRouter from "./router/Estacao.js";
const app = express();
app.use(cors());

app.use(express.json());
app.use("/estacao", EstacaoRouter);
app.listen(8000, () => {
  console.log("🔥 Hi, I'm running at http://localhost:3000/ 🔥");
});
