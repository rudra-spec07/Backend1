const express = require("express");

const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Student Directory API");
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});