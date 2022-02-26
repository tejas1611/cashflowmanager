import { Bill } from "../models/bill";

const addBillRecord = async (req, res) => {
  try {
    const billInfo = {};
    for (const i in req.body.billItems) {
      billInfo[req.body.billItems[i]] = req.body.billCosts[i];
    }
    console.log(billInfo);
    const modelParams = {
      telegram_id: req.body.telegram_id,
      billInfo: billInfo,
      timeBought: req.body.timeBought,
    };
    console.log(modelParams);
    const bill = new Bill(modelParams);
    bill.save().then(async (savedBill) => {
      console.log(savedBill);
      res.status(200).json({ bill: savedBill });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export { addBillRecord };
