const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const envar = require("dotenv/config");
const authJwt = require("./middleware/jwt");
const errorHandler = require("./middleware/errorHandler");

//router
const prodcutsRouter = require("./routers/productRoute");
const categoryRouter = require("./routers/categoryrouter");
const userRouter = require("./routers/userRouter");
const app = express();

//middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt);
app.use(errorHandler);

// path of the routes
app.use("/api/v1/product", prodcutsRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/user", userRouter);

//Database
const db_URL =
  "mongodb+srv://bugg:hellobugg@cluster0.jf5ns.mongodb.net/eshop-db?retryWrites=true&w=majority";
// make asyn function to connect BD and server
const Dbconnection = async () => {
  try {
    await mongoose.connect(db_URL, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db conected");
  } catch (error) {
    console.log(error);
  }
};
Dbconnection();

//serverr
app.listen(3000, () => console.log("server port 3000"));
