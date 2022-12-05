const db = require('../../models/index.model')

const orderModel = db.order
const orderDetailModel = db.orderDetail
const storeModel = db.store
const stateModel = db.state
const productLicenseSettingModel = db.productLicenseSetting
const storeSupportSettingModel = db.storeSupportSetting
const productModel = db.product
const cartModel = db.cart

class order {
  // Order Read All
  static getAllOrder = async (req, res) => {
    try {
      let orderData = await orderModel.findAll({
        where: { isPaid: true },
        include: [
          {
            model: orderDetailModel,
            as: 'orderDetail',
            where: { productId: 81 },
          },
        ],
      })

      if (orderData) {
        return res.status(200).json({
          success: true,
          count: orderData.length,
          order: orderData,
        })
      } else {
        return res.status(200).json({
          success: false,
          message: '! لا يوجد لديك اي طلب بعد',
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }

  // Order Read Single

  static getSingleOrder = async (req, res) => {
    try {
      const userId = req.user.id
      const orderId = req.params.orderId

      let orderData = await orderModel.findOne({
        where: { userId: userId, id: orderId },
        include: [
          {
            model: orderDetailModel,
            as: 'orderDetail',
          },
        ],
      })

      if (orderData) {
        return res.status(200).json({
          success: true,
          order: orderData,
        })
      } else {
        return res.status(200).json({
          success: false,
          message: '! لا يوجد لديك اي طلب بعد',
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }

  // Order Creation

  static createOrder = async (req, res) => {
    try {
      const userId = req.user.id

      let cartData = await cartModel.findAll({
        include: [
          {
            model: storeModel,
            as: 'store',
            attributes: ['id', 'name'],
          },
          {
            model: productModel,
            as: 'product',
            attributes: ['id', 'name', 'title'],
          },
          {
            model: productLicenseSettingModel,
            as: 'productLicenseSetting',
            attributes: ['price'],
          },
          {
            model: storeSupportSettingModel,
            as: 'storeSupportSetting',
            attributes: ['price'],
          },
        ],

        where: { userId: userId },
      })

      if (cartData.length === 0) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              '! سلة الشراء فارغة يجب عليك اضافة منتج واحد على الاقل لإتمام العملية',
          })
          .end()
      }

      const totalLicensePriceSum = () => {
        var total = 0
        for (var i = 0; i < cartData.length; i++) {
          if (!cartData[i].productLicenseSetting) {
            total = 0
          } else {
            total = total + cartData[i].productLicenseSetting.price
          }
        }
        return total
      }

      const totalSupportPriceSum = () => {
        var total = 0
        for (var i = 0; i < cartData.length; i++) {
          if (!cartData[i].storeSupportSetting) {
            total = 0
          } else {
            total = total + cartData[i].storeSupportSetting.price
          }
        }
        return total
      }
      let orderData = await orderModel.create({
        userId: userId,
        totalPrice: totalLicensePriceSum() + totalSupportPriceSum(),
        stateId: 1,
        isPaid: false,
      })

      for (var i = 0; i < cartData.length; i++) {
        await orderDetailModel.create({
          orderId: orderData.id,
          productId: cartData[i].productId,
          productLicenseSettingId: cartData[i].productLicenseSettingId,
          storeSupportSettingId: cartData[i].storeSupportSettingId,
          storeId: cartData[i].storeId,
        })
      }

      if (cartData) {
        await orderModel
          .findOne({
            include: [
              {
                model: orderDetailModel,
                as: 'orderDetail',
                include: [
                  {
                    model: productModel,
                    as: 'product',
                    attributes: ['name', 'title'],
                  },
                  {
                    model: productLicenseSettingModel,
                    as: 'productLicenseSetting',
                    attributes: ['price'],
                  },
                  {
                    model: storeSupportSettingModel,
                    as: 'storeSupportSetting',
                    attributes: ['price'],
                  },
                ],
              },
              { model: stateModel, as: 'state', attributes: ['title'] },
            ],
            where: { id: orderData.id, userId: userId },
          })
          .then((foundedOrderData) => {
            return res.status(200).json({
              success: true,
              order: foundedOrderData,
            })
          })
      } else {
        return res.status(200).json({
          success: true,
          message: 'not found',
        })
      }
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }

  // Payment Acception
  static payment = async (req, res) => {
    try {
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }
  // Order Update
  static updateOrder = async (req, res) => {
    try {
      const userId = req.user.id
      let orderData = await orderModel.update({
        where: { id: req.params.id, userId: userId },
        isPaid: true,
      })

      return res.status(200).json({
        success: true,
        message: '! تم تنفيذ الطلب بنجاح',
      })
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }
  // Order Delete
  static deleteOrder = async (req, res) => {
    try {
      const userId = req.user.id
      let orderData = await orderModel.delete({
        where: { id: req.params.id, userId: userId },
      })

      return res.status(200).json({
        success: true,
        message: '! تم حذف الطلب بنجاح',
      })
    } catch (err) {
      console.log(err)
      return res.status(400).json({
        err: err,
      })
    }
  }
}

module.exports = order
