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
  res.json("Hello from pets router GET /:id");
});

router.post("/", async (req, res, next) => {
  res.status(201).json("Hello from pets router POST /");
});

router.put("/:id", async (req, res, next) => {
  res.status(204).json("Hello from pets router PUT /:id");
});

router.delete("/:id", async (req, res, next) => {
  res.status(204).json("Hello from pets router DELETE /:id");
});

module.exports = router;
