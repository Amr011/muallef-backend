module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define("order", {
    totalPrice: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    isPaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });

  return order;
};
