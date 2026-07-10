const express = require("express");

const router = express.Router();

const controller = require("../controllers/secretController");

const validateSecret = require("../middleware/validateSecret");

router.post("/", validateSecret, controller.create);

router.get("/:id", controller.get);

router.post("/:id/reveal", controller.reveal);

module.exports = router;
