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


const createMovieQuery = 'CREATE TABLE Movie(id  INT PRIMARY KEY AUTO_INCREMENT, title VARCHAR(200), description VARCHAR(300),' +
                            'runtime INT, genre varchar(100), rating FLOAT, metascore varchar(10), votes INT, ' + 
                            'gross_earning_mil varchar(20), director_id INT, FOREIGN KEY (`director_id`) REFERENCES `Director`(`id`),' +
                             'actor VARCHAR(200), year YEAR(4));';

const createDirectorQuery = 'CREATE TABLE Director(id INT PRIMARY KEY AUTO_INCREMENT, director_name varchar(200));';


const insertQueryMovie = 'INSERT INTO Movie (id, title, description, runtime, genre, rating, metascore, '
                        + 'votes, gross_earning_mil, director_id, actor, year) VALUES ?';

const insertQueryDirector = 'INSERT INTO Director (director_name) VALUES ?';

const listOfDirector = [];

movieData.forEach((movie) => {
  if (listOfDirector.indexOf(movie.Director) === -1) {
    listOfDirector.push(movie.Director);
  }
});


movieData.forEach((movie) => {
  const singleMovie = [];

  fieldsMovie.forEach((field) => {
    if (field === 'Director') {
      const directorId = listOfDirector.indexOf(movie[field]) + 1;
      singleMovie.push(directorId);
    } else {
      singleMovie.push(movie[field]);
    }
  });
  movieArray.push(singleMovie);
});

const directorArray = [];

listOfDirector.forEach((director) => {
  const singleDirector = [];
  singleDirector.push(director);
  directorArray.push(singleDirector);
});

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');
    console.log('Creating tables....');
    connection.query(createDirectorQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    connection.query(createMovieQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    connection.query(insertQueryDirector, [directorArray], (err, result) => {
      if (err) throw err;
      console.log(result);
    });

    connection.query(insertQueryMovie, [movieArray], (err, result) => {
      if (err) throw err;
      console.log(result);
    });
    connection.end();
  }
});
