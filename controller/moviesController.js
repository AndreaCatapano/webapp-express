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

    // Prima query: ottieni i dettagli del film
    db.query('SELECT * FROM movies WHERE id = ?', [id], (err, movieResults) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query del film' });
        }

        if (movieResults.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const movie = movieResults[0];

        // Seconda query: ottieni le recensioni associate al film
        db.query('SELECT * FROM reviews WHERE movie_id = ?', [id], (err, reviewResults) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nella query delle recensioni' });
            }

            // Aggiungi le recensioni al film
            movie.reviews = reviewResults;

            // Invia la risposta completa
            res.json(movie);
        });
    });
};