'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Governrates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Governrates.belongsTo(models.Countries,{
        foreignKey:'countryId'
      })
      Governrates.hasMany(models.Cities,{
        foreignKey:'governrateId'
      })
    }
  }
  Governrates.init({
    id: DataTypes.INTEGER,
    governrateName: DataTypes.STRING,
    countryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Governrates',
  });
  return Governrates;
};