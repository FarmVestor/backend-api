'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cities.belongsTo(models.Governrates,{
        foreignKey:'governrateId'
      })
      Cities.hasMany(models.Farms,{
        foreignKey:'cityId'
      })
      Cities.hasMany(models.Users,{
        foreignKey:'cityId'
      })
    }
  }
  Cities.init({
    id: DataTypes.INTEGER,
    cityName: DataTypes.STRING,
    governrateId: DataTypes.INTEGER,
    latitude: DataTypes.DECIMAL,
    longitude: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Cities',
  });
  return Cities;
};