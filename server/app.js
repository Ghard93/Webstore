import express from "express";
import mongoose, { mongo } from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors';
import productRouter from './routes/productroute.js';
import accountRouter from './routes/accountroute.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use(cors());
app.use(bodyParser.json());
app.use('/products', productRouter);
app.use('/accounts', accountRouter);

app.listen(process.env.PORT || 5000)