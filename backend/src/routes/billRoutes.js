import express from "express";
import { addBillRecord } from "../controller/billController";

const router = express.Router();

router.post("/addBill", addBillRecord);

export default router;
