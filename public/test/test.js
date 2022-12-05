const express = require('express');

const app = express();

const Sequelize = require('sequelize');
const db = require('../models/index.model');

const productModel = db.product;
const reviewModel = db.review;
const orderModel = db.order;
const orderDetailModel = db.orderDetail;

app.get('/app', async (req, res) => {
  try {
    let productData = await productModel.findAll({
      order: [['id', 'DESC']],
      attributes: ['id', 'name', 'title'],
    });

    if (productData) {
      return res.status(200).json({ productData });
    } else {
      return res.status(400).json('failed');
    }
  } catch (err) {
    console.log(err);
  }
});

// const salesCount = await orderDetailModel.count({
//   attributes: [],
//   //   where: { productId: productData[i].id },
//   include: [
//     {
//       model: orderModel,
//       as: 'order',
//       attributes: [],
//       where: { isPaid: true },
//     },
//   ],
// });

// const reviewAvgCount = await reviewModel.findAll({
//   //   where: { productId: productData[i].id },
//   attributes: [
//     [Sequelize.fn('COUNT', Sequelize.col('rate')), 'rateCount'],
//     [Sequelize.fn('AVG', Sequelize.col('rate')), 'rateAvg'],
//   ],
// });

// productData.setDataValue('reviewAvgCount', reviewAvgCount);
// productData.setDataValue('salesCount', salesCount);

app.listen(2000);
