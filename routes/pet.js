const express = require('express')
const router = express.Router()
const fs = require('fs')
const db = require("../config/db")

router.get("/", function (req, res, next) {
  const query = "SELECT * FROM petstore";
  db.all(query, (err, row) => {
    res.status(200).json(row);
  });
});

// router.get('/', function (req, res, next) {
//   const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
//   res.json(petstore)
// })

// router.get('/:petid', function (req, res, next) {
//   const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
//   const params = req.params.petid
//   for (i = 0; i < petstore.length; i++){
//   if (petstore[i][params] == petstore[i]['petId']) {
//       res.status(200).json(petstore[i])
//   }
//   else if (params > petstore.length) {
//       res.status(404).json({message: 'Pet not found'})
//   }
//   else {
//       res.status(400).json({message: 'Invalid ID supplied'})
//   }
// }
// })

router.post('/', function (req, res, next) {
  const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
  petstore.push(req.body)
  fs.writeFileSync('petstore.json', JSON.stringify(petstore, null, 2))
  res.status(201).json(req.body)
})

router.post("/create-db", function (req, res, next) {
  const query =
    "INSERT INTO petstore (petId, petName, petType) VALUES (?, ?, ?)";
  const body = req.body;
  db.run(
    query,
    [
      body.petId,
      body.petName,
      body.petType
    ],
    function (err) {
      if (err) {
        res.status(405).json({ message: "Invalid Input"});
      }
    }
  );
  res.status(201).json({ message: "Success insert new pet :)" });
});

router.get('/:petid', function (req, res, next) {
  const petstore = JSON.parse(fs.readFileSync('petstore.json', 'utf-8'))
  const params = req.params.petid
  const petId = petstore.find((petstore) => petstore.petId == params)
  if (petId) {
      res.status(200).json(petId)
  }
  else{
      res.status(404).json({message: 'Pet not found'})
  }
})

router.put("/:petid", function (req, res, next) {
  const query = "UPDATE petstore SET petType = ? WHERE petId = ?";
  const petId = req.params.petid;
  const body = req.body;
  db.run(query, [body.petType, petId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success update pet :)" });
});

router.delete("/:petid", function (req, res, next) {
  const query = "DELETE from petstore WHERE petId = ?";
  const petId = req.params.petid;

  db.run(query, [petId], function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.status(200).json({ message: "Success delete pet :(" });
});

// router.put("/:id", function (req, res, next) {
//   const query = "UPDATE pet SET name = ? WHERE id =?";
//   const petId = req.params.id;
//   const body = req.body;
//   db.run(query, [body.name, petId], function (err) {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.status(200).json({ message: "Success update new data!" });
// });

// router.delete("/:id", function (req, res, next) {
//   const query = "DELETE from pet WHERE id = ?";
//   const petId = req.params.id;

//   db.run(query, [petId], function (err) {
//     if (err) {
//       console.log(err);
//     }
//   });
//   res.status(200).json({ message: "Success delete new data!" });
// });


module.exports = router