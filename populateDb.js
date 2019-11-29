const mysql = require('mysql');
const movieData = require('./movies.json');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});

const movieArray = [];
const fieldsMovie = Object.keys(movieData[0]);


const insertQueryMovie = 'INSERT INTO Movie (movie_rank, title, description, runtime, genre, rating, metascore, '
                        + 'votes, gross_earning_mil, director_id, actor, year) VALUES ?';

const insertQueryDirector = 'INSERT INTO Director (director_name, director_id) VALUES ?';

const listOfDirector = [];
movieData.forEach((movie) => {
  if (listOfDirector.indexOf(movie.Director) === -1) {
    listOfDirector.push(movie.Director);
  }
});

function makeDirectorID(givenId) {
  let directorID = '';
  if (givenId.length > 1) {
    directorID = `D${givenId}`;
  } else {
    directorID = `D0${givenId}`;
  }
  return directorID;
}

let directorWithIds = {};
let directorCount  = 1;
listOfDirector.forEach((director) => {
  const directorID = makeDirectorID(directorCount.toString());
  directorWithIds[director] = directorID;
  directorCount += 1;
});


movieData.forEach((movie) => {
  const singleMovie = [];

  fieldsMovie.forEach((field) => {
    if (field === 'Director') {
      const directorId = directorWithIds[movie[field]];
      singleMovie.push(directorId);
    } else {
      singleMovie.push(movie[field]);
    }
  });
  movieArray.push(singleMovie);
});

console.log(movieArray);
const directorArray = Object.entries(directorWithIds);

console.log(directorArray);

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