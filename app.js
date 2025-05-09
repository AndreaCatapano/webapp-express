const express = require('express');
const moviesRouter = require('./router/movie.js');


const app = express();
const port = 3000;


app.use('/movies', moviesRouter);


app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});