const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ayaz',
  password: 'password',
  database: 'movies_database',
});

function getAllDirector() {
  const getAllquery = 'SELECT * FROM Director';
  connection.query(getAllquery, (err, result) => {
    if (err) throw err;

    let queryList = [];
    for (let i = 0; i < result.length; i += 1) {
      const singleEntry = {
        director_id: result[i].director_id,
        director_name: result[i].director_name,
      };
      queryList.push(singleEntry);
    }
    const queryData = { data: queryList };
    console.log(queryData);
    //return queryData;
  });
}

function getDirectorByID(id) {
  const sqlQuery = `SELECT * FROM Director WHERE director_id = '${id}'`;
  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    const singleEntry = {
      director_id: result[0].director_id,
      director_name: result[0].director_name,
    };

    const queryData = { data: singleEntry };
    console.log(queryData);
  });
}

function addDirector(data) {
  const sqlQuery = `INSERT INTO Director (director_id, director_name) VALUES ('${data.director_id}', '${data.director_name}');`;

  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
}

function deleteDirector(id) {
  const sqlQuery = `DELETE FROM Director WHERE director_id = '${id}';`;

  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log('Row deleted successfully!');
  });
}

function updateDirector(data) {
  let sqlQuery = '';

  if (data['update'].hasOwnProperty('director_name')) {
    sqlQuery = `UPDATE Director SET director_name = '${data.update.director_name}' WHERE director_id ='${data.director_id}';`;
  }
  else if (data.update.hasOwnProperty('director_id')) {
    sqlQuery = `UPDATE Director SET director_id = '${data.update.director_id}' WHERE director_id ='${data.director_id}';`;
  } else {
    console.log('No values to update!');
    return;
  }

  connection.query(sqlQuery, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log('Value Updated!');
  });
}

function getAllMovies() {
  const getAllquery = 'SELECT * FROM Movie';
  connection.query(getAllquery, (err, result) => {
    if (err) throw err;

    let queryList = [];
    //console.log(result);
    for (let i = 0; i < result.length; i += 1) {
      const singleEntry = {
        movie_rank: result[i].movie_rank,
        Title: result[i].Title,
        description: result[i].description,
        Runtime: result[i].Runtime,
        genre: result[i].genre,
        rating: result[i].rating,
        metascore: result[i].metascore,
        votes: result[i].votes,
        gross_earning_mil: result[i].gross_earning_mil,
        director_id: result[i].director_id,
        actor: result[i].actor,
        years: result[i].years,
      };
      queryList.push(singleEntry);
    }
    const queryData = { data: queryList };
    console.log(queryData);
    return queryData;
  });
}


connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('Connected to DB!');
    getAllDirector();
    getDirectorByID('D10');
    const testDirect = { director_id: 'D51', director_name: 'Tim Burton' };
    //addDirector(testDirect);
    //const valueToUpdate = { update: { director_name: 'Alfonso Cuarón' }, director_id: 'D51' };
    //updateDirector(valueToUpdate);
    deleteDirector('D51');


    // Movies part
    //getAllMovies();
  }
});
