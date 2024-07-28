'use strict';
const tableName = 'shipments';
const uniqueFields = ['shipment_number', 'vendor_id'];
const uniqueIndexName = 'shipments_unique_index';
const uniqueConstraintName = 'shipments_unique_constraint';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shipment_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      source: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      destination: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      vendor_id: {
        type: Sequelize.INTEGER,
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

  down: async (queryInterface) => {
    await queryInterface.removeConstraint(tableName, uniqueConstraintName);
    await queryInterface.removeIndex(tableName, uniqueIndexName);
    await queryInterface.dropTable(tableName);
  },
};