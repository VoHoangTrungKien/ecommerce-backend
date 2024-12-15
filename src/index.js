const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');

dotenv.config();
mongoose.set('strictQuery', false);
const app = express();
const port = process.env.PORT || 3001;

// Cấu hình CORS
app.use(cors());

// Cấu hình middleware của express
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Định tuyến
routes(app);

// Kết nối MongoDB
mongoose.connect(`${process.env.MONGO_DB}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connect Db success!');
    })
    .catch((err) => {
        console.log(err);
    });

// Khởi động server
app.listen(port, () => {
    console.log('Server is running on port:', port);
});
