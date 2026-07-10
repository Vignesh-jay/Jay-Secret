const express = require("express");

const router = express.Router();

const controller = require("../controllers/secretController");

router.post("/", controller.create);

router.get("/:id", controller.get);

module.exports = router;
