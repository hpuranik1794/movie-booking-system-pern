module.exports = (sequelize, DataTypes) => {
  return sequelize.define("movie", {
      movie_id: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
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
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      av_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  },
  {
    timestamps: false
  })
}
