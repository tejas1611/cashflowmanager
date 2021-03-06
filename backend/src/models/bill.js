import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
  {
    invoice_id: {
      type: String,
      required: true,
      index: { unique: true },
    },
    telegram_id: {
      type: String,
      required: true,
    },
    billInfo: {
      type: Map,
      of: mongoose.Decimal128,
    },

    timeBought: {
      type: Date,
      required: true,
    },
    expenseType: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    amount: {
      type: mongoose.Decimal128,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", BillSchema);

export { Bill };
