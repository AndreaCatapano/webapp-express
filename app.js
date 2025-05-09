const express = require('express');
require('dotenv').config();
const moviesRouter = require('./router/movie.js');
const errorHandler = require("./middleware/errorHandler.js");
const notFound = require("./middleware/notFound.js");


const app = express();
const port = 3000


app.use('/movies', moviesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});