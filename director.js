const { queryDatabase } = require('./connectToDb');

function getAllDirector() {
  const getAllDirectorsQuery = 'SELECT * FROM Director';
  return queryDatabase(getAllDirectorsQuery);
}


function getDirectorByID(id) {
  const directorByIdQuery = `SELECT * FROM Director WHERE id = '${id}'`;
  return queryDatabase(directorByIdQuery);
}

function addDirector(data) {
  const addDirectorQuery = `INSERT INTO Director (director_name) VALUES ('${data.director_name}');`;
  return queryDatabase(addDirectorQuery);
  // return resolve({ data: { message: `Director ${data.director_name} has been inserted in the database.` } });
}

function deleteDirector(id) {
  const deleteDirectorQuery = `DELETE FROM Director WHERE id = '${id}';`;
  return queryDatabase(deleteDirectorQuery);
   //return resolve({ data: { message: `Director with id ${id} is deleted successfully.` } });
}

function updateDirector(id, data) {
  let sqlQuery = '';
  const fieldsToBeUpdated = Object.keys(data)[0];
  sqlQuery = `UPDATE Director SET ${fieldsToBeUpdated} = '${data[fieldsToBeUpdated]}' WHERE id ='${id}';`;

  return queryDatabase(sqlQuery);
  //resolve({ data: { message: `Values of the given fields i.e. ${fieldsToBeUpdated.join(', ')} has been updated!` } });
}


module.exports = {
  getAllDirector,
  addDirector,
  getDirectorByID,
  deleteDirector,
  updateDirector,
};
