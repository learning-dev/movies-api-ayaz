function getAllDirector() {
  return new Promise((resolve, reject) => {
    const getAllquery = 'SELECT * FROM Director';
    connection.query(getAllquery, (err, result) => {
      if (err) reject(err);

      const directorList = [];
      for (let i = 0; i < result.length; i += 1) {
        const singleEntry = {
          director_id: result[i].director_id,
          director_name: result[i].director_name,
        };
        directorList.push(singleEntry);
      }
      const directorListJson = { data: directorList };
      return resolve(directorListJson);
    });
  });
}

function makeDirectorID(givenId) {
  let directorID = '';
  if (givenId.length > 1) {
    directorID = `D${givenId}`;
  } else {
    directorID = `D0${givenId}`;
  }
  return directorID;
}

function getDirectorByID(id) {
  const directorID = makeDirectorID(id);
  const sqlQuery = `SELECT * FROM Director WHERE director_id = '${directorID}'`;
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      const singleDirector = {
        director_id: result[0].director_id,
        director_name: result[0].director_name,
      };
      const directorData = { data: singleDirector };
      console.log(directorData);
      return resolve(directorData);
    });
  });
}

function addDirector(data) {
  const sqlQuery = `INSERT INTO Director (director_id, director_name) VALUES ('${data.director_id}', '${data.director_name}');`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      console.log(result);
      return resolve({ data: { message: `Director ${data.director_name} has been inserted in the database.` } });
    });
  });
}

function deleteDirector(id) {
  const directorID = makeDirectorID(id);
  const sqlQuery = `DELETE FROM Director WHERE director_id = '${directorID}';`;
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);
      console.log(result);
      console.log('Row deleted successfully!');
      return resolve({ data: { message: `Director with id ${id} is deleted successfully.` } });
    });
  });
}

function updateDirector(id, data) {
  let sqlQuery = '';
  const fieldsToBeUpdated = Object.keys(data);
  const directorID = makeDirectorID(id);
  return new Promise((resolve, reject) => {
    fieldsToBeUpdated.forEach((field) => {
      console.log('field:', field);
      sqlQuery = `UPDATE Director SET ${field} = '${data[field]}' WHERE director_id ='${directorID}';`;
      connection.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        console.log(result);
        console.log('Value Updated!');
      });
    });
    resolve({ data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } });
  });
}