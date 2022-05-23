'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Requests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Requests.belongsTo(models.FarmKinds, {
        foreignKey: 'farmKindId',
      });
      Requests.belongsTo(models.Crops, {
        foreignKey: 'cropId',
      });
    }
  }
  Requests.init({
    farmKindId: DataTypes.NUMBER,
    farmArea: DataTypes.NUMBER,
    budget: DataTypes.NUMBER,
    cropId: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Requests',
  });
  return Requests;
};