'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashed = await bcrypt.hash('ChangeMe123!', 10);

    await queryInterface.bulkInsert('Users', [
      {
        email: 'admin@example.com',
        password: hashed,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' });
  },
};