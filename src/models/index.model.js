const developmentConfig = require('../config/db.config.js');
const dotenv = require('dotenv');
dotenv.config();

// Setup MySql Connection
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
   developmentConfig.DB,
   developmentConfig.USER,
   developmentConfig.PASSWORD,
   {
      host: developmentConfig.HOST,
      dialect: developmentConfig.DIALECT,
      port: 3306,
      logging: true,
      pool: {
         max: developmentConfig.pool.max,
         min: developmentConfig.pool.min,
         acquire: developmentConfig.pool.acquire,
         idle: developmentConfig.pool.idle,
      },
   }
);
// const sequelize = new Sequelize(
//   process.env.PG_DB,
//   process.env.PG_USER,
//   process.env.PG_PASS,
//   {
//     host: process.env.PG_HOST,
//     port: process.env.PG_PORT,
//     dialect: process.env.PG_DIALECT,
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//   }
// );

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// layout Models
db.section = require('./layout.models/section')(sequelize, Sequelize);
db.category = require('./layout.models/category')(sequelize, Sequelize);
db.sort = require('./layout.models/sort')(sequelize, Sequelize);

db.product = require('./layout.models/product')(sequelize, Sequelize);
db.license = require('./layout.models/license')(sequelize, Sequelize);
db.productLicenseSetting = require('./layout.models/productLicenseSetting')(
   sequelize,
   Sequelize
);

// Community Models
db.user = require('./user.models/user')(sequelize, Sequelize);
db.cart = require('./user.models/cart')(sequelize, Sequelize);
db.support = require('./user.models/support')(sequelize, Sequelize);
db.productSupportSetting = require('./user.models/productSupportSetting')(
   sequelize,
   Sequelize
);

// Site Quality Check Models
db.suggestion = require('./user.models/suggestion')(sequelize, Sequelize);
db.feedback = require('./user.models/feedback')(sequelize, Sequelize);

db.order = require('./order.models/order')(sequelize, Sequelize);
db.orderDetail = require('./order.models/orderDetial')(sequelize, Sequelize);
db.review = require('./order.models/review')(sequelize, Sequelize);

/*
  REALATIONSHIPS
*/

// One Order To Many OrderDetail
db.order.hasMany(db.orderDetail, { as: 'orderDetail' });
db.orderDetail.belongsTo(db.order, {
   forginKey: 'orderId',
   as: 'order',
});

// Many Product to Many OrderDetail
db.product.hasMany(db.orderDetail, { as: 'orderDetail' });
db.orderDetail.belongsTo(db.product, {
   forginKey: 'productId',
   as: 'product',
});

// One License to Many OrderDetail
db.productLicenseSetting.hasMany(db.orderDetail, {
   forginKey: 'productLicenseSettingId',
});
db.orderDetail.belongsTo(db.productLicenseSetting, {
   forginKey: 'productLicenseSettingId',
});

// One Support to Many OrderDetail
db.productSupportSetting.hasMany(db.orderDetail, {
   forginKey: 'productSupportSettingId',
});
db.orderDetail.belongsTo(db.productSupportSetting, {
   forginKey: 'productSupportSettingId',
});

// One User To Many Order
db.user.hasMany(db.order, { as: 'order' });
db.order.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One User To Many Review
db.user.hasMany(db.review, { as: 'review' });
db.review.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One Product To Many Review
db.product.hasMany(db.review, { as: 'review' });
db.review.belongsTo(db.product, {
   forginKey: 'productId',
   as: 'product',
});

// One Product to Many productSupportSetting
db.support.hasMany(db.productSupportSetting, { forginKey: 'supportId' });
db.productSupportSetting.belongsTo(db.support, { forginKey: 'supportId' });

// One Support to Many productSupportSetting
db.product.hasMany(db.productSupportSetting, { forginKey: 'productId' });
db.productSupportSetting.belongsTo(db.product, { forginKey: 'productId' });

// One License to Many productLicenseSetting
db.license.hasMany(db.productLicenseSetting, { forginKey: 'licenseId' });
db.productLicenseSetting.belongsTo(db.license, { forginKey: 'licenseId' });

// One Product to Many Price
db.product.hasMany(db.productLicenseSetting, { forginKey: 'productId' });
db.productLicenseSetting.belongsTo(db.product, { forginKey: 'productId' });

// Many Product to Many Cart
db.product.hasMany(db.cart, { as: 'cart' });
db.cart.belongsTo(db.product, {
   forginKey: 'productId',
   as: 'product',
});

// One License to Many Cart
db.productLicenseSetting.hasMany(db.cart, {
   forginKey: 'productLicenseSettingId',
});
db.cart.belongsTo(db.productLicenseSetting, {
   forginKey: 'productLicenseSettingId',
});

// One Support to Many Cart
db.productSupportSetting.hasMany(db.cart, {
   forginKey: 'productSupportSettingId',
});
db.cart.belongsTo(db.productSupportSetting, {
   forginKey: 'productSupportSettingId',
});

// One user to Many Cart
db.user.hasMany(db.cart, { as: 'cart' });
db.cart.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One user to Many Suggestion
db.user.hasMany(db.suggestion, { as: 'suggestion' });
db.suggestion.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One user to Many Feedback
db.user.hasMany(db.feedback, { as: 'feedback' });
db.feedback.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One User to Many Product
db.user.hasMany(db.product, { as: 'product' });
db.product.belongsTo(db.user, {
   forginKey: 'userId',
   as: 'user',
});

// One Section to Many Category
db.section.hasMany(db.category, { as: 'category' });
db.category.belongsTo(db.section, {
   forginKey: 'sectionId',
   as: 'section',
});

// One Category to Many Sort
db.category.hasMany(db.sort, { as: 'sort' });
db.sort.belongsTo(db.category, {
   forginKey: 'categoryId',
   as: 'category',
});

// One Sort to Many Product
db.sort.hasMany(db.product, { as: 'product' });
db.product.belongsTo(db.sort, {
   forginKey: 'sortId',
   as: 'sort',
});

module.exports = db;
