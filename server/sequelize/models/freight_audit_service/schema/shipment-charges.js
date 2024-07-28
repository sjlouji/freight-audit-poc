module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shipment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'shipments',
      key: 'id',
    },
    allowNull: false,
  },
  tariff_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});