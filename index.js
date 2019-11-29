const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});


function startConnection () {
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected to DB!');
    }
  });
}
