const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
require("./DB/dbConnection");
const userRouter = require("./router/userRouter");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
