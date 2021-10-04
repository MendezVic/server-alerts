const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Alert extends Model {}

Alert.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    server: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    server_type: {
      type: DataTypes.STRING,
      values: ['onprem', 'virtual'],
    },
  },
  {
    sequelize,
    modelName: 'alerts',
    indexes: [
      {
        unique: false,
        fields: ['server'],
      },
    ],
  }
);

module.exports = Alert;
