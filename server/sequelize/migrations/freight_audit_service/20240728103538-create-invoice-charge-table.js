'use strict';
const tableName = 'invoice-charges';
const uniqueFields = ['invoice_shipment_id', 'tariff_name'];
const uniqueIndexName = 'invoice_charges_unique_index';
const uniqueConstraintName = 'invoice_charges_unique_constraint';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_shipment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'invoice-shipment-mapping',
          key: 'id',
        },
        allowNull: false,
      },
      tariff_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cost: {
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