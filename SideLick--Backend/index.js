const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/auth');
const clientRoute = require('./routes/users')

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
	() => console.log("Connected to database"));

// Middleware
app.use(express.json());

// Route Middlewares
// when we navigate to api/auth then I wanna run this authRoute
// this means that this is always gonna have this prefix in the authRoute
app.use('/api/auth', authRoute);
app.use('/api/users', clientRoute);

app.listen(3000, () => console.log('Server Up and Running'));

