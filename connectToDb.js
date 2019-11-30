const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
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
    return (err);
  });
}

module.exports = {
  queryDatabase,
  connectToDb,
};
