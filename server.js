// implement .catch and send 404 error when you don't find something.
const bodyParser = require('body-parser');
const express = require('express');
const movie = require('./index');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/movies', (req, res) => {
  const promiseObject = movie.getAllMovies();
  promiseObject.then((result) => {
    console.log(result);
    const movies = JSON.stringify(result);
    res.status(200).send(movies);
  });
});

app.get('/api/movies/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = movie.getMovieByID(req.params.id);
  promiseObject.then((result) => {
    console.log(result);
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
    const errorMessage = { data: { errorMessage: `Either resource with id ${req.params.id} doesn't exist` } };
    res.status(404).send(errorMessage);
  });
});

app.delete('/api/movies/:id', (req, res) => {
  const promiseObject = movie.deleteMovie(req.params.id);
  promiseObject.then((result) => res.status(200).send(result));
});

app.post('/api/movies/', (req, res) => {
  const movieToAdd = req.body;
  console.log(movieToAdd);
  const promiseObject = movie.addMovie(movieToAdd);
  promiseObject.then((result) => {
    res.status(201).send(result);
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
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
    const errorMessage = { data: { errorMessage: "Either resource or field doesn't exist", errorDump: error } };
    res.status(404).send(errorMessage);
  });
});


app.get('/api/directors', (req, res) => {
  const promiseObject = movie.getAllDirector();
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.status(200).send(directors);
  });
});

app.get('/api/directors/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = movie.getDirectorByID(req.params.id);
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.status(200).send(directors);
  });
});

app.post('/api/directors/', (req, res) => {
  const directorToAdd = req.body;
  console.log(directorToAdd);
  const promiseObject = movie.addDirector(directorToAdd);
  promiseObject.then((result) => {
    res.status(201).send(result);
  }).catch((error) => {
    console.log(error);
  });
});

app.delete('/api/directors/:id', (req, res) => {
  const promiseObject = movie.deleteDirector(req.params.id);
  promiseObject.then((result) => res.status(200).send(result));
});


app.put('/api/directors/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const directorId = req.params.id;
  console.log(fieldsToUpdate);
  console.log(directorId);
  const promiseObject = movie.updateDirector(directorId, fieldsToUpdate);
  promiseObject.then((result) => {
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`todo list RESTful API server started on ${port}`);
});
