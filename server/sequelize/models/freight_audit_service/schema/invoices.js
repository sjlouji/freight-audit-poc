module.exports = (Sequelize) => ({
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
    unique: true,
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
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});