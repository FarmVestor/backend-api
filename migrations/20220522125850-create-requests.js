'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      farmArea: {
        type: Sequelize.INTEGER
      },
      budget: {
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
    await queryInterface.dropTable('Requests');
  }
};