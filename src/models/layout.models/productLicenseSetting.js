module.exports = (sequelize, Sequelize) => {
   const productLicenseSetting = sequelize.define('productLicenseSetting', {
      price: {
         type: Sequelize.FLOAT,
         allowNull: true,
      },
      selllerPrice: {
         type: Sequelize.FLOAT,
         allowNull: true,
      },
      communityprice: {
         type: Sequelize.FLOAT,
         allowNull: true,
      },
      extraSttings: {
         type: Sequelize.STRING,
         allowNull: false,
      },
   });

   return productLicenseSetting;
};
