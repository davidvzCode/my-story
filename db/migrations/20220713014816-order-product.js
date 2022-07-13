'use strict';


const { Order_ProductSchema, ORDER_PRODUCT_TABLE } = require('../models/order-product.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, Order_ProductSchema);
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
