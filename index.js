import express from "express";
import path from "path";
import usersRouter from "./src/routes/users.js";
import notesRouter from "./src/routes/notes.js";
import cors from "cors";
import "./src/config/database.js";
import "dotenv/config.js";

const __dirname = path.resolve();
const app = express();

const CORS_URL = process.env.CORS_URL;

app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", CORS_URL);
  next();
});
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(process.env.PORT || 8080, console.log("Server is running! 🚀"));
