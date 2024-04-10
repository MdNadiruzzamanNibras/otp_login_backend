const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@cluster0.dmi1jwr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => console.log("Connect"))
  .catch((error) => {
    console.log("not connected", error);
  });
