import mongoose from 'mongoose';
import 'dotenv/config.js';
mongoose.Promise = global.Promise;

const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('Connected to mongodb!'))
  .catch((error) => console.log(error));
