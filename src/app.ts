import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routers from './router';
import passport from 'passport';
// import mysql from './instances/mysql';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Initialize passport
app.use(passport.initialize());

// Router ALL
app.use('/api', routers);


// mysql
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });


export default app;