'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postnew extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  postnew.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    body: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'postnew',
  });
  return postnew;
};