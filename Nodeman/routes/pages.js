const fs = require("fs");
const path = require("path");

function handlePageRoute(url, res) {

  let filePath;
  let statusCode = 200;

  if (url === "/") {
    filePath = path.join(__dirname, "../pages/home.html");
  }

  else if (url === "/about") {
    filePath = path.join(__dirname, "../pages/about.html");
  }

  else if (url === "/contact") {
    filePath = path.join(__dirname, "../pages/contact.html");
  }

  else {
    filePath = path.join(__dirname, "../pages/404.html");
    statusCode = 404;
  }

  fs.readFile(filePath, (err, content) => {

    if (err) {
      res.writeHead(500, {
        "Content-Type": "text/plain"
      });

      res.end("Internal Server Error");
      return;
    }

    res.writeHead(statusCode, {
      "Content-Type": "text/html"
    });

    res.end(content);

  });
}

module.exports = handlePageRoute;