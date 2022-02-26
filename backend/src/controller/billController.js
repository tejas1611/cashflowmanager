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

const getBillsByTelegramID = async (req, res) => {
  try {
    Bill.find(
      {
        telegram_id: req.body.telegram_id,
      },
      function (err, bills) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }

        bills = bills.map((bill) => {
          const billInfo = {};
          for (const [key, value] of bill.billInfo.entries()) {
            billInfo[key] = parseFloat(bill.billInfo.get(key));
          }
          return {
            _id: bill._id,
            telegram_id: bill.telegram_id,
            billInfo: billInfo,
            timeBought: bill.timeBought,
            createdAt: bill.createdAt,
            updatedAt: bill.updatedAt,
            __v: bill.__v,
          };
        });

        res.status(200).json(bills);
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export { addBillRecord, getBillsByTelegramID };
