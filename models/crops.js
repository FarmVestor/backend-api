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
        foreignKey:'cropId',
        as:"Crop"
      })
      Crops.hasMany(models.Farms,{
        foreignKey:'farmLastCropsId',
        as:"LastCrop"
      })
      Crops.hasMany(models.Requests,{
        foreignKey:'cropId',
       
      })
    }
  }
  Crops.init({
    cropName: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Crops',
  });
  return Crops;
};