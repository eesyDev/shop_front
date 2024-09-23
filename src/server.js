const cors = require('cors');
// server.js
const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],  }
}));

app.use(express.json()); // Middleware для парсинга JSON

// Подключение роутов
const stripeRoutes = require('./api/stripe');
app.use('/api/stripe', stripeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
