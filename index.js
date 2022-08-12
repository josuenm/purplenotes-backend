require("./src/config/database");
require("dotenv/config");
const express = require("express");
const path = require("path");
const usersRouter = require("./src/routes/users.js");
const notesRouter = require("./src/routes/notes.js");
const cors = require("cors");

const __dirname = path.resolve();
const app = express();

const CORS_URL = process.env.CORS_URL;

app.use(express.json());

app.use(
  cors({
    credentials: false,
    origin: CORS_URL,
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(process.env.PORT || 8080, console.log("Server is running! 🚀"));
