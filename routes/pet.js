const express = require("express");
const router = express.Router();
const db = require("../config/db");
const ControllerUsers = require('../controllers/controllerUsers')
const jwt = require('jsonwebtoken')

router.post('/', function (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    res.status(401).json({ message: 'Unauthorized'})
  }

  const token = req.headers.authorization
  const verifyToken = jwt.verify(token, 'shhhhh')
  
  if (verifyToken) {
    next()
  }
  res.status(401).json({ message: 'Unauthorized'})
}, ControllerUsers.createUser)

router.post('/login', ControllerUsers.login)

router.post("/", function (req, res, next) {
  const body = req.body;
  db.run(query, [body.id, body.name], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(201).json({ message: "Success create new data!" });
});

router.get("/", function (req, res, next) {
  const query = "SELECT * FROM users";
  db.all(query, (err, row) => {
    res.status(200).json(row);
  });
});

router.put("/:id", function (req, res, next) {
  const query = "UPDATE users SET name = ? WHERE id =?";
  const userId = req.params.id;
  const body = req.body;
  db.run(query, [body.name, userId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success update new data!" });
});

router.delete("/:id", function (req, res, next) {
  const query = "DELETE from users WHERE id = ?";
  const userId = req.params.id;

  db.run(query, [userId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success delete new data!" });
});

module.exports = router;