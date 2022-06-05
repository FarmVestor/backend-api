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
      Requests.belongsTo(models.Users, {
        foreignKey: 'userId',
      });
    }
  }
  Requests.init({
    farmKindId: DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
    farmArea: DataTypes.INTEGER,
    budget: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Requests',
  });
  return Requests;
};