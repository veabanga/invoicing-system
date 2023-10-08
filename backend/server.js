import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from "./middleware/errorMIddleware.js";


dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.get('/', (req,res) => {
    res.send('API running');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(port, () => { console.log(`Server running on port ${port}`) });