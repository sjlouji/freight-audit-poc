/* global logger */
const Sequelize = require('sequelize');
const cls = require('cls-hooked');
const dbConfig = require('./config');

const defaultDefines = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};
function postgresDbMapper() {
  const postgresDbMap = {};
  const dbConfigObj = dbConfig();
  const databases = Object.keys(dbConfigObj);
  for (let i = 0; i < databases.length; i += 1) {
    const database = databases[i];
    const postgresConf = dbConfigObj[database];
    postgresConf.define = defaultDefines;
    postgresConf.logging = (msg) => logger.info(msg);
    const namespace = cls.createNamespace('freight-audit-poc-service');
    Sequelize.useCLS(namespace);
    postgresDbMap[database] = new Sequelize(
      postgresConf.database,
      postgresConf.username,
      postgresConf.password,
      postgresConf,
    );
    postgresConf.logging = (msg) => logger.info(msg);
  }
  return postgresDbMap;
}

module.exports = postgresDbMapper();