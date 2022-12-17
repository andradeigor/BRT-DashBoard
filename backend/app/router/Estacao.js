import { Router } from "express";
import EstacaoController from "../Controller/EstacaoController.js";

const router = Router();

router.get("/", EstacaoController.EstacaoVendas);
router.get("/total", EstacaoController.EstacaoVendasTotais);
router.get("/anos", EstacaoController.VendasAnoTotais);
router.get("/vendasValores", EstacaoController.VendaValores);
router.get("/anosEstacao", EstacaoController.EstacaoVendaAnos);
router.get("/estacoesPorBairro", EstacaoController.EstacoesPorBairo);
router.get("/vendasEstacaoPorIDH", EstacaoController.VendasEstacaoPorIDH);

export default router;
