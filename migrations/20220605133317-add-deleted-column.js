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
      {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedUser=await queryInterface.addColumn(
      'Users',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedCities=await queryInterface.addColumn(
      'Cities',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedCountries=await queryInterface.addColumn(
      'Countries',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedCrops=await queryInterface.addColumn(
      'Crops',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedFarmKinds=await queryInterface.addColumn(
      'FarmKinds',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedFarms=await queryInterface.addColumn(
      'Farms',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedGovernrates=await queryInterface.addColumn(
      'Governrates',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedRequests=await queryInterface.addColumn(
      'Requests',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );
    const addDeletedUserType=await queryInterface.addColumn(
      'UserTypes',
      'deleted',
     {type:Sequelize.BOOLEAN,
      allowNull: false,
        defaultValue: false}
    );

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
      addDeletedUserType
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
    const removeDeletedUserType=await queryInterface.removeColumn(
      'UserTypes',
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
      removeDeletedUserType
    ]);
  }
};
