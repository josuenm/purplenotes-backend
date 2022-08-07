import express from "express";
import path from "path";
import usersRouter from "./src/routes/users.js";
import notesRouter from "./src/routes/notes.js";
import "./src/config/database.js";
import "dotenv/config.js";

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const cors = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
};

app.use("/users", cors, usersRouter);
app.use("/notes", cors, notesRouter);

app.listen(process.env.PORT || 8080, console.log("Server is running! 🚀"));
