import express from "express";
import {
  addBillRecord,
  getBillsByTelegramID,
  getBillsByTelegramIDAndCategory,
} from "../controller/billController";

const router = express.Router();

router.post("/addBill", addBillRecord);
router.get("/getBillsByID", getBillsByTelegramID);
router.get("/getBillsByIDAndType", getBillsByTelegramIDAndCategory);

export default router;
