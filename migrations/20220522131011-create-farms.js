'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Farms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      farmPicture: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER
      },
      farmArea: {
        type: Sequelize.INTEGER
      },
      cropId: {
        type: Sequelize.INTEGER
      },
      farmLicense: {
        type: Sequelize.STRING
      },
      farmAvailable: {
        type: Sequelize.BOOLEAN
      },
      farmKindId: {
        type: Sequelize.INTEGER
      },
      farmVisibiltiy: {
        type: Sequelize.BOOLEAN
      },
      farmWaterSalinity: {
        type: Sequelize.INTEGER
      },
      farmLastCropsId: {
        type: Sequelize.INTEGER
      },
      farmFertilizer: {
        type: Sequelize.STRING
      },
      farmTreesAge: {
        type: Sequelize.INTEGER
      },
      farmDescription: {
        type: Sequelize.STRING
      },
      farmName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Farms');
  }
};