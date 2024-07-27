const express = require('express');
const InvoiceController = require('../controller/invoice-controller');

class InvoiceRouter {
  static getRouter() {
    const router = express.Router();
    router.get('/invoice', InvoiceController.list);
    return router;
  }
}

module.exports = InvoiceRouter.getRouter();