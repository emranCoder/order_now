const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');
const db = require('./config/db');
const user = require('./router/User');
const { errorHandler, notFoundError } = require('./middleware/error_handler');



const app = express()
dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())


app.use('/user', user);


app.use(notFoundError);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port http://localhost:${process.env.PORT}`);
    db();
});
