module.exports = (sequelize, Sequelize) => {
  const cart = sequelize.define("cart", {});

  return cart;
};
