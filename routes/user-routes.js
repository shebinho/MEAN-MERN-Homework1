const express = require("express");
const router = express.Router();
const users = require("../users.js");
let u = new users();

router.get("/", (req, res) => {
  u.getUsersList().then(
    result => {
      res.send(JSON.stringify(result));
    },
    error => {
      res.status(404).send(JSON.stringify({}));
    }
  );
});

router.get("/single/:id", (req, res) => {
  console.log("ID: ", req.params.id);

  u.getUserById(req.params.id).then(
    result => {
      res.send(JSON.stringify(result));
    },
    error => {
      res.status(404).send(JSON.stringify({}));
    }
  );
});

router.post("/", (req, res) => {
  u.addUser(req.body);
  console.log(u.getUsersList());
  res.send("success");
});

module.exports = router;
