function getAllMovies() {
  return new Promise((resolve, reject) => {
    const getAllquery = 'SELECT * FROM Movie';

    connection.query(getAllquery, (err, result) => {
      if (err) return reject(err);

      const movieList = [];
      for (let i = 0; i < result.length; i += 1) {
        const singleEntry = {
          movie_rank: result[i].movie_rank,
          title: result[i].title,
          description: result[i].description,
          runtime: result[i].runtime,
          genre: result[i].genre,
          rating: result[i].rating,
          metascore: result[i].metascore,
          votes: result[i].votes,
          gross_earning_mil: result[i].gross_earning_mil,
          director_id: result[i].director_id,
          actor: result[i].actor,
          year: result[i].year,
        };
        movieList.push(singleEntry);
      }
      const movies = { data: movieList };
      return resolve(movies);
    });
  });
}


function getMovieByID(id) {
  return new Promise((resolve, reject) => {
    const sqlQuery = `SELECT * FROM Movie WHERE movie_rank = '${id}'`;
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        return reject(err);
      } if (result.length === 0) {
        console.log('result', result);
        return reject(new Error(`Record not found for ${id}`));
      }
      const singleEntry = {
        movie_rank: result[0].movie_rank,
        title: result[0].title,
        description: result[0].description,
        runtime: result[0].runtime,
        genre: result[0].genre,
        rating: result[0].rating,
        metascore: result[0].metascore,
        votes: result[0].votes,
        gross_earning_mil: result[0].gross_earning_mil,
        director_id: result[0].director_id,
        actor: result[0].actor,
        year: result[0].year,
      };

      const queryData = { data: singleEntry };
      console.log(queryData);
      return resolve(queryData);
    });
  }).catch((error) => {
    console.log(error);
    const errorMessage = { data: { errorMessage: "Either resource or field doesn't exist" } };
    throw errorMessage;
  });
}

function addMovie(data) {
  const sqlQuery = 'INSERT INTO Movie (movie_rank, title, description, runtime, genre, rating, metascore, '
  + `votes, gross_earning_mil, director_id, actor, year) VALUES (${data.movie_rank}, '${data.title}', '${data.description}',`
    + `${data.runtime}, '${data.genre}', ${data.rating}, '${data.metascore}', ${data.votes}, '${data.gross_earning_mil}', `
    + `'${data.director_id}', '${data.actor}', '${data.year}');`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      return resolve(`Movie ${data.title} added successfully!`);
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