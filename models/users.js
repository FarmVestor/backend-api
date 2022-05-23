'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.hasMany(models.Farms, {
        foreignKey: 'userId'
      });  
      
      Users.hasMany(models.Deal, {
       // foreignKey: 'userId',
        as: "firstUser"
              })
        Users.hasMany(models.Deal, {
       // foreignKey: 'partenerId',
        as: "secondUser"
      })
      Users.belongsTo(models.Cities,{
        foreignKey: 'cityId'
      });
     
      }
  }
  Users.init({
    cityId: DataTypes.INTEGER,
    userName: DataTypes.STRING,
    userPhone: DataTypes.INTEGER,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};