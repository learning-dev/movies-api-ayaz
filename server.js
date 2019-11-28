// implement .catch and send 404 error when you don't find something.
const body_parser = require('body-parser');
const express = require('express');
const movie = require('./index');

const app = express();
app.use(body_parser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/movies', (req, res) => {
  const promiseObject = movie.getAllMovies();
  promiseObject.then((result) => {
    console.log(result);
    const movies = JSON.stringify(result);
    res.send(movies);
  });
});

app.get('/api/movies/:id', (req, res) => {
  const promiseObject = movie.getMovieByID(req.params.id);
  promiseObject.then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const promiseObject = movie.deleteMovie(req.params.id);
  promiseObject.then((result) => res.send(result));
});

app.post('/api/movies/', (req, res) => {
  const movieToAdd = req.body;
  console.log(movieToAdd);
  const promiseObject = movie.addMovie(movieToAdd);
  promiseObject.then((result) => {
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });
});

app.put('/api/movies/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const movieId = req.params.id;
  console.log(fieldsToUpdate);
  console.log(movieId);
  const promiseObject = movie.updateMovie(movieId, fieldsToUpdate);
  promiseObject.then((result) => {
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });
});


app.get('/api/directors', (req, res) => {
  const promiseObject = movie.getAllDirector();
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.send(directors);
  });
});

app.get('/api/directors/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = movie.getDirectorByID(req.params.id);
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.send(directors);
  });
});

app.post('/api/directors/', (req, res) => {
  const directorToAdd = req.body;
  console.log(directorToAdd);
  const promiseObject = movie.addDirector(directorToAdd);
  promiseObject.then((result) => {
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });
});

app.delete('/api/directors/:id', (req, res) => {
  const promiseObject = movie.deleteDirector(req.params.id);
  promiseObject.then((result) => res.send(result));
});


app.put('/api/directors/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const directorId = req.params.id;
  console.log(fieldsToUpdate);
  console.log(directorId);
  const promiseObject = movie.updateDirector(directorId, fieldsToUpdate);
  promiseObject.then((result) => {
    res.send(result);
  }).catch((error) => {
    console.log(error);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`todo list RESTful API server started on ${port}`);
});
