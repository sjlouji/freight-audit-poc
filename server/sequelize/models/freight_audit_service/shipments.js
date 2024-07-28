'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ShipmentSchema = require('./schema/shipment')(DataTypes);

  class Shipments extends Model {
  }

  Shipments.init(ShipmentSchema, {
    sequelize,
    tableName: 'shipments',
    modelName: 'Shipments',
  });
  return Shipments;
};