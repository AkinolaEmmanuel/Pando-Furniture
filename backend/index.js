import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import purchaseRoutes from './routes/purchasesRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
dotenv.config();

//Middleware
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//Routes
app.get('/', (req, res) => {
    res.send('Hello World! Welcome to Pando Furniture');
});
//Users
app.use('/users', userRoutes);
//Purchases
app.use('/purchases', purchaseRoutes);
//Products
app.use('/products', productsRoutes);




mongoose.connect(process.env.MONGODB_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch((error) => {
    console.log('MongoDB connection failed: ', error.message);
});

