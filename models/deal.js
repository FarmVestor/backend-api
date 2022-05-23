'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Deal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Deal.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: "firstUser"
      }
      );
     
      Deal.belongsTo(models.Users, {
        foreignKey: 'partenerId',
        as: "secondUser"
      }
      );
    }
  }
  Deal.init({
    farmId: DataTypes.NUMBER,
    userId: DataTypes.NUMBER,
    partenerId: DataTypes.NUMBER,
    dealPrice: DataTypes.NUMBER,
    dealStatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Deal',
  });
  return Deal;
};