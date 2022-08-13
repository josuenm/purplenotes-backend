require("./src/config/database");
require("dotenv/config");
const express = require("express");
const usersRouter = require("./src/routes/users.js");
const notesRouter = require("./src/routes/notes.js");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(process.env.PORT || 8080, console.log("Server is running! 🚀"));
