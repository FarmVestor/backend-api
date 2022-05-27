'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const dealFarmId= await queryInterface.changeColumn('Deals', 'farmId', {
      type: Sequelize.INTEGER,
      
    })
    const dealPartenerId= await queryInterface.changeColumn('Deals', 'partenerId', {
      type: Sequelize.INTEGER,
      
    })
    const dealPrice= await queryInterface.changeColumn('Deals', 'dealPrice', {
      type: Sequelize.INTEGER,
      
    })
    const requestFarmKindId= await queryInterface.changeColumn('Requests', 'farmkindId', {
      type: Sequelize.INTEGER,
      
    })
    const requestBudget= await queryInterface.changeColumn('Requests', 'budget', {
      type: Sequelize.INTEGER,
      
    })
    const requestCropId= await queryInterface.changeColumn('Requests', 'cropId', {
      type: Sequelize.INTEGER,
      
    })
    return Promise.all([
      dealFarmId,
      dealPartenerId,
      dealPrice,
      requestFarmKindId,
      requestBudget,
      requestCropId,

    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return
  }
};
