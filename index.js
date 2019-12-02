
const bodyParser = require('body-parser');
const express = require('express');
const movie = require('./utils/movies.js');
const director = require('./utils/director.js');
const databaseConnection = require('./database/connectToDb.js');

const app = express();

app.use(bodyParser.json());
databaseConnection.connectToDb();

app.get('/api/movies', (req, res) => {
  const promiseObject = movie.getAllMovies();
  promiseObject.then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      throw (new Error('No data sent from table.'));
    }
  }).catch((err) => res.status(404).send({ data: { error: "Internal error! can't retrieve movies." } }));
});

app.get('/api/movies/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = movie.getMovieByID(req.params.id);
  promiseObject.then((result) => {
    console.log(result);
    if (result.data.length > 0) {
      res.status(200).send(result);
    } else {
      throw (new Error('Not found'));
    }
  }).catch((error) => {
    console.log(error);
    const errorMessage = { data: { errorMessage: `Resource with id ${req.params.id} doesn't exist` } };
    res.status(404).send(errorMessage);
  });
});

app.delete('/api/movies/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = movie.deleteMovie(req.params.id);
  promiseObject.then((result) => {
    let msg = '';
    let statusCode;
    if (result.data.affectedRows > 0) {
      msg = `Resource with id ${req.params.id} is deleted sucessfully.`;
      statusCode = 200;
    } else {
      msg = `Error: Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`;
      statusCode = 404;
    }
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});

app.post('/api/movies/', (req, res) => {
  const movieToAdd = req.body;
  console.log(movieToAdd);
  const promiseObject = movie.addMovie(movieToAdd);
  promiseObject.then((result) => {
    let msg;
    let statusCode;
    if (result && result.data.affectedRows > 0) {
      msg = `Resource have been created with id ${result.data.insertId}`;
      statusCode = 201;
    } else {
      msg = 'Error: can\'t resource. Make sure you check the fields and user previleges again or the resource already exists.';
      statusCode = 400;
    }
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  }).catch((error) => {
    console.log(error);
  });
});

app.put('/api/movies/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const movieId = req.params.id;
  const promiseObject = movie.updateMovie(movieId, fieldsToUpdate);
  let msg;
  let failedIndex;
  let statusCode;
  promiseObject.then((listOfPromsie) => {
    // Check if the movie with given id exists or not.
    listOfPromsie.forEach((result) => {
      if (result !== undefined && result.data.affectedRows === 0) {
        msg = `Error: Item with id ${req.params.id} doesn't exitst`;
        res.status(404).send({ data: { message: msg } });
      }
    });
    // if exists then all the fields exists in the table.
    const falseFields = listOfPromsie.some((result) => {
      if (result === undefined) {
        failedIndex = listOfPromsie.indexOf(result);
      }
      return result === undefined;
    });
    const listOfFields = Object.keys(fieldsToUpdate);
    // if given fields are incorrect then show err or else show a success message.
    if (falseFields) {
      msg = `Error: field '${listOfFields[failedIndex]}' is incorrect. Please check the field name again.`;
      statusCode = 400;
    } else {
      msg = `All the fields i.e. ${listOfFields.join(', ')} are updated successfully`;
      statusCode = 200;
    }
  }).catch((err) => {
    console.log(err);
  }).finally(() => res.status(statusCode).send({ data: { message: msg } }));
});


app.get('/api/directors', (req, res) => {
  const promiseObject = director.getAllDirector();
  promiseObject.then((result) => {
    if (result) {
      res.status(200).send(result);
    } else {
      throw (new Error('No data sent from table.'));
    }
  }).catch((err) => {
    console.log(err);
    res.status(404).send({ data: { error: "Internal error! can't retrieve Directors." } });
  });
});

app.get('/api/directors/:id', (req, res) => {
  console.log(req.params.id);
  const promiseObject = director.getDirectorByID(req.params.id);
  promiseObject.then((result) => {
    console.log(result);
    if (result.data.length > 0) {
      res.status(200).send(result);
    } else {
      throw (new Error('Not found'));
    }
  }).catch((error) => {
    console.log(error);
    const errorMessage = { data: { errorMessage: `Resource with id ${req.params.id} doesn't exist` } };
    res.status(404).send(errorMessage);
  });
});

app.post('/api/directors/', (req, res) => {
  const directorToAdd = req.body;
  console.log(directorToAdd);
  const promiseObject = director.addDirector(directorToAdd);
  promiseObject.then((result) => {
    let msg;
    let statusCode;
    if (result && result.data.affectedRows > 0) {
      msg = `Resource have been created with id ${result.data.insertId}`;
      statusCode = 201;
    } else {
      msg = 'Error: can\'t resource. Make sure you check the fields and user previleges again or the resource already exists.';
      statusCode = 400;
    }
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  }).catch((error) => {
    console.log(error);
  });
});

app.delete('/api/directors/:id', (req, res) => {
  const promiseObject = director.deleteDirector(req.params.id);
  promiseObject.then((result) => {
    let msg = '';
    let statusCode;
    if (result.data.affectedRows > 0) {
      msg = `Resource with id ${req.params.id} is deleted sucessfully.`;
      statusCode = 200;
    } else {
      msg = `Error: Can't delete the resource with id ${req.params.id}. Either is moved or doesn't exist.`;
      statusCode = 404;
    }
    const resultJson = { data: { message: msg } };
    res.status(statusCode).send(resultJson);
  });
});


app.put('/api/directors/:id', (req, res) => {
  const fieldsToUpdate = req.body;
  const directorId = req.params.id;
  console.log(fieldsToUpdate);
  console.log(directorId);
  let msg;
  let statusCode;
  const promiseObject = director.updateDirector(directorId, fieldsToUpdate);
  promiseObject.then((result) => {
    if (result !== undefined && result.data.affectedRows === 0) {
      msg = `Error: Item with id ${req.params.id} doesn't exitst`;
      res.status(404).send({ data: { message: msg } });
    }
    const field = Object.keys(fieldsToUpdate)[0];
    if (result === undefined) {
      msg = `Error: field '${field}' is incorrect. Please check the field name again`;
      statusCode = 400;
    } else {
      msg = `All the fields i.e. ${field} are updated successfully`;
      statusCode = 200;
    }
  }).catch((error) => {
    console.log(error);
  }).finally(() => res.status(statusCode).send({ data: { message: msg } }));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Movie and Director RESTful API server started on ${port}`);
});
