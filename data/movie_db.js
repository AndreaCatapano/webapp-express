const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '081274727Asd',
    database: 'dm_movie',
});

connection.connect(err => {
    if (err) {
        console.error('Errore di connessione al database:', err.message);
        return;
    }
    console.log('Connesso al database con successo!');
});

module.exports = connection;
