const { queryDatabase } = require('./connectToDb.js');

function getAllMovies() {
  const getAllMoviesQuery = 'SELECT * FROM Movie';
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
  //return resolve(`Movie ${data.title} added successfully!`);
}

function deleteMovie(id) {
  const deleteMovieQuery = `DELETE FROM Movie WHERE id = '${id}';`;
  return queryDatabase(deleteMovieQuery);
  //return resolve({ data: { message: `Movie with id ${id} deleted from database.` } });

}
function updateMovie(id, data) {
  const fieldsToBeUpdated = Object.keys(data);
  let errFlag = 0;
  let errMsg = '';
  let results;
  fieldsToBeUpdated.forEach((field) => {
    const fieldUpdateQuery = `UPDATE Movie SET ${field} = '${data[field]}' WHERE id ='${id}';`;
    results = queryDatabase(fieldUpdateQuery);
    results.catch((err) => {
      console.log(err);
      errFlag = 1;
      errMsg = { data: { message: `error: Unable to update field ${field}` } };
    });
  });
  return { data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } };
}

module.exports = {
  getAllMovies,
  getMovieByID,
  addMovie,
  updateMovie,
  deleteMovie,
};
