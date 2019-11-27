const mysql = require('mysql');
const movieData = require('./movies.json');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});

let movieArray = [];
const fieldsMovie = Object.keys(movieData[0]);
let directorArray = [];
let directorCount = 1;


const insertQueryMovie = 'INSERT INTO Movie (movie_rank, Title, description, Runtime, genre, rating, metascore, '
                        + 'votes, gross_earning_mil, director_id, actor, years) VALUES ?';

const insertQueryDirector = 'INSERT INTO Director (director_id, director_name) VALUES ?';


movieData.forEach((movie) => {
  let singleMovie = [];

  fieldsMovie.forEach((field) => {
    if (field === 'Director') {
      let director = movie[field];
      let directorId;
      if (directorCount.toString().length === 1) {
        directorId = `D0${directorCount.toString()}`;
      } else {
        directorId = `D${directorCount.toString()}`;
      }
      singleMovie.push(directorId);
      if (directorArray.indexOf([directorId, director]) === -1) {
        directorArray.push([directorId, director]);
        directorCount += 1;
      }
    } else {
      singleMovie.push(movie[field]);
    }
  });
  movieArray.push(singleMovie);
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');

    connection.query(insertQueryDirector, [directorArray], (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    });

    connection.query(insertQueryMovie, [movieArray], (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    });
    connection.end();
  }
});

