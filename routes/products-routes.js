const express = require("express");
const router = express.Router();
const products = require("../products.js");
let p = new products();

router.get("/", (req, res) => {
  p.getProductsList().then(
    result => {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    },
    error => {
      res.status(404).send(JSON.stringify({}));
    }
  );
  // res.status(200).send("All products");
});

router.get("/:id", (req, res) => {
  p.getProudctById(req.params.id).then(
    result => {
      res.send(JSON.stringify(result));
    },
    error => {
      res.status(404).send(JSON.stringify({}));
    }
  );
  //res.status(200).send("Single product");
});

router.post("/", (req, res) => {
  p.addNewProduct(req.body);
  console.log(req.body);
  res.status(200).send("New product");
});

router.delete("/:id", (req, res) => {
  p.deleteProduct(req.params.id);
  res.status(200).send("Delete product");
});

module.exports = router;
