import express from "express";
import {
  addBillRecord,
  getBillByInvoiceID,
  getBillsByTelegramID,
  getBillsByTelegramIDAndCategory,
} from "../controller/billController";

const router = express.Router();

router.post("/addBill", addBillRecord);
router.get("/getBillByInvoiceID", getBillByInvoiceID);
router.get("/getBillsByTelegramID", getBillsByTelegramID);
router.get("/getBillsByTelegramIDAndType", getBillsByTelegramIDAndCategory);

export default router;
