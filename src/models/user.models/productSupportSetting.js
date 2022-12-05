module.exports = (sequelize, Sequelize) => {
  const productSupportSetting = sequelize.define('productSupportSetting', {
    price: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    availableWeekDayStart: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    availableWeekDayEnd: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    availableByEmail: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    supportEmail: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    availableBy3rdPartySite: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    },
    supportSite: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return productSupportSetting;
};
