module.exports = (sequelize, Sequelize) => {
  const review = sequelize.define('review', {
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rate: {
      type: Sequelize.INTEGER(0, 10),
      allowNull: true,
    },
  })

  return review
}
