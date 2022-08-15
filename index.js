require("./src/config/database");
require("dotenv/config");
const express = require("express");
const usersRouter = require("./src/routes/users.js");
const notesRouter = require("./src/routes/notes.js");
const cors = require("cors");

const app = express();

const CORS_URL = process.env.CORS_URL;

app.use(express.json());

app.use(
  cors({
    origin: CORS_URL,
  })
);

app.get("/test", (req, res) => {
  const token = req.headers["purple-notes"];

  if (token) {
    res.json({ token });
  } else {
    res.json({ token: false });
  }
});

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(process.env.PORT || 8080, console.log("Server is running! 🚀"));
