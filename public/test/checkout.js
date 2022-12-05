const db = require('../models/index.model')
const cartModel = db.cart
const productModel = db.product
const productLicenseSettingModel = db.productLicenseSetting
const licenseModel = db.license
const storeModel = db.storeModel
const storeSupportSettingModel = db.storeSupportSetting
const supportModel = db.support
const orderModel = db.order
const orderDetailModel = db.orderDetail
const stripe = require('stripe')(process.env.STRIPE_PUBLIC_KEY)

const checkout = async (req, res) => {
  try {
    const userId = req.user.id
    const { source } = req.body
    let cartData = cartModel.findAll({
      where: { userId: userId },
      include: [
        {
          model: productModel,
          as: 'product',
          attributes: ['name', 'title', 'coverImage'],
        },
        {
          model: productLicenseSettingModel,
          as: 'productLicenseSetting',
          attributes: ['price'],
          include: [
            { model: licenseModel, as: 'license', attributes: ['title'] },
          ],
        },
        { model: storeModel, as: 'store', attributes: ['name'] },
        {
          model: storeSupportSettingModel,
          as: 'storeSupportSetting',
          attributes: ['price'],
          include: [
            { model: supportModel, as: 'support', attributes: ['title'] },
          ],
        },
      ],
    })
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
    if (cartData.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            '! سلة الشراء فارغة يجب عليك اضافة منتج واحد على الاقل لإتمام العملية',
        })
        .end()
    } else {
      const charge = await stripe.charges.create({
        amount: totalSupportPriceSum() + totalLicensePriceSum() * 100,
        currency: 'us',
        source: source,
        receipt_email: req.user.email,
      })
      if (!charge) {
        return res.status(500).json({ error: '! حدث خطأ في عملية الدفع' })
      }
      if (charge) {
        let orderData = await orderModel.create({
          userId: userId,
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
        let cartData = cartModel.destroy({
          truncate: true,
          where: { userId: userId },
        })

        return res.status(200).json({
          success: true,
          message: '! تم الدفع بنجاح',
          orderData: orderData,
        })
      }
    }
  } catch (err) {
    console.log(err)
  }
}

module.exports = checkout
