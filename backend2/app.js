const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const morgan = require("morgan")
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require("./helper/jwt");
const errorHandler = require("./helper/errorHandler");


app.use(cors());
app.options("*", cors());

//Read environment Variables
require("dotenv/config")
const baseLink = process.env.BASE_URL
const dbLink = process.env.SERVER_URL

//Routes
const productRouter = require("./routers/products");
const categoryRouter = require("./routers/categories");
const userRouter = require("./routers/users");
const orderRouter = require("./routers/orders");
const orderItemRouter = require("./routers/orderItems")

//Middlewares
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);
//make uploads folder a static folder
app.use("/photos/uploads", express.static(__dirname + "/photos/uploads"));

app.use(`${baseLink}/products`, productRouter);
app.use(`${baseLink}/categories`, categoryRouter);
app.use(`${baseLink}/users`, userRouter);
app.use(`${baseLink}/orders`, orderRouter);
app.use(`${baseLink}/orderItems`, orderItemRouter);






mongoose.connect(dbLink, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "E-Shop"})
.then(() => {
    console.log("CONNECTION SUCCESSFUL")
})
.catch((err) => {
    console.log(err)
});

app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}`)
})