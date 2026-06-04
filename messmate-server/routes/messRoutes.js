const fs = require("fs");
const path = require("path");

function handleMessRoutes(req, res) {
  const url = req.url;
  const method = req.method;

  const dataPath = path.join(__dirname, "../data/messes.json");

  // CORS Header
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Health Route
  if (url === "/health" && method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(
      JSON.stringify({
        status: "ok",
      })
    );
  }

  // GET /messes
  if (url === "/messes" && method === "GET") {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({
            message: "Server Error",
          })
        );
      }

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.end(data);
    });
  }

  // GET /messes/:id
  else if (url.startsWith("/messes/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);

    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });

        return res.end(
          JSON.stringify({
            message: "Server Error",
          })
        );
      }

      const messes = JSON.parse(data);

      const mess = messes.find((m) => m.id === id);

      if (mess) {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });

        res.end(JSON.stringify(mess));
      } else {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message: "Mess not found",
          })
        );
      }
    });
  }

  // Invalid Route
  else {
    res.writeHead(404, {
      "Content-Type": "application/json",
    });

    res.end(
      JSON.stringify({
        message: "Invalid Route",
      })
    );
  }
}

module.exports = handleMessRoutes;