const express = require('express');
const deotenv = require('dotenv');
const morgan = require('morgan');
const createError = require('http-errors');
const loginRoute = require('./routes/login');
const forgotPasswordRoutes = require('./routes/forgotPassword');
const usersRoutes = require('./routes/customer');
const partnerRoutes = require('./routes/partner');
const productRoutes = require('./routes/product');
const ticketCategorieRoutes = require('./routes/ticketCategorie');
const ticketRoutes = require('./routes/ticket');
const adminRoutes = require('./routes/admin');
const { auth } = require('./middleware/authentification');

deotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Connection to dataase
require('./configs/database/database');

//Middleware
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  res.status(200).json('App is running');
});

app.use(auth);

app.use('/login', loginRoute);
app.use('/password', forgotPasswordRoutes);
app.use('/customers', usersRoutes);
app.use('/partners', partnerRoutes);
app.use('/products', productRoutes);
app.use('/ticketCategories', ticketCategorieRoutes);
app.use('/tickets', ticketRoutes);
app.use('/admins', adminRoutes);

//Error handler
app.use((req, res, next) => {
  next(createError.NotFound('URL Not Found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Internal Server Error',
    data: null,
    success: false,
    error: err,
  });
});

app.listen(PORT, (err) => {
  if (err) console.log('Internal Server Error');
  console.log(`Listen on ${PORT}`);
});
