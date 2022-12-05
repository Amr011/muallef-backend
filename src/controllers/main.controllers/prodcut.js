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
const productLicenseSettingModel = db.productLicenseSetting;
const licneseModel = db.license;
const productSupportSettingModel = db.productSupportSetting;
const supportModel = db.support;
const userModel = db.user;

class product {
   // Get Single Product By Id
   static getSingleProductById = async (req, res) => {
      try {
         const productId = req.params.productId;
         var productData = await productModel.findOne({
            order: [['id', 'DESC']],
            where: { id: productId, isVerify: false },
            attributes: [
               'id',
               'name',
               'title',
               'content',
               'coverImage',
               'previewURL',
               'QuilityVerify',
               'feutureUpdatesVerify',
               'isExclusive',
               'version',
            ],
            include: [
               { model: sortModel, as: 'sort', attributes: ['id', 'title'] },
            ],
         });

         const productLicenseSettingData =
            await productLicenseSettingModel.findAll({
               where: { productId: req.params.productId },
               attributes: ['id', 'price'],
               include: [
                  {
                     model: licneseModel,
                     as: 'license',
                     attributes: ['id', 'title'],
                  },
               ],
            });

         const productSupportSettingData =
            await productSupportSettingModel.findAll({
               attributes: ['id', 'price'],

               where: { productId: req.params.productId },
               include: [
                  {
                     model: supportModel,
                     as: 'support',
                     attributes: ['id', 'title', 'description'],
                  },
               ],
            });

         const salesData = await orderDetailModel.findAll({
            attributes: [
               [
                  Sequelize.fn('COUNT', Sequelize.col('productId')),
                  'sallesCount',
               ],
            ],
            where: { productId: req.params.productId },
            include: [
               {
                  model: orderModel,
                  as: 'order',
                  attributes: [],
                  where: { isPaid: true },
               },
               {
                  model: userModel,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname'],
               },
            ],
         });

         const reviewData = await reviewModel.findAll({
            where: { productId: req.params.productId },
            attributes: [
               [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
               [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
            ],
         });

         if (productData) {
            productData.setDataValue(
               'standerdLicenseSetting',
               productLicenseSettingData[0]
            );
            productData.setDataValue(
               'extendedLicenseSetting',
               productLicenseSettingData[1]
            );
            productData.setDataValue(
               'supportSetting',
               productSupportSettingData
            );
            productData.setDataValue('reviews', reviewData[0]);
            productData.setDataValue('salles', salesData[0]);
         }

         if (productData != null) {
            return res.status(200).json({
               success: true,
               product: productData,
            });
         } else {
            return res.status(200).json({
               success: false,
               product: '! هذا المنتج غير موجود',
            });
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

   static getAllProductPaginatedIncludeSalesAndReviewV2 = async (req, res) => {
      try {
         let { term } = req.query;
         term
            ? ((term = term.toLowerCase()), (term = term.trim()))
            : (term = '');

         const getPagination = (page, size) => {
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

         const attributes = [
            'id',
            'name',
            'title',
            'coverImage',
            'content',
            'previewURL',
            'isExclusive',
            'createdAt',
         ];

         var newest = req.query;
         var order;

         if (newest) {
            order = [['createdAt', 'DESC']];
         } else {
            order = [['id', 'DESC']];
         }

         const products = await productModel.findAndCountAll({
            order,
            limit,
            offset,
            attributes,
            where: {
               [Op.or]: [
                  { name: { [Op.like]: `%${term}%` } },
                  { title: { [Op.like]: `%${term}%` } },
               ],
            },

            include: [
               {
                  model: userModel,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname'],
               },
               { model: sortModel, as: 'sort', attributes: ['id', 'title'] },
            ],
         });

         const response = getPagingData(page, limit, products);

         response.products.forEach(async (product, index) => {
            const reviewData = await reviewModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
                  [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
               ],
            });

            const productLicenseSettingData =
               await productLicenseSettingModel.findAll({
                  where: { productId: product.id },
                  attributes: ['id', 'price'],
                  include: [
                     {
                        model: licneseModel,
                        as: 'license',
                        attributes: ['id', 'title'],
                     },
                  ],
               });

            const productSupportSettingData =
               await productSupportSettingModel.findAll({
                  attributes: ['id', 'price'],

                  where: { productId: product.id },
                  include: [
                     {
                        model: supportModel,
                        as: 'support',
                        attributes: ['id', 'title', 'description'],
                     },
                  ],
               });

            const sallesData = await orderDetailModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [
                     Sequelize.fn('COUNT', Sequelize.col('productId')),
                     'sallesCount',
                  ],
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

            product.setDataValue(
               'standerdLicenseSetting',
               productLicenseSettingData[0]
            );
            product.setDataValue(
               'extendedLicenseSetting',
               productLicenseSettingData[1]
            );
            product.setDataValue('supportSetting', productSupportSettingData);

            product.setDataValue('reviews', reviewData[0]);
            product.setDataValue('salles', sallesData[0]);

            if (index === response.products.length - 1) {
               return res.status(200).json({
                  success: true,
                  data: response,
               });
            }
         });

         if (page >= response.totalPages) {
            return res.status(400).json({
               success: false,
               message: '! لا يوجد منتجات اخرى هنا',
            });
         }

         if (products.length === 0) {
            return res.status(400).json({
               success: false,
               message: '! لا يوجد منتجات اخرى هنا',
            });
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

   /* GET TOP RATED PRODUCT IN TESTIGN  */

   static getTopRattedProducts = async (req, res) => {
      try {
         const products = await productModel.findAll({
            order: [
               [Sequelize.fn('AVG', Sequelize.col('review.rate')), 'DESC'],
               [Sequelize.fn('COUNT', Sequelize.col('review.rate')), 'DESC'],
            ],
            attributes: ['id', 'name', 'coverImage', 'content'],
            include: [
               {
                  model: reviewModel,
                  as: 'review',
                  attributes: [],
                  seperate: true,
               },
               {
                  model: userModel,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname'],
               },
               { model: sortModel, as: 'sort', attributes: ['id', 'title'] },
            ],
            subQuery: false,
            limit: 15,
            group: ['id'],
         });
         products.forEach(async (product, index) => {
            const productLicenseSettingData =
               await productLicenseSettingModel.findAll({
                  where: { productId: product.id },
                  attributes: ['id', 'price'],
                  include: [
                     {
                        model: licneseModel,
                        as: 'license',
                        attributes: ['id', 'title'],
                     },
                  ],
               });

            product.setDataValue(
               'standerdLicenseSetting',
               productLicenseSettingData[0]
            );

            product.setDataValue(
               'extendedLicenseSetting',
               productLicenseSettingData[1]
            );

            const productSupportSettingData =
               await productSupportSettingModel.findAll({
                  attributes: ['id', 'price'],

                  where: { productId: product.id },
                  include: [
                     {
                        model: supportModel,
                        as: 'support',
                        attributes: ['id', 'title', 'description'],
                     },
                  ],
               });

            product.setDataValue(
               'supportSetting',
               productSupportSettingData[0]
            );

            const reviewData = await reviewModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
                  [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
               ],
            });

            product.setDataValue('reviews', reviewData[0]);

            const sallesData = await orderDetailModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [
                     Sequelize.fn('COUNT', Sequelize.col('productId')),
                     'sallesCount',
                  ],
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

            product.setDataValue('salles', sallesData[0]);

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
   /* GET TOP SELLING PRODUCTS */

   static getTopSellingProducts = async (req, res) => {
      try {
         const products = await productModel.findAll({
            order: [
               [
                  Sequelize.fn('COUNT', Sequelize.col('orderDetail.productId')),
                  'DESC',
               ],
            ],
            attributes: ['id', 'name', 'title'],
            include: [
               {
                  model: orderDetailModel,
                  as: 'orderDetail',
                  attributes: [],
                  seperate: true,
                  include: [
                     {
                        model: orderModel,
                        as: 'order',
                        seperate: true,
                        attributes: [],
                        where: { isPaid: true },
                     },
                  ],
               },
               {
                  model: userModel,
                  as: 'user',
                  attributes: ['id', 'firstname', 'lastname'],
               },
               { model: sortModel, as: 'sort', attributes: ['id', 'title'] },
            ],
            subQuery: false,
            limit: 15,
            group: ['id'],
         });

         products.forEach(async (product, index) => {
            const productLicenseSettingData =
               await productLicenseSettingModel.findAll({
                  where: { productId: product.id },
                  attributes: ['id', 'price'],
                  include: [
                     {
                        model: licneseModel,
                        as: 'license',
                        attributes: ['id', 'title'],
                     },
                  ],
               });

            product.setDataValue(
               'standerdLicenseSetting',
               productLicenseSettingData[0]
            );

            product.setDataValue(
               'extendedLicenseSetting',
               productLicenseSettingData[1]
            );

            const productSupportSettingData =
               await productSupportSettingModel.findAll({
                  attributes: ['id', 'price'],

                  where: { productId: product.id },
                  include: [
                     {
                        model: supportModel,
                        as: 'support',
                        attributes: ['id', 'title', 'description'],
                     },
                  ],
               });

            product.setDataValue(
               'supportSetting',
               productSupportSettingData[0]
            );

            const reviewData = await reviewModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
                  [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
               ],
            });

            product.setDataValue('reviews', reviewData[0]);

            const sallesData = await orderDetailModel.findAll({
               where: { productId: product.id },
               attributes: [
                  [
                     Sequelize.fn('COUNT', Sequelize.col('productId')),
                     'sallesCount',
                  ],
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

            product.setDataValue('salles', sallesData[0]);

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

   // Get User Purchasees
   static getUserPurchase = async function (req, res) {
      try {
         const userId = req.user.id;

         const orderData = await orderModel.findAll({
            where: { userId: userId, isPaid: true },
            include: [
               {
                  model: orderDetailModel,
                  as: 'orderDetail',
                  include: [
                     {
                        model: productModel,
                        as: 'product',
                        attributes: [
                           'id',
                           'title',
                           'name',
                           'coverImage',
                           'previewURL',
                           'projectFile',
                        ],
                     },
                     {
                        model: productSupportSettingModel,
                        as: 'productSupportSetting',
                        attributes: ['id', 'price'],
                        include: [
                           {
                              model: supportModel,
                              as: 'support',
                              attributes: ['id', 'title'],
                           },
                        ],
                     },
                     {
                        model: productLicenseSettingModel,
                        as: 'productLicenseSetting',
                        attributes: ['id', 'price'],
                        include: [
                           {
                              model: licneseModel,
                              as: 'license',
                              attributes: ['id', 'title'],
                           },
                        ],
                     },
                  ],
               },
            ],
         });
         if (orderData) {
            return res.status(200).json({
               success: true,
               data: orderData,
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! لا يوجد لديك اي مشتريات حتى الأن',
            });
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

   // Get User Salles
   static getUserSalles = async function (req, res) {
      try {
         const userId = req.user.id;

         const orderData = await orderModel.findAll({
            where: { isPaid: true },
            include: [
               {
                  model: orderDetailModel,
                  as: 'orderDetail',
                  include: [
                     {
                        model: productModel,
                        as: 'product',
                        attributes: [
                           'id',
                           'title',
                           'name',
                           'coverImage',
                           'previewURL',
                           'projectFile',
                        ],
                        where: { userId: userId },
                     },
                     {
                        model: productSupportSettingModel,
                        as: 'productSupportSetting',
                        attributes: ['id', 'price'],
                        include: [
                           {
                              model: supportModel,
                              as: 'support',
                              attributes: ['id', 'title'],
                           },
                        ],
                     },
                     {
                        model: productLicenseSettingModel,
                        as: 'productLicenseSetting',
                        attributes: ['id', 'price'],
                        include: [
                           {
                              model: licneseModel,
                              as: 'license',
                              attributes: ['id', 'title'],
                           },
                        ],
                     },
                  ],
               },
            ],
         });
         if (orderData) {
            return res.status(200).json({
               success: true,
               data: orderData,
            });
         } else {
            return res.status(200).json({
               success: true,
               message: '! لا يوجد لديك اي مبيعات حتى الأن',
            });
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

module.exports = product;
