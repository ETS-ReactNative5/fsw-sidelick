const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, 
() => console.log('connected to db'));

// Middleware
app.use(express.json());

// Route Middlewares
// when we navigate to api/user then I wanna run this authRoute
// this means that this is always gonna have this prefix in the authRoute
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and Running'));

