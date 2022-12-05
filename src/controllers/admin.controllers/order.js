const db = require('../../models/index.model')

const orderModel = db.order
const orderDetailModel = db.orderDetail
const cartModel = db.cart
const productModel = db.product
const productLicenseSettingModel = db.productLicenseSetting
const storeSupportSettingModel = db.storeSupportSetting

const storeModel = db.store

class order {
  static orderCreation = async (req, res, next) => {
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
        isPaid: true,
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
        message: 'Unexpected Error',
        status: 400,
        error: err,
      })
    }
  }

  static paymentAcception = async (req, res) => {}

  static clearCart = async (req, res) => {
    const userId = req.user.id

    cartModel
      .destroy({
        truncate: true,
        where: { userId: userId },
      })
      .then((deletedCart) => {
        return res.status(200).json({
          success: true,
          message: `! تم حذف المنتجات من السلة بنجاح`,
        })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).json({
          message: 'Unexpected Error',
          status: 400,
          error: err,
        })
      })
  }

  static salesCreation = async (req, res) => {
    try {
    } catch (err) {}
  }

  static purchaseCreation = async (req, res) => {}
}
module.exports = order
