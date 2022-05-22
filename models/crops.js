'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Crops extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Crops.hasMany(models.Farms,{
        foreignKey:'cropId'
      })
      Crops.hasMany(models.Requests,{
        foreignKey:'cropId'
      })
    }
  }
  Crops.init({
    id: DataTypes.INTEGER,
    cropName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Crops',
  });
  return Crops;
};