module.exports = (DataTypes) => ({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'invoices',
      key: 'id',
    },
    allowNull: false,
  },
  shipment_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'shipments',
      key: 'id',
    },
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