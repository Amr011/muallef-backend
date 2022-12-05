module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    firstname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verify: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    phone: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  })

  return user
}
