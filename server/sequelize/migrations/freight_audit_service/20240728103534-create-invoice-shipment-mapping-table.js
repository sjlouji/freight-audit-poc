'use strict';
const tableName = 'invoice-shipment-mapping';
const uniqueFields = ['invoice_id', 'shipment_id'];
const uniqueIndexName = 'invoice_shipment_mapping_unique_index';
const uniqueConstraintName = 'invoice_shipment_mapping_unique_constraint';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'invoices',
          key: 'id',
        },
        allowNull: false,
      },
      shipment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shipments',
          key: 'id',
        },
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