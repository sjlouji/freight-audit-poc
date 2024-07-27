/* global logger */
const fs = require('fs');
const path = require('path');
const sequelize = require('../index');

function loadModels(postgresDbMap) {
  // console.log('2a');
  const updatedPostgresDbMap = postgresDbMap;
  const modelsPath = path.join(__dirname, 'freight_audit_service');
  const basename = path.basename(module.filename);
  fs.readdirSync(`${__dirname}/${'freight_audit_service'}`)
    .filter(
      (file) => file.indexOf('.') !== 0
        && file !== basename
        && file.slice(-3) === '.js',
    )
    .forEach((file) => {
      const model = require(path.join(modelsPath, file))(updatedPostgresDbMap['freight_audit_service'], require('sequelize').DataTypes);
      updatedPostgresDbMap[model.name] = model;
      console.log(`loaded sequelize model ${model.name}`);
    });
  Object.keys(updatedPostgresDbMap).forEach((modelName) => {
    if (updatedPostgresDbMap[modelName].associate) {
      updatedPostgresDbMap[modelName].associate(updatedPostgresDbMap);
    }
  });
  return updatedPostgresDbMap;
}
module.exports = loadModels(sequelize);