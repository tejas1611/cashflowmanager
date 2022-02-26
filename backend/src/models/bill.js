import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", BillSchema);

export { Bill };
