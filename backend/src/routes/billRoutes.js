import express from "express";
import {
  addBillRecord,
  getBillsByTelegramID,
} from "../controller/billController";

const router = express.Router();

router.post("/addBill", addBillRecord);
router.get("/getBillsByID", getBillsByTelegramID);

export default router;
