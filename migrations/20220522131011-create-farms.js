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
      
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
  
          },
          key: 'id'
        },
        allowNull: false,
      },
      farmPicture: {
        type: Sequelize.STRING
      },
      cityId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Cities',
  
          },
          key: 'id'
        },
        allowNull: false,
      },
      farmArea: {
        type: Sequelize.INTEGER
      },
      cropId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Crops',
  
          },
          key: 'id'
        },
        allowNull: false,
      },
      farmLicense: {
        type: Sequelize.STRING
      },
      farmLongitude: {
        type: Sequelize.DECIMAL
      },
      farmLatitude: {
        type: Sequelize.DECIMAL
      },
      farmAvailable: {
        type: Sequelize.BOOLEAN
      },
      farmKindId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'FarmKinds',
  
          },
          key: 'id'
        },
        allowNull: false,
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
      },
      deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Farms');
  }
};