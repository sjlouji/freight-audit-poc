'use strict';
const tableName = 'shipment-charges';
const uniqueFields = ['shipment_id', 'tariff_name'];
const uniqueIndexName = 'shipment_charges_unique_index';
const uniqueConstraintName = 'shipment_charges_unique_constraint';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      shipment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'shipments',
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