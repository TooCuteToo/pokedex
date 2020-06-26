const http = require("http");
const path = require("path");

const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

app.use(express.static("../client"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client", "index.html"))
);

app.get("/:id", (req, res) =>
  res.sendFile(path.join(__dirname, "../client", "index.html"))
);

app.get("/pokemon/:id", (req, res) => {
  //if (isNaN(req.params.id)) res.redirect("/pokemon/1");
  res.sendFile(path.join(__dirname, "../client", "about.html"));
});

app.use((req, res) => {
  res.status(404).send("OOPS");
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
