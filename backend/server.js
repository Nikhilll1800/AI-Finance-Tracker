import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cron from 'node-cron';
import transactionRoutes from './routes/transaction.routes.js';
import authRoutes from './routes/auth.routes.js';
const app=express();
dotenv.config();


const PORT=process.env.PORT; 
app.use(express.json());

app.use('/api/transactions',transactionRoutes)
app.use('/api/auth',authRoutes);
// app.listen(Port,()=>{
//     console.log('listening on port',Port);
// }); 
 
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('connected to mongodb');
    app.listen(PORT,()=>{
        console.log('Server running on port', PORT );
        });
    })
.catch((error)=>{
    console.error('Mongodb Connection Error',error);
    process.exit(1);
});