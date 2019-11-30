const { queryDatabase } = require('./connectToDb');

function getAllDirector() {
  const getAllDirectorsQuery = 'SELECT * FROM Director';
  return queryDatabase(getAllDirectorsQuery);
}


function getDirectorByID(id) {
  const directorByIdQuery = `SELECT * FROM Director WHERE director_id = '${id}'`;
  return queryDatabase(directorByIdQuery);
}

function addDirector(data) {
  const addDirectorQuery = `INSERT INTO Director (id, director_name) VALUES ('${data.director_name}');`;

  return queryDatabase(addDirectorQuery);
  // return resolve({ data: { message: `Director ${data.director_name} has been inserted in the database.` } });
}

function deleteDirector(id) {
  const deleteDirectorQuery = `DELETE FROM Director WHERE id = '${id}';`;
  return queryDatabase(deleteDirectorQuery);
    
      //return resolve({ data: { message: `Director with id ${id} is deleted successfully.` } });
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
