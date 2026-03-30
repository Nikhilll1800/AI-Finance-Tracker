import express from 'express';
import mongoose from 'mongoose';
// import cors from 'cors';
import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import cron from 'node-cron';
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
// import budgetRoutes from './routes/budgets.routes.js';
const app=express();
dotenv.config();
 

const PORT=process.env.PORT; 
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/transactions',transactionRoutes);
// app.use('api/budgets',budgetsRoute);

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