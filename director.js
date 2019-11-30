function getAllDirector() {
  return new Promise((resolve, reject) => {
    const getAllquery = 'SELECT * FROM Director';
    connection.query(getAllquery, (err, result) => {
      if (err) reject(err);

      const directorList = [];
      for (let i = 0; i < result.length; i += 1) {
        const singleEntry = {
          id: result[i].id,
          director_name: result[i].director_name,
        };
        directorList.push(singleEntry);
      }
      const directorListJson = { data: directorList };
      return resolve(directorListJson);
    });
  });
}


function getDirectorByID(id) {
  const sqlQuery = `SELECT * FROM Director WHERE director_id = '${id}'`;
  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      const singleDirector = {
        director_id: result[0].id,
        director_name: result[0].director_name,
      };
      const directorData = { data: singleDirector };
      console.log(directorData);
      return resolve(directorData);
    });
  });
}

function addDirector(data) {
  const sqlQuery = `INSERT INTO Director (id, director_name) VALUES ('${data.id}', '${data.director_name}');`;

  return new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) reject(err);
      console.log(result);
      return resolve({ data: { message: `Director ${data.director_name} has been inserted in the database.` } });
    });
  });
}

function deleteDirector(id) {
  const sqlQuery = `DELETE FROM Director WHERE id = '${id}';`;
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
  return new Promise((resolve, reject) => {
    fieldsToBeUpdated.forEach((field) => {
      console.log('field:', field);
      sqlQuery = `UPDATE Director SET ${field} = '${data[field]}' WHERE id ='${id}';`;
      connection.query(sqlQuery, (err, result) => {
        if (err) reject(err);
        console.log(result);
        console.log('Value Updated!');
      });
    });
    resolve({ data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } });
  });
}


module.exports = {
  getAllDirector,
  addDirector,
  getDirectorByID,
  deleteDirector,
  updateDirector,
};
