'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const addLongitude=await queryInterface.addColumn(
      'Farms',
      'farmLongitude',
      Sequelize.DECIMAL
    );
    const addLatitude=await queryInterface.addColumn(
      'Farms',
      'farmLatitude',
      Sequelize.DECIMAL
    );
    return Promise.all([
      addLongitude,
      addLatitude,
      
     

    // ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     const removeLongitude =await  queryInterface.removeColumn(
      'Farms',
      'farmLongitude',
    );
    const removeLatitude=await queryInterface.removeColumn(
      'Farms',
      'farmLatitude'
     
    );
    return Promise.all([
      removeLongitude,
      removeLatitude,
    
    ]);
  }
};
