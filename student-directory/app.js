const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Home Route
  if (req.url === "/") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("Welcome to Student Directory API");
  }

  // About Route
  else if (req.url === "/about") {
    res.writeHead(200, {
      "Content-Type": "text/plain",
    });

    res.end("This backend is built using Node.js");
  }

  // Students Route
  else if (req.url === "/students") {
    const students = fs.readFileSync("./students.json", "utf8");

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(students);
  }

  // 404 Route
  else {
    res.writeHead(404, {
      "Content-Type": "text/plain",
    });

    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});