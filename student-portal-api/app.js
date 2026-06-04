const express = require("express");

const app = express();

const studentRoutes = require("./routes/studentRoutes");

const PORT = 3000;


// Middleware

app.use(express.json());


// Health Route

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok"
  });
});


// Student Routes

app.use("/students", studentRoutes);


// 404 Route

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});


app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});