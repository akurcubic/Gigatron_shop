import express from 'express';
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.mjs';
import categoryRouter from './routes/categoryRouter.mjs';
import brandRouter from './routes/brandRouter.mjs';
import userRouter from './routes/userRouter.mjs';
import session from 'express-session';
import passport from 'passport';
import MongoStore  from 'connect-mongo';
import cors from 'cors';


import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//omogucava mi da dohvatam slike sa servera
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(cors({
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(express.json());

mongoose.connect("mongodb://localhost/shop_database")
  .then(() => console.log("Connected to DataBase"))
  .catch((err) => console.log(err));

app.use(cookieParser());  

app.use(session({
  secret: '24092002',
  saveUninitialized: false,
  resave: true,
  cookie: {
    maxAge: 60000 * 60,
  },
  store: MongoStore.create({
    client: mongoose.connection.getClient()
  })

}));

//obazveno posle sesije a pre ruta 
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/brands', brandRouter);
app.use('/api/users', userRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Slusam na portu!");
});
