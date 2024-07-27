'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const InvoiceSchema = require('./schema/invoices')(DataTypes);

  class Invoice extends Model {
  }

  Invoice.init(InvoiceSchema, {
    sequelize,
    tableName: 'invoices',
    modelName: 'Invoices',
  });
  return Invoice;
};