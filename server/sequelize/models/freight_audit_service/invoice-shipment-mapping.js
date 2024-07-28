'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const InvoiceShipmentMappingSchema = require('./schema/invoice-shipment-mapping')(DataTypes);

  class InvoiceShipmentMapping extends Model {
  }

  InvoiceShipmentMapping.init(InvoiceShipmentMappingSchema, {
    sequelize,
    tableName: 'invoice-shipment-mapping',
    modelName: 'InvoiceShipmentMapping',
  });
  return InvoiceShipmentMapping;
};