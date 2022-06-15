'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      userName: {
        type: Sequelize.STRING
      },
      userPhone: {
        type: Sequelize.STRING
      },
      userEmail: {
        type: Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'UserTypes',
  
          },
          key: 'id'
        },
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deleted: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};