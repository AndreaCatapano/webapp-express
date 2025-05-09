const express = require('express');
require('dotenv').config();
const moviesRouter = require('./router/movie.js');


const app = express();
const port = process.env.DB_PORT


app.use('/movies', moviesRouter);


app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});