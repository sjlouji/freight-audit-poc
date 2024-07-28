
'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const ShipmentChargesSchema = require('./schema/shipment-charges')(DataTypes);

  class ShipmentCharges extends Model {
  }

  ShipmentCharges.init(ShipmentChargesSchema, {
    sequelize,
    tableName: 'shipment-charges',
    modelName: 'ShipmentCharges',
  });
  return ShipmentCharges;
};