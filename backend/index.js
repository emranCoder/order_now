const express = require('express');
var cors = require('cors')
const path = require('path');
const db = require('./config/db');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const staffAuthRoutes = require('./routes/staffAuth');
const loginRoutes = require('./routes/login');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/Category');
const orderRoutes = require('./routes/Order');
const verifyRoutes = require('./routes/Verify');
const { errorHandler, notFoundError } = require('./middleware/error_handler');


const app = express()
dotenv.config();

const options = {
    "Access-Control-Allow-Origin": `http://localhost:${process.env.PORT}/`,
    origin: '*',
    methods: '*',
    allowedHeaders: '*'
}




app.use('/avatar', express.static(path.join(__dirname, '/public/uploads/avatars')));
app.use('/products/img', express.static(path.join(__dirname, '/public/uploads/products')));
app.use('/staff/img', express.static(path.join(__dirname, '/public/uploads/staffs')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));

app.use('/api/auth', authRoutes);
app.use('/api/staff/auth', staffAuthRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/product', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/verify', verifyRoutes);






app.use(notFoundError);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`);
    db();
});
