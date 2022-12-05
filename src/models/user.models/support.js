module.exports = (sequelize, Sequelize) => {
  const support = sequelize.define("support", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    supportUntil: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return support;
};
