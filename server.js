const fs = require("fs");
const path = require("path");
const express = require("express");
const https = require("https");
const helmet = require("helmet");

const PORT = 3000;

const app = express();

app.use(helmet());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/secret", (req, res) => {
  return res.send("Your personal secret value is 42!");
});

https
  .createServer(
    {
      //We can pass our SSL certificate
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
