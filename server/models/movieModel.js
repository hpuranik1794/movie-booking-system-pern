module.exports = (sequelize, DataTypes) => {
  return sequelize.define("movie", {
      movie_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      overview: {
        type: DataTypes.TEXT,
      },
      poster_path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      backdrop_path: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      cost: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      availableSeats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  },
  {
    timestamps: false
  })
}
