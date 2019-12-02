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
}

function deleteDirector(id) {
  const deleteDirectorQuery = `DELETE FROM Director WHERE id = '${id}';`;
  return queryDatabase(deleteDirectorQuery);
}

function updateDirector(id, data) {
  let sqlQuery = '';
  const fieldsToBeUpdated = Object.keys(data)[0];
  sqlQuery = `UPDATE Director SET ${fieldsToBeUpdated} = '${data[fieldsToBeUpdated]}' WHERE id ='${id}';`;

  return queryDatabase(sqlQuery);
}


module.exports = {
  getAllDirector,
  addDirector,
  getDirectorByID,
  deleteDirector,
  updateDirector,
};
