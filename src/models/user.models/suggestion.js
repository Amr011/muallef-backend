module.exports = (sequelize, Sequelize) => {
  const suggestion = sequelize.define("suggestion", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return suggestion;
};
