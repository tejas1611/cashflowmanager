import { Bill } from "../models/bill";

const addBillRecord = async (req, res) => {
  try {
    console.log(req.body);
    const billInfo = {};
    for (const i in req.body.billItems) {
      billInfo[req.body.billItems[i]] = req.body.billCosts[i];
    }
    console.log(billInfo);
    const modelParams = {
      invoice_id: req.body.invoice_id,
      telegram_id: req.body.telegram_id,
      billInfo: billInfo,
      timeBought: req.body.timeBought,
      expenseType: req.body.expenseType,
      vendorName: req.body.vendorName,
      amount: req.body.amount,
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

const getBillByInvoiceID = async (req, res) => {
  try {
    Bill.find({ invoice_id: req.body.invoice_id }, function (err, bills) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }

      bills = bills.map((bill) => {
        const billInfo = {};
        for (const [key, value] of bill.billInfo.entries()) {
          billInfo[key] = parseFloat(bill.billInfo.get(key));
        }
        const amount = parseFloat(bill.amount);
        return {
          _id: bill._id,
          telegram_id: bill.telegram_id,
          billInfo: billInfo,
          timeBought: bill.timeBought,
          expenseType: bill.expenseType,
          createdAt: bill.createdAt,
          updatedAt: bill.updatedAt,
          invoice_id: bill.invoice_id,
          vendorName: bill.vendorName,
          amount: amount,
          __v: bill.__v,
        };
      });

      res.status(200).json(bills[0]);
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
          const amount = parseFloat(bill.amount);
          return {
            _id: bill._id,
            telegram_id: bill.telegram_id,
            billInfo: billInfo,
            timeBought: bill.timeBought,
            expenseType: bill.expenseType,
            createdAt: bill.createdAt,
            updatedAt: bill.updatedAt,
            invoice_id: bill.invoice_id,
            vendorName: bill.vendorName,
            amount: amount,
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

const getBillsByTelegramIDAndCategory = async (req, res) => {
  try {
    Bill.find(
      {
        telegram_id: req.body.telegram_id,
        expenseType: req.body.expenseType,
      },
      function (err, bills) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
        const amount = parseFloat(bill.amount);
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
            expenseType: bill.expenseType,
            createdAt: bill.createdAt,
            updatedAt: bill.updatedAt,
            invoice_id: bill.invoice_id,
            vendorName: bill.vendorName,
            amount: amount,
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

const getBillsForPrevWeek = async (req, res) => {
  try {
    var start = new Date();
    start.setDate(start.getDate() - 7);
    const end = new Date();
    Bill.find(
      {
        telegram_id: req.body.telegram_id,
        timeBought: {
          $gte: start,
          $lte: end,
        },
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
          const amount = parseFloat(bill.amount);
          return {
            _id: bill._id,
            telegram_id: bill.telegram_id,
            billInfo: billInfo,
            timeBought: bill.timeBought,
            expenseType: bill.expenseType,
            createdAt: bill.createdAt,
            updatedAt: bill.updatedAt,
            invoice_id: bill.invoice_id,
            vendorName: bill.vendorName,
            amount: amount,
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

export {
  addBillRecord,
  getBillByInvoiceID,
  getBillsByTelegramID,
  getBillsByTelegramIDAndCategory,
  getBillsForPrevWeek,
};
