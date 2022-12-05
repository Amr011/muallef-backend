module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define("category", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return category;
};
