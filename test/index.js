var section = ['Development', 'Graphic', 'Sound', '3D', 'Office', 'Moniteer'];
var category = ['Web', 'mobile', 'desktop', 'AI'];
var sort = ['Blog', 'Ecommerce', 'RealEstate'];

/**
 *
 * ! Hello World
 * TODO: [ ] Create New Product Paginated
 * ? So Thats How I write Comments
 * * This Is My latest comments in this world
 *  This is The Wohole New Todo List
 */

// Include [Section]
// Include [category]
// Include [sort]

// Get All Products Where (sort:id => include => category => include section)
// Get All Section Include ()

// Get All Section

// Get All Section
// Get All Category By Section Id
// Get All Sort By Category Id
// Get All Product Paginated By Sort Id

// Default Get All Section -> Get All Category By Section Id [0] ->
// Get All

// Get All Section include category include sort include product paginated
/**
 *
 *
 *
 *
 */

// GET All Section findAll() => function getAllSection
// GET All Category By Section Id @click="Section" findAll() => function getAllCategory
// GET All Sort By Category Id @click="Category" findAll() => function getAllSort
// GET All Products Paginated By Sort @click="Sort" findAll() => function getAllProduct
/**
 *
 *
 *
 */
/* So That's How i solve proplems in C  #  */

// Hello Every body and welcome back for another vedio
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../models/index.model');

const productModel = db.product;
const sortModel = db.sort;
const categoryModel = db.category;
const sectionModel = db.section;
const reviewModel = db.review;
const orderModel = db.order;
const orderDetailModel = db.orderDetail;
const storeModel = db.store;
const productLicenseSettingModel = db.productLicenseSetting;
const licneseModel = db.license;
const storeSupportSetting = db.storeSupportSetting;
const supportSetting = db.support;

/**
 *   const products = await productModel.findAll({
        order: [['id', 'DESC']],
        limit: 20,
        attributes: ['id', 'name'],
      });
      products.forEach(async (product, index) => {
        const reviewData = await reviewModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
            [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
          ],
        });
        const sallesData = await orderDetailModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('productId')), 'sallesCount'],
          ],
          include: [
            {
              model: orderModel,
              as: 'order',
              attributes: [],
              where: { isPaid: true },
            },
          ],
        });
        product.setDataValue('review', reviewData);
        product.setDataValue('salles', sallesData);

        if (index === products.length - 1) {
          return res.status(200).json({
            success: true,
            data: products,
          });
        }
      });

      if (!products.length) {
        return res.status(200).json({ success: true, data: products });
      }
 *   const getPagination = (page, size) => {
        const limit = size ? +size : 15;
        const offset = page ? page * limit : 0;

        return { limit, offset };
      };

      const getPagingData = (page, limit, data) => {
        const { count: totalItems, rows: products } = data;
        const currentPage = page ? +page : 0;
        const totalPages = Math.ceil(totalItems / limit);

        return { totalItems, totalPages, currentPage, products };
      };

      const { page, size } = req.query;
      const { limit, offset } = getPagination(page, size);

      const attributes = ['id', 'name', 'title', 'coverImage'];
      const order = [['createdAt', 'DESC']];
      const include = [];

      let productData = await productModel.findAndCountAll({
        limit,
        offset,
        attributes,
        order,
        include,
      });

      const response = getPagingData(page, limit, productData);

      if (productData) {
        return res.status(200).json({
          success: true,
          product: response,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: '! لا يوجد منتجات بعد',
        });
      }
 */

class productTesting {
  static getAllProductPaginatedIncludeSalesAndReview = async (req, res) => {
    try {
      const products = await productModel.findAll({
        order: [['id', 'DESC']],
        limit: 20,
        attributes: ['id', 'name'],
      });
      products.forEach(async (product, index) => {
        const reviewData = await reviewModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
            [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
          ],
        });
        const sallesData = await orderDetailModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('productId')), 'sallesCount'],
          ],
          include: [
            {
              model: orderModel,
              as: 'order',
              attributes: [],
              where: { isPaid: true },
            },
          ],
        });
        product.setDataValue('review', reviewData);
        product.setDataValue('salles', sallesData);

        if (index === products.length - 1) {
          return res.status(200).json({
            success: true,
            data: products,
          });
        }
      });

      if (!products.length) {
        return res.status(200).json({ success: true, data: products });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Unexpected Error',
        status: 400,
        error: err,
      });
    }
  };
}
module.exports = productTesting;
/**
 *   products.forEach(async (product, index) => {
        const reviewData = await reviewModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
            [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
          ],
        });
        const sallesData = await orderDetailModel.findAll({
          where: { productId: product.id },
          attributes: [
            [Sequelize.fn('COUNT', Sequelize.col('productId')), 'sallesCount'],
          ],
          include: [
            {
              model: orderModel,
              as: 'order',
              attributes: [],
              where: { isPaid: true },
            },
          ],
        });
        product.setDataValue('review', reviewData);
        product.setDataValue('salles', sallesData);

        if (index === products.length - 1) {
          return res.status(200).json({
            success: true,
            data: products,
          });
        }
      });

      if (!products.length) {
        return res.status(200).json({ success: true, data: products });
      }
 */
