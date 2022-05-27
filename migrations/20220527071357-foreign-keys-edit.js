'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const changeDealPartner=  await queryInterface.changeColumn('Deals', 'partenerId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeDealFarm= await queryInterface.changeColumn('Deals', 'farmId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Farms',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeFarmUser= await queryInterface.changeColumn('Farms', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Users',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeFarmCrop= await queryInterface.changeColumn('Farms', 'cropId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Crops',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeFarmCity=await  queryInterface.changeColumn('Farms', 'cityId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Cities',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeFarmFarmKind= await  queryInterface.changeColumn('Farms', 'farmKindId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'FarmKinds',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeUserCity= await  queryInterface.changeColumn('Users', 'cityId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Cities',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeUserType=  await queryInterface.changeColumn('Users', 'userTypeId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'UserTypes',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeRequestFarmKind= await queryInterface.changeColumn('Requests', 'farmKindId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'FarmKinds',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeRequestCrop=await  queryInterface.changeColumn('Requests', 'cropId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Crops',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeCityGov= await queryInterface.changeColumn('Cities', 'governrateId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Governrates',

        },
        key: 'id'
      },
      allowNull: false,
    })
    const changeGovCountry= await queryInterface.changeColumn('Governrates', 'countryId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Countries',

        },
        key: 'id'
      },
      allowNull: false,
    })
    return Promise.all([
      changeDealPartner,
      changeDealFarm,
      changeFarmUser,
      changeFarmCrop,
      changeFarmCity,
      changeFarmFarmKind,
      changeUserCity,
      changeUserType,
      changeRequestFarmKind,
      changeRequestCrop,
      changeCityGov,
      changeGovCountry,




    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return;
  }
};
