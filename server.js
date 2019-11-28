// implement .catch and send 404 error when you don't find something.

const express = require('express');
const movie = require('./index');

const app = express();


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

app.delete('/api/directors/:id', (req, res) => {
  const promiseObject = movie.deleteDirector(req.params.id);
  promiseObject.then((result) => res.send(result));
});

app.put('/api/directors/:id', (req, res) => {

});
// app.post('api/directors/', (req, res) => {

// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`todo list RESTful API server started on ${port}`);
});
