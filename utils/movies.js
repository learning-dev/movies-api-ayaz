const { queryDatabase } = require('../database/connectToDb.js');

function getAllMovies() {
  const getAllMoviesQuery = 'SELECT * FROM Movies';
  return queryDatabase(getAllMoviesQuery);
}


function getMovieByID(id) {
  const movieByIdQuery = `SELECT * FROM Movie WHERE id = '${id}'`;
  return queryDatabase(movieByIdQuery);
}

function addMovie(data) {
  const addMovieQuery = 'INSERT INTO Movie (id, title, description, runtime, genre, rating, metascore, '
  + `votes, gross_earning_mil, director_id, actor, year) VALUES (${data.id}, '${data.title}', '${data.description}',`
    + `${data.runtime}, '${data.genre}', ${data.rating}, '${data.metascore}', ${data.votes}, '${data.gross_earning_mil}', `
    + `'${data.director_id}', '${data.actor}', '${data.year}');`;

  return queryDatabase(addMovieQuery);
}

function deleteMovie(id) {
  const deleteMovieQuery = `DELETE FROM Movie WHERE id = '${id}';`;
  return queryDatabase(deleteMovieQuery);
}

function updateMovie(id, data) {
  const fieldsToBeUpdated = Object.keys(data);
  let results = [];
  fieldsToBeUpdated.forEach((field) => {
    const fieldUpdateQuery = `UPDATE Movie SET ${field} = '${data[field]}' WHERE id ='${id}';`;
    results.push(queryDatabase(fieldUpdateQuery));
  });
  return Promise.all(results);
}

module.exports = {
  getAllMovies,
  getMovieByID,
  addMovie,
  updateMovie,
  deleteMovie,
};
