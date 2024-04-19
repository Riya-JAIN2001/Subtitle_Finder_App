const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;

const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/utube", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "utube.html"));
});

app.get("/hollywood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "hollywood.html"));
});

app.get("/bollywood", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "bollywood.html"));
});

app.get("/kdrama", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "kdrama.html"));
});

module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
