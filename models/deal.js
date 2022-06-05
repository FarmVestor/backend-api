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
      Deal.belongsTo(models.Farms, {
        foreignKey: 'farmId',
        
      }
      );
     
      Deal.belongsTo(models.Users, {
        foreignKey: 'agentId',
        as: "agent"
      }
      );
      Deal.belongsTo(models.Users, {
        foreignKey: 'investorId',
        as: "investor"
      }
      );
    }
  }
  Deal.init({
    farmId: DataTypes.INTEGER,
    agentId: DataTypes.INTEGER,
    investorId: DataTypes.INTEGER,
    dealPrice: DataTypes.INTEGER,
    dealStatus: DataTypes.BOOLEAN,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Deal',
  });
  return Deal;
};