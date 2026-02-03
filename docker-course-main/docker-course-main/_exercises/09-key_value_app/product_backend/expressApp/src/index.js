const express = require('express');
const bodyParser = require('body-parser');

const connectMongo = require('./db/mongo');
const healthRoute = require('./routes/health');
const productRoute = require('./routes/product');

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Middleware
 */
app.use(bodyParser.json());

/**
 * Routes
 */
app.use('/health', healthRoute);
app.use('/product', productRoute);

/**
 * Start server only after DB connects
 */
const start = async () => {
  await connectMongo();

  app.listen(PORT, () => {
    console.log(`Service running on port ${PORT}`);
  });
};

start();
