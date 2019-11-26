const mysql = require('mysql');
const movieData = require('./movies.json');


console.log(movieData.length);
console.log(typeof movieData);

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});

let movieArray = [];
const fieldsMovie = Object.keys(movieData[0]);


movieData.forEach((movie) => {
  let singleMovie = [];

  fieldsMovie.forEach((field) => {
    singleMovie.push(movie[field]);
  });

  movieArray.push(singleMovie);
});


const insertQuery = 'INSERT INTO Movie (movie_rank, Title, description, Runtime, genre, rating, metascore, votes, '
 + 'gross_earning_mil, director, actor, years) VALUES ?';

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected!');

    connection.query(insertQuery, [movieArray], (err, result, fields) => {
      if (err) throw err;
      console.log(result);
    });
  }
});

connection.end();
