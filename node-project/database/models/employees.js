'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employees.init(
    {
      firstname: DataTypes.STRING,
      employeeID: DataTypes.INTEGER,
      lastname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      age: DataTypes.INTEGER,
      mainoffice: DataTypes.STRING,
      timeatenersis: DataTypes.INTEGER,
      happiness: DataTypes.INTEGER,
      jobID: DataTypes.INTEGER,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'employees',
    },
  );
  return employees;
};
