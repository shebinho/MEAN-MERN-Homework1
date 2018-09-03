const express = require("express");
const app = express();
const userRoutes = require("./routes/user-routes.js");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/products-routes");
const purchaseRoutes = require("./routes/purchases-routes");

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/purchases", purchaseRoutes);

app.all("**", (req, res) => {
  res.status(412).send("Not allowed");
});

app.listen(3001);
