var express = require('express');
var router = express.Router();
let movies = require('../mock-data/movies');
// const cookieParser = require('cookie-parser')


router.use(express.json());
// router.use(cookieParser());

router.get('/', (req, res) => {
    const userQuery = req.query.title
    if (userQuery) {
      const movie = movies.filter(movie => movie.title.toUpperCase().includes(userQuery.toUpperCase()))
      res.status(200).send(movie);
    } else {
      res.status(200).send(movies);
    }
})

router.get('/:movieId', (req, res) => {
    const movieId = Number(req.params.movieId);
    if(movieId) {
        const movie = movies.filter(m => m.id === movieId);
        if(movie.length > 0) {
            res.status(200).send(movie);
        } else {
            res.status(404).end();
        }
    } else {
        res.status(400).end();
    }
})


router.post('/', (req, res) => {
    const newMovie = req.body;
    console.log(newMovie);
    if(Object.keys(newMovie).length > 0) {
        const { title, runtime, release_year, director } = newMovie;
        if(title && runtime && release_year && director) {
            newMovie.id = movies.length + 1;
            movies.push(newMovie);
            res.status(200).send(`${title} added with id ${newMovie.id}`);
        } else {
            res.status(400).send('Missing a key.');
        }
    } else {
        res.status(400).send('Missing new movie');
    }
})

router.delete('/:movieId', (req, res) => {
  const movieId = Number(req.params.movieId);
  if(movieId) {
      let moviesLength = movies.length
      movies = movies.filter(m => m.id !== movieId);
      if(movies.length !== moviesLength) {
          res.status(200).send('removed movie');
      } else {
          res.status(404).end();
      }
  } else {
      res.status(400).end();
  }
})

module.exports = router;