import mongoose from "mongoose";

const BillSchema = mongoose.Schema(
  {
    telegram_id: {
      type: String,
      required: true,
      index: { unique: true },
    },
    billInfo: {
      type: Map,
      of: mongoose.Decimal128,
    },
    timeBought: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bill", BillSchema);

export { Bill };
