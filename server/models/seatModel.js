module.exports = (sequelize, DataTypes) => {
  return sequelize.define("seat", {
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    row: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: true
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