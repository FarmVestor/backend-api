'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Deals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      farmId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Farms',
  
          },
          key: 'id'
        },
        allowNull: false,
      },
      agentId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          
          },
          key: 'id'
        },
        allowNull: false,

      },
      investorId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',

          },
          key: 'id'
        },
        allowNull: false,
      },
      dealPrice: {
        type: Sequelize.INTEGER
      },
      dealStatus: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Deals');
  }
};