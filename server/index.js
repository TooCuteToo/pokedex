const http = require("http");
const express = require("express");

const cors = require("cors");
const router = require("./routes/pokemonRoute");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(router);

app.set("view engine", "ejs");
app.use(express.static("./views"));

server.listen(process.env.PORT || 5000);
