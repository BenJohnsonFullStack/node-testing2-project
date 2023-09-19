const express = require("express");
const Pet = require("./pets-model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  await Pet.get()
    .then((pets) => {
      res.json(pets);
    })
    .catch(next);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Pet.getById(id)
    .then((pet) => {
      if (!pet) {
        next({ status: 404, message: "Pet not found" });
      } else {
        res.json(pet);
      }
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  await Pet.insert(req.body)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch(next);
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Pet.change(id, req.body)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch(next);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  await Pet.remove(id)
    .then((result) => {
      res.status(204).json(result);
    })
    .catch(next);
});

module.exports = router;
