const mysql = require('mysql');

require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: process.env.PASSWORD,
  database: 'movies_database',
});


function connectToDb() {
  connection.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log('Connected to DB!');
    }
  });
}

function queryDatabase(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (err, result) => {
      if (err) {
        reject(err);
      } else {
        const resultJson = { data: result };
        resolve(resultJson);
      }
    });
  }).catch((err) => {
    console.log(err);
  });
}

module.exports = {
  queryDatabase,
  connectToDb,
};
