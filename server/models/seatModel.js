module.exports = (sequelize, DataTypes) => {
  return sequelize.define("seat", {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: false
  })
}