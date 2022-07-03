const express = require('express')
const router = express.Router()
const fs = require('fs')


router.post('/', function (req, res, next) {
  const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
  petstore.push(req.body)
  fs.writeFileSync('products.json', JSON.stringify(petstore, null, 2))
  res.status(201).json(req.body)
})

router.get('/:id', function (req, res, next) {
  const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
  const params = req.params.id
  if (petstore[params]) {
      res.status(200).json(petstore[params])
  }
  else {
      res.status(404).json({message: 'Data Not Found'})
  }
})

router.put("/:id", function (req, res, next) {
  const query = "UPDATE pet SET name = ? WHERE id =?";
  const petId = req.params.id;
  const body = req.body;
  db.run(query, [body.name, petId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success update new data!" });
});

router.delete("/:id", function (req, res, next) {
  const query = "DELETE from pet WHERE id = ?";
  const petId = req.params.id;

  db.run(query, [petId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success delete new data!" });
});

module.exports = router