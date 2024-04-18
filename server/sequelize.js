require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');
const userModel = require("./models/userModel");
const movieModel = require("./models/movieModel");
const seatModel = require("./models/seatModel");

const sequelize = new Sequelize(process.env.DB_URL, {
  dialect: 'postgres',
  logging: false
});

(async () => {
  await sequelize.authenticate().then(() => console.log("DB connection established"));
  await sequelize.sync({ alter: true });
})();

const User = userModel(sequelize, DataTypes);
const Movie = movieModel(sequelize, DataTypes);
const Seat = seatModel(sequelize, DataTypes);


// association
Seat.belongsTo(Movie, { "foreign_key": "movieId" });

module.exports = { User, Movie, Seat }

