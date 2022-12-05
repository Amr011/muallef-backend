module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    content: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    coverImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    previewURL: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    projectFile: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isVerify: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    QuilityVerify: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    feutureUpdatesVerify: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    isExclusive: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    version: {
      type: Sequelize.STRING,
      default: '1.0',
      allowNull: true,
    },
    buyerMessage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return product;
};
