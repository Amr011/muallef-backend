module.exports = (sequelize, Sequelize) => {
  const section = sequelize.define("section", {
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

  return section;
};
