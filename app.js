const express = require('express');
const cors = require('cors');
require('dotenv').config();
const moviesRouter = require('./router/movie.js');
const errorHandler = require("./middleware/errorHandler.js");
const notFound = require("./middleware/notFound.js");


const app = express();
const port = process.env.PORT || 3000


app.use(cors({
    origin: process.env.SERVER_URL
}));

app.use(express.static('public'))
app.use(express.json())

app.use('/movies', moviesRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
});