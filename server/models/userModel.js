const { DataTypes, Sequelize } = require('sequelize');
const { connectionString } = require('../dbConfig');

const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialect: 'postgres'
});


const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }
)


module.exports = { User, sequelize };
