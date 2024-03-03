const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const routes = require('./routes/routes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ['https://airbnb-zenbogdan.netlify.app', 'http://localhost:5173'],
  })
);

mongoose.connect(process.env.MONGO_URL);

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT);
