require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const secretRoutes = require("./routes/secrets");

app.use(express.json());

app.use("/api/secrets", secretRoutes);

app.use(express.static(path.join(__dirname, "../public")));

app.get("/s/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/reveal.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const config = require("./config/config");

app.listen(config.port, () => {
  console.log(`🚀 JΛY Secret running at http://localhost:${config.port}`);
});
