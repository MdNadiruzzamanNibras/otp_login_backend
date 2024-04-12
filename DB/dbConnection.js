const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dmi1jwr.mongodb.net/OTP?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Connect db"))
  .catch((error) => {
    console.log("not connected", `mongoose error:${error}`);
  });
