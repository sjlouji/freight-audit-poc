'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert 100 invoices
    const invoices = [];
    for (let i = 0; i < 100; i++) {
      invoices.push({
        invoice_id: faker.datatype.uuid(),
        mode: faker.helpers.arrayElement(['Air', 'Sea', 'Land']),
        vendor_reference_id: faker.datatype.uuid(),
        status: faker.helpers.arrayElement(['Pending', 'Paid', 'Cancelled']),
        date: faker.date.past(),
        total_invoice_amount: faker.finance.amount(100, 10000, 2),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const invoiceResult = await queryInterface.bulkInsert('invoices', invoices, { returning: true });

    // Insert 100 shipments
    const shipments = [];
    for (let i = 0; i < 100; i++) {
      shipments.push({
        shipment_number: faker.datatype.uuid(),
        source: faker.address.city(),
        destination: faker.address.city(),
        vendor_ref_id: faker.datatype.uuid(),
        status: faker.helpers.arrayElement(['In Transit', 'Delivered', 'Cancelled']),
        date: faker.date.past(),
        cost: faker.finance.amount(100, 5000, 2),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const shipmentResult = await queryInterface.bulkInsert('shipments', shipments, { returning: true });

    // Insert 100 shipment charges
    const shipmentCharges = [];
    for (let i = 0; i < 100; i++) {
      shipmentCharges.push({
        shipment_id: faker.helpers.arrayElement(shipmentResult).id,
        tariff_name: faker.commerce.productName(),
        cost: faker.finance.amount(10, 1000, 2),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('shipment-charges', shipmentCharges, {});

    // Insert 100 invoice shipment mappings
    const invoiceShipmentMappings = [];
    for (let i = 0; i < 100; i++) {
      invoiceShipmentMappings.push({
        invoice_id: faker.helpers.arrayElement(invoiceResult).id,
        shipment_id: faker.helpers.arrayElement(shipmentResult).id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    const invoiceShipmentMappingResult = await queryInterface.bulkInsert('invoice-shipment-mapping', invoiceShipmentMappings, { returning: true });

    // Insert 100 invoice charges
    const invoiceCharges = [];
    for (let i = 0; i < 100; i++) {
      invoiceCharges.push({
        invoice_shipment_id: faker.helpers.arrayElement(invoiceShipmentMappingResult).id,
        tariff_name: faker.commerce.productName(),
        cost: faker.finance.amount(10, 1000, 2),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    await queryInterface.bulkInsert('invoice-charges', invoiceCharges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('invoice_charges', null, {});
    await queryInterface.bulkDelete('invoice_shipment_mapping', null, {});
    await queryInterface.bulkDelete('shipment_charges', null, {});
    await queryInterface.bulkDelete('shipments', null, {});
    await queryInterface.bulkDelete('invoices', null, {});
  }
};