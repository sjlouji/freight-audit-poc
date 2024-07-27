'use strict';
const tableName = 'invoices';
const uniqueFields = ['invoice_id', 'vendor_reference_id'];
const uniqueIndexName = 'invoices_unique_index';
const uniqueConstraintName = 'invoices_unique_constraint';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      mode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_reference_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      total_invoice_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint(tableName, {
      fields: uniqueFields,
      type: 'unique',
      name: uniqueConstraintName,
    });
    await queryInterface.addIndex(tableName, uniqueFields, {
      unique: true,
      name: uniqueIndexName,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(tableName, uniqueConstraintName);
    await queryInterface.removeIndex(tableName, uniqueIndexName);
    await queryInterface.dropTable(tableName);
  },
};