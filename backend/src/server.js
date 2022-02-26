import express from "express";
import billRouter from "./routes/billRoutes";

require("dotenv").config();

const db = require("./db");

const app = express();

//Middlewares
app.use(express.json());
/* app.use(
  express.urlencoded({
    extended: true,
  })
); */

/* app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
}); */

app.use("/bill", billRouter);

app.get("/hello", (req, res) => {
  res.status(200).send("Hello World!");
});

const PORT = 3000;

db.connect(process.env.DB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
