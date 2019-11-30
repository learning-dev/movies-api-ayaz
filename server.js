// implement .catch and send 404 error when you don't find something.
const bodyParser = require('body-parser');
const express = require('express');
const movie = require('./movies.js');
const director = require('./director.js');
const databaseConnection = require('./connectToDb.js');

const app = express();

app.use(bodyParser.json());
databaseConnection.connectToDb();

app.get('/api/movies', (req, res) => {
  const promiseObject = movie.getAllMovies();
  promiseObject.then((result) => {
    console.log(result);
    res.status(200).send(result);
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
  const result = movie.updateMovie(movieId, fieldsToUpdate);
  res.status(200).send(result);
  // }).catch((error) => {
  //   console.log(error);
  //   const errorMessage = { data: { errorMessage: "Either resource or field doesn't exist", errorDump: error } };
  //   res.status(404).send(errorMessage);
  // });
});


app.get('/api/directors', (req, res) => {
  const promiseObject = director.getAllDirector();
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.status(200).send(directors);
  });
});

app.get('/api/directors/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = director.getDirectorByID(req.params.id);
  promiseObject.then((result) => {
    const directors = JSON.stringify(result);
    res.status(200).send(directors);
  });
});

app.post('/api/directors/', (req, res) => {
  const directorToAdd = req.body;
  console.log(directorToAdd);
  const promiseObject = director.addDirector(directorToAdd);
  promiseObject.then((result) => {
    res.status(201).send(result);
  }).catch((error) => {
    console.log(error);
  });
});

app.delete('/api/directors/:id', (req, res) => {
  const promiseObject = director.deleteDirector(req.params.id);
  promiseObject.then((result) => res.status(200).send(result));
});


app.put('/api/directors/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const directorId = req.params.id;
  console.log(fieldsToUpdate);
  console.log(directorId);
  const promiseObject = director.updateDirector(directorId, fieldsToUpdate);
  promiseObject.then((result) => {
    res.status(200).send(result);
  }).catch((error) => {
    console.log(error);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Movie and Director RESTful API server started on ${port}`);
});
