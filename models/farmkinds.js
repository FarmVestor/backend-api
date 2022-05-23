'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FarmKinds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FarmKinds.hasMany(models.Requests, {
        foreignKey: 'farmKindId'
      })
      FarmKinds.hasMany(models.Farms, {
        foreignKey: 'farmKindId'
      })
    }
  }
  FarmKinds.init({
    farmKind: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FarmKinds',
  });
  return FarmKinds;
};