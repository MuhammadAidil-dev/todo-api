require('dotenv').config();

const { default: errorHandler } = require('./middleware/errorHandler');
const express = require('express');
const cors = require('cors');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');
const connectDB = require('./db');
const existUploadsMiddleware = require('./middleware/existUploadsDirMiddleware');
const app = express();
const port = 3000;

// connect to database
connectDB();

// middleware to parse json
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_ORIGIN,
    method: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// middleware untuk otomatis membuat folder uploads
app.use(existUploadsMiddleware);

// midleware handler file statis
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/todos', todoRoutes);

// handle route not found (404)
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// errorHandler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
