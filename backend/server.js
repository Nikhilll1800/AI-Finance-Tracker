import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cron from 'node-cron';

// import routes
import authRoutes from './routes/auth.routes.js';
import transactionRoutes from './routes/transaction.routes.js';
import budgetRoutes from './routes/budgets.routes.js';
import savingsGoalRoutes from './routes/savingsGoal.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import aiRoutes from './routes/ai.routes.js';
import notificationRoutes from './routes/notification.routes.js';


// Import services
import { checkBudgetAlerts } from './services/notification.service.js';

dotenv.config();
const app=express();
const PORT=process.env.PORT || 5000; 

app.use(cors({
    origin:process.env.Frontend_port || 'http://localhost:5173',
    Credential:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/transactions',transactionRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/savings-goals', savingsGoalRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

cron.schedule('0 * * * *', async ()=>{
    console.log("running budget check alert");
    await checkBudgetAlerts();
});



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to Mongodb');
    app.listen(PORT,()=>{
        console.log('Server running on port', PORT );
        });
    })
.catch((error)=>{
    console.error('Mongodb Connection Error',error);
    process.exit(1);
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});