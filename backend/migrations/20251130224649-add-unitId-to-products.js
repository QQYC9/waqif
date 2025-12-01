'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // إضافة عمود unitId إلى جدول products
    await queryInterface.addColumn('products', 'unitId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'units',
        key: 'id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    // إضافة index
    await queryInterface.addIndex('products', ['unitId'], {
      name: 'products_unit_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    // حذف index
    await queryInterface.removeIndex('products', 'products_unit_id_idx');
    
    // حذف عمود unitId
    await queryInterface.removeColumn('products', 'unitId');
  }
};
