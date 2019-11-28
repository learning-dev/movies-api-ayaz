const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});


function getAllDirector() {
  return new Promise((resolve, reject) => {
    const getAllquery = 'SELECT * FROM Director';
    connection.query(getAllquery, (err, result) => {
      if (err) reject(err);

      let directorList = [];
      for (let i = 0; i < result.length; i += 1) {
        const singleEntry = {
          director_id: result[i].director_id,
          director_name: result[i].director_name,
        };
        directorList.push(singleEntry);
      }
      const MoviesListJson = { data: directorList };
      console.log(MoviesListJson);
      return resolve(MoviesListJson);
    });
  });
}

function makeDirectorID(givenId) {
  let directorID = '';
  if (givenId.length > 1) {
    directorID = `D${givenId}`;
  } else {
    directorID = `D0${givenId}`;
  }
  return directorID;
}

function getDirectorByID(id) {
  const directorID = makeDirectorID(id);
  const sqlQuery = `SELECT * FROM Director WHERE director_id = '${directorID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      const singleDirector = {
        director_id: result[0].director_id,
        director_name: result[0].director_name,
      };
      const directorData = { data: singleDirector };
      console.log(directorData);
      return resolve(directorData);
    });
  });
}

function addDirector(data) {
  const sqlQuery = `INSERT INTO Director (director_id, director_name) VALUES ('${data.director_id}', '${data.director_name}');`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      console.log(result);
      return resolve({ data: { message: `Director ${data.director_name} has been inserted in the database.` } });
    });
  });
}

function deleteDirector(id) {
  const directorID = makeDirectorID(id);
  const sqlQuery = `DELETE FROM Director WHERE director_id = '${directorID}';`;
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      console.log('Row deleted successfully!');
      return resolve({ data: { message: `Director with id ${id} is deleted successfully.` } });
    });
  });
}

function updateDirector(id, data) {
  let sqlQuery = '';
  const fieldsToBeUpdated = Object.keys(data);
  const directorID = makeDirectorID(id);
  return new Promise((resolve, reject) => {
    fieldsToBeUpdated.forEach((field) => {
      console.log('field:', field);
      sqlQuery = `UPDATE Director SET ${field} = '${data[field]}' WHERE director_id ='${directorID}';`;
      connection.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        console.log(result);
        console.log('Value Updated!');
      });
      resolve({ data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } });
    });
  });
}

function getAllMovies() {
  return new Promise((resolve, reject) => {
    const getAllquery = 'SELECT * FROM Movie';

    connection.query(getAllquery, (err, result) => {
      if (err) return reject(err);

      let movieList = [];
      for (let i = 0; i < result.length; i += 1) {
        const singleEntry = {
          movie_rank: result[i].movie_rank,
          Title: result[i].Title,
          description: result[i].description,
          Runtime: result[i].Runtime,
          genre: result[i].genre,
          rating: result[i].rating,
          metascore: result[i].metascore,
          votes: result[i].votes,
          gross_earning_mil: result[i].gross_earning_mil,
          director_id: result[i].director_id,
          actor: result[i].actor,
          years: result[i].years,
        };
        movieList.push(singleEntry);
      }
      const movies = { data: movieList };
      //console.log(movies);
      return resolve(movies);
    });
  });
}


function getMovieByID(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM Movie WHERE movie_rank = '${id}'`;
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      const singleEntry = {
        movie_rank: result[0].movie_rank,
        Title: result[0].Title,
        description: result[0].description,
        Runtime: result[0].Runtime,
        genre: result[0].genre,
        rating: result[0].rating,
        metascore: result[0].metascore,
        votes: result[0].votes,
        gross_earning_mil: result[0].gross_earning_mil,
        director_id: result[0].director_id,
        actor: result[0].actor,
        years: result[0].years,
      };

      const queryData = { data: singleEntry };
      console.log(queryData);
      return resolve(queryData);
    });
  });
}

function addMovie(data) {
  const sqlQuery = 'INSERT INTO Movie (movie_rank, Title, description, Runtime, genre, rating, metascore, '
  + `votes, gross_earning_mil, director_id, actor, years) VALUES (${data.movie_rank}, '${data.Title}', '${data.description}',`
    + `${data.Runtime}, '${data.genre}', ${data.rating}, '${data.metascore}', ${data.votes}, '${data.gross_earning_mil}', `
    + `'${data.director_id}', '${data.actor}', '${data.years}');`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      return resolve(`Movie ${data.Title} added successfully!`);
    });
  });
}

function deleteMovie(movieRank) {
  const sqlQuery = `DELETE FROM Movie WHERE movie_rank = '${movieRank}';`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      console.log(result);
      console.log('Movie deleted successfully!');
      return resolve({ data: { message: `Movie with movie_rank ${movieRank} deleted from database.` } });
    });
  });
}

function updateMovie(id, data) {
  let sqlQuery = '';
  const fieldsToBeUpdated = Object.keys(data);
  return new Promise((resolve, reject) => {
    fieldsToBeUpdated.forEach((field) => {
      sqlQuery = `UPDATE Movie SET ${field} = '${data[field]}' WHERE movie_rank ='${id}';`;
      connection.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        console.log(result);
        console.log('Value Updated!');
      });
      resolve({ data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } });
    });
  });
}

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to DB!');
  }
});

module.exports = {
  getAllMovies,
  getMovieByID,
  addMovie,
  updateMovie,
  getAllDirector,
  addDirector,
  getDirectorByID,
  deleteMovie,
  deleteDirector,
  updateDirector,
};
