import { Router } from "express";
import EstacaoController from "../Controller/EstacaoController.js";

const router = Router();

router.get("/", EstacaoController.EstacaoVendas);

export default router;
