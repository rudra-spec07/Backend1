const http = require("http");
const handleMessRoutes = require("./routes/messRoutes");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  handleMessRoutes(req, res);
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(
    `MessMate Server running at http://localhost:${PORT}`
  );
});