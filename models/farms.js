'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Farms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Farms.belongsTo(models.Users,{
        foreignKey:"userId"
      });
      Farms.belongsTo(models.Cities,{
        foreignKey:"cityId"
      });
      Farms.belongsTo(models.FarmKinds,{
        foreignKey:"farmKindId"
      });
      Farms.belongsTo(models.Crops,{
        foreignKey:"cropId"
      });




    }
  }
  Farms.init({
    userId: DataTypes.INTEGER,
    farmPicture: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    farmArea: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    farmLicense: DataTypes.STRING,
    farmAvailable: DataTypes.BOOLEAN,
    farmKindId: DataTypes.INTEGER,
    farmVisibiltiy: DataTypes.BOOLEAN,
    farmWaterSalinity: DataTypes.INTEGER,
    farmLastCropsId: DataTypes.INTEGER,
    farmFertilizer: DataTypes.STRING,
    farmTreesAge: DataTypes.INTEGER,
    farmDescription: DataTypes.STRING,
    farmName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Farms',
  });
  return Farms;
};