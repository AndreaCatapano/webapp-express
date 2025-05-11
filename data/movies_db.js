const mysql = require('mysql2');

require('dotenv').config();


const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(err => {
    if (err) {
        console.error('Errore di connessione al database:', err.message);
        return;
    }
    console.log('Connesso al database con successo!');
});

module.exports = connection;
