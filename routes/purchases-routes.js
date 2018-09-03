const express = require("express");
const router = express.Router();
const purchases = require("../purchases");
const p = new purchases();

router.get("/", (req, res) => {
  p.getPurchasesList().then(
    result => {
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    },
    error => {
      res.status(404).send(JSON.stringify({}));
    }
  );

  // res.status(200).send("All purchases");
});

router.get("/:id", (req, res) => {
  p.getPurchaseById(req.params.id).then(
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
  p.addNewPurchase(req.body);
  res.status(200).send("New Purchase Added");
});

router.delete("/:id", (req, res) => {
  p.deletePurchase(req.params.id);
  res.status(200).send("Purchase Deleted");
});

module.exports = router;
