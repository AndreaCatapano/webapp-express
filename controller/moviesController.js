const db = require('../data/movies_db.js');
const IMAGES_URL = process.env.IMAGES_URL || '/images';

exports.getAllMovies = (req, res) => {
    const search = req.query.search;
    const params = [];
    let sql = 'SELECT * FROM movies';


    if (search) {
        sql += ` WHERE 
            title LIKE ? OR 
            director LIKE ? OR 
            genre LIKE ? OR 
            release_year LIKE ?`;
        const searchTerm = `%${search}%`;
        params.push(searchTerm, searchTerm, searchTerm, searchTerm, searchTerm);
    }

    db.query(sql, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella query', detail: err.message });
        }

        const moviesWithImages = results.map(movie => {
            if (movie.image) {
                movie.imageUrl = `${IMAGES_URL}/${movie.image}`;
            }
            return movie;
        });

        res.json(moviesWithImages);
    });
};

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

        if (movie.image) {
            movie.imageUrl = `${IMAGES_URL}/${movie.image}`;
        }

        // Seconda query: ottieni le recensioni associate al film
        db.query('SELECT * FROM reviews WHERE movie_id = ?', [id], (err, reviewResults) => {
            if (err) {
                console.error('Errore nel recupero delle recensioni:', err);
                movie.reviews = [];
                movie.reviewsError = 'Impossibile caricare le recensioni';
            } else {
                movie.reviews = reviewResults;
            }

            res.json(movie);
        });
    });
};


exports.createReview = (req, res) => {
    const { id } = req.params;
    const { name, vote, text } = req.body;

    db.query('SELECT id FROM movies WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Errore nella verifica del film', detail: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Film non trovato' });
        }

        const currentTimestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const reviewData = {
            movie_id: id,
            name: name,
            vote: vote,
            text: text,
            created_at: currentTimestamp,
            updated_at: currentTimestamp
        };

        db.query('INSERT INTO reviews SET ?', reviewData, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Errore nella creazione della recensione', detail: err.message });
            }

            reviewData.id = result.insertId;
            res.status(201).json(reviewData);
        });
    });
};