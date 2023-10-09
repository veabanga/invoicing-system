import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";


dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.get('/', (req,res) => {
    res.send('API running');
});

//body parser middleware - inbuilt express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`Server running on port ${port}`) });