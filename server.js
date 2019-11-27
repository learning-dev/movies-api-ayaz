const express = require('express');
const app = express();
const movie = require('./index');

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
  console.log('parameter', req.params);
  const promiseObject = movie.getMovieByID(req.params.id);
  promiseObject.then((result) => {
    console.log(result);
    res.send(result);
  });
});

// app.get('/api/movies/:year/:month', (req, res) => {
//   res.send(req.params);
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`todo list RESTful API server started on ${port}`);
});
