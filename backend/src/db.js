import mongoose from "mongoose";

const db = async (url) => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  mongoose.connect(url, connectionParams);
};

module.exports.connect = db;
