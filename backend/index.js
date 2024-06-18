import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import listRoutes from './routes/list.route.js';

import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {

    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

  

const app = express();

app.use(express.json());

app.use(cookieParser()) ;

app.listen(3000, () => {
    console.log('Server is runing on port 3000');
  }
  );

  app.use('/backend/auth', authRoutes);
  app.use('/backend/user', userRoutes);
  app.use('/backend/list', listRoutes);

 

  


  app.use( (err ,req,res ,next)=>{
    const statusCode = err.statusCode || 500 ;
    const message = err.message || 'Internal Server Error' ;
    return res.status(statusCode).json({
     success: false ,
     statusCode ,
     message,
    })
  }); 
   