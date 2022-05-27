'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     const addUserIdToDeals=await queryInterface.addColumn(
      'Deals',
      'agentId',
      {type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',

        },
        key: 'id'
      }},
    );
    const userIdToDeals=  await queryInterface.renameColumn('Deals', 'partenerId', 'investorId')

    return Promise.all([
      addUserIdToDeals,
      userIdToDeals
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return;
  }
};
