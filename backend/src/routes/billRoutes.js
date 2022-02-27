import express from "express";
import {
  addBillRecord,
  getBillByInvoiceID,
  getBillsByTelegramID,
  getBillsByTelegramIDAndCategory,
  getBillsForPrevWeek,
} from "../controller/billController";

const router = express.Router();

router.post("/addBill", addBillRecord);
router.get("/getBillByInvoiceID", getBillByInvoiceID);
router.get("/getBillsByTelegramID", getBillsByTelegramID);
router.get("/getBillsByTelegramIDAndType", getBillsByTelegramIDAndCategory);
router.get("/getExpensesReport", getBillsForPrevWeek);

export default router;
