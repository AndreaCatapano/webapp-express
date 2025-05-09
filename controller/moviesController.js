const db = require('../data/movies_db.js');

// GET: tutti i post
exports.getAllMovies = (req, res) => {
    db.query('SELECT * FROM movies', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query' });
        }
        res.json(results);
    });
};

// GET: un singolo post per ID
exports.showMovie = (req, res) => {
    const { id } = req.params;

    db.query('SELECT * FROM movies WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Post non trovato' });
        }

        res.json(results[0]);
    });
};