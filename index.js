const express = require("express");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const createError = require("http-errors");
const app = express();
const PORT = process.env.PORT || 3000;
const usersRoutes = require("./scr/routes/customer");
const partnerRoutes = require("./scr/routes/partner");
const productRoutes = require("./scr/routes/product");

//Connection to dataase
require("./scr/configs/database");

//Middleware
app.use(morgan(":method :url :status :response-time ms"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.status(200).json("App is running");
});

app.use("/users", usersRoutes);
app.use("/partners", partnerRoutes);
app.use("/products", productRoutes);
//Error handler
app.use((req, res, next) => {
  next(createError.NotFound("Page Not Found"));
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    message: err.message || "Internal Server Error",
    data: null,
    success: false,
  });
});

app.listen(PORT, (err) => {
  if (err) console.log("Internal Server Error");
  console.log(`Listen on ${PORT}`);
});
