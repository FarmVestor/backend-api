'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const addUserIdRequest=await queryInterface.addColumn(
      'Requests',
      'userId',
      Sequelize.INTEGER
    );
    const removeUserIdDeal=await queryInterface.removeColumn(
      'Deals',
      'userId'
    );
    return Promise.all([
      addUserIdRequest,
      removeUserIdDeal,
     

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     const addUserIdRequest =await  queryInterface.removeColumn(
      'Requests',
      'userId'
    );
    const removeUserIdDeal=await queryInterface.addColumn(
      'Deals',
      'userId',
      Sequelize.INTEGER
    );
    return Promise.all([
      addUserIdRequest,
      removeUserIdDeal,
    
    ]);
  }
};
