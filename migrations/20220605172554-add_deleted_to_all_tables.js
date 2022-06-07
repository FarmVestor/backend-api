'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const addDeletedDeal=await queryInterface.addColumn(
      'Deals',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedUser=await queryInterface.addColumn(
      'Users',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedCities=await queryInterface.addColumn(
      'Cities',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedCountries=await queryInterface.addColumn(
      'Countries',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedCrops=await queryInterface.addColumn(
      'Crops',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedFarmKinds=await queryInterface.addColumn(
      'FarmKinds',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedFarms=await queryInterface.addColumn(
      'Farms',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedGovernrates=await queryInterface.addColumn(
      'Governrates',
      'deleted',
      Sequelize.BOOLEAN
    );
    const addDeletedRequests=await queryInterface.addColumn(
      'Requests',
      'deleted',
      Sequelize.BOOLEAN
    );
    // const addDeletedUserType=await queryInterface.addColumn(
    //   'UserTypes',
    //   'deleted',
    //   Sequelize.BOOLEAN
    // );

    return Promise.all([
      addDeletedDeal,
      addDeletedUser,
      addDeletedCities,
      addDeletedCountries,
      addDeletedCrops,
      addDeletedFarmKinds,
      addDeletedFarms,
      addDeletedGovernrates,
      addDeletedRequests,
     // addDeletedUserType
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     const removeDeletedDeal=await queryInterface.removeColumn(
      'Deals',
      'deleted',
    );
    const removeDeletedUser=await queryInterface.removeColumn(
      'Users',
      'deleted',
    );
    const removeDeletedCities=await queryInterface.removeColumn(
      'Cities',
      'deleted',
    );
    const removeDeletedCountries=await queryInterface.removeColumn(
      'Countries',
      'deleted',
    );
    const removeDeletedCrops=await queryInterface.removeColumn(
      'Crops',
      'deleted',
    );
    const removeDeletedFarmKinds=await queryInterface.removeColumn(
      'FarmKinds',
      'deleted',
    );
    const removeDeletedFarms=await queryInterface.removeColumn(
      'Farms',
      'deleted',
    );
    const removeDeletedGovernrates=await queryInterface.removeColumn(
      'Governrates',
      'deleted',
    );
    const removeDeletedRequests=await queryInterface.removeColumn(
      'Requests',
      'deleted',
    );
    

    return Promise.all([
      removeDeletedDeal,
      removeDeletedUser,
      removeDeletedCities,
      removeDeletedCountries,
      removeDeletedCrops,
      removeDeletedFarmKinds,
      removeDeletedFarms,
      removeDeletedGovernrates,
      removeDeletedRequests,
    ]);
  }
};
