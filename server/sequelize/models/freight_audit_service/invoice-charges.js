'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const InvoiceChargesSchema = require('./schema/invoice-charges')(DataTypes);

  class InvoiceCharges extends Model {
  }

  InvoiceCharges.init(InvoiceChargesSchema, {
    sequelize,
    tableName: 'invoice-charges',
    modelName: 'InvoiceCharges',
  });
  return InvoiceCharges;
};