module.exports = (sequelize, Sequelize) => {
  const feedback = sequelize.define("feedback", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return feedback;
};
