const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  const ext = path.extname(filePath);

  let contentType = "text/html";

  switch (ext) {
    case ".css":
      contentType = "text/css";
      break;

    case ".js":
      contentType = "text/javascript";
      break;

    case ".png":
      contentType = "image/png";
      break;

    case ".jpg":
    case ".jpeg":
      contentType = "image/jpeg";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (error, data) => {
            res.writeHead(404, {
              "Content-Type": "text/html",
            });

            res.end(data);
          }
        );
      } else {
        res.writeHead(500);
        res.end("Internal Server Error");
      }
    } else {
      res.writeHead(200, {
        "Content-Type": contentType,
      });

      res.end(content);
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});