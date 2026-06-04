const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {

    console.log(`${req.method} ${req.url}`);

    let filePath;

    if (req.url === "/") {
        filePath = path.join(__dirname, "pages", "home.html");
    }

    else if (req.url === "/about") {
        filePath = path.join(__dirname, "pages", "about.html");
    }

    else if (req.url === "/contact") {
        filePath = path.join(__dirname, "pages", "contact.html");
    }

    else {
        filePath = path.join(__dirname, "pages", "404.html");

        res.writeHead(404, {
            "Content-Type": "text/html",
        });
    }

    fs.readFile(filePath, (err, content) => {

        if (err) {

            res.writeHead(500, {
                "Content-Type": "text/plain",
            });

            res.end("Internal Server Error");

            return;
        }

        if (!res.headersSent) {
            res.writeHead(200, {
                "Content-Type": "text/html",
            });
        }

        res.end(content);
    });
});

server.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});