module.exports = (sequelize, Sequelize) => {
  const license = sequelize.define("license", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isAbelSelling: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    isAbleCustomize: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    isAbleToRecycle: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    communityFee: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    sellerFee: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  });

  return license;
};
