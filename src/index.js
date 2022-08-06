import express from 'express';
import path from 'path';
import usersRouter from './routes/users.js';
import notesRouter from './routes/notes.js';
import cors from 'cors';
import './config/database.js';
import 'dotenv/config.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/users', usersRouter);
app.use('/notes', notesRouter);

app.listen(process.env.PORT || 8080, console.log('Server is running! 🚀'));
