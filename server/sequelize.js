require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require("./models/userModel");
const movieModel = require("./models/movieModel");
const seatModel = require("./models/seatModel");

const sequelize = new Sequelize(process.env.DB_URL, {
  logging: false,
  dialect: 'postgres'
});

(async () => {
  await sequelize.authenticate().then(() => console.log("DB connection established"));
  await sequelize.sync({ alter: true });
})();

const Users = userModel(sequelize, DataTypes);
const Movies = movieModel(sequelize, DataTypes);
const Seats = seatModel(sequelize, DataTypes);

Seats.sync({force: true});
// association
Seats.belongsTo(Movies, { "foreign_key": "movieId" });

module.exports = { Users, Movies, Seats }

