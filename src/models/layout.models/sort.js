module.exports = (sequelize, Sequelize) => {
  const sort = sequelize.define("sort", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return sort;
};
