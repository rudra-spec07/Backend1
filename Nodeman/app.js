const http = require("http");
const fs = require("fs");
const path = require("path");

const handlePageRoute = require("./routes/pages");
const logRequest = require("./utils/logger");

const server = http.createServer((req, res) => {

  logRequest(req.method, req.url);

  if (req.url === "/students") {

    const filePath = path.join(
      __dirname,
      "data",
      "students.json"
    );

    fs.readFile(filePath, "utf8", (err, data) => {

      if (err) {
        res.writeHead(500);
        res.end("Error Reading Data");
        return;
      }

      res.writeHead(200, {
        "Content-Type": "application/json"
      });

      res.end(data);

    });

    return;
  }

  handlePageRoute(req.url, res);
});

server.listen(3000, () => {
  console.log(
    "Server running at http://localhost:3000"
  );
});