module.exports = (sequelize, DataTypes) => {
  return sequelize.define("seat", {
    row: {
      type: DataTypes.CHAR(1),
      allowNull: false,
    },
    col: {
      type: DataTypes.INTEGER,
      allowNull: true,
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