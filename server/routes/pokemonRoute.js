const express = require("express");
const router = express.Router();

const { sendView } = require("../controls/pokemonControl");

const index = "index";

router.get("/", (req, res) => sendView(res, index));

router.get("/:id", (req, res) =>
  isNaN(req.params.id) ? res.status(404).send("OOPS") : sendView(res, index)
);

router.get("/pokemon/:id", (req, res) => sendView(res, "about"));

module.exports = router;
