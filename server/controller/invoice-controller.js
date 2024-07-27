const { Invoices } = require('../sequelize/models');

class InvoiceController {
  static async list(request, response, next) {
    await Invoices.findAll({});
    response.status(200).json({});
  }
}

module.exports = InvoiceController;