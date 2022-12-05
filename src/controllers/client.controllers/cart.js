const db = require('../../models/index.model');
const cartModel = db.cart;
const productModel = db.product;
const productLicenseSettingModel = db.productLicenseSetting;
const licenseModel = db.license;
const productSupportSettingModel = db.productSupportSetting;
const supportModel = db.support;
const userModel = db.user;
class cart {
  // User Show Cart
  static readCart = async (req, res) => {
    try {
      const userId = req.user.id;
      let cartData = await cartModel.findAll({
        where: { userId: userId },
        order: [['id', 'DESC']],
        include: [
          {
            model: productModel,
            as: 'product',
            attributes: ['name', 'title', 'coverImage'],
            include: [
              {
                model: userModel,
                as: 'user',
                attributes: ['id', 'firstname', 'lastname'],
              },
            ],
          },
          {
            model: productLicenseSettingModel,
            as: 'productLicenseSetting',
            attributes: ['price'],
            include: [
              { model: licenseModel, as: 'license', attributes: ['title'] },
            ],
          },
          {
            model: productSupportSettingModel,
            as: 'productSupportSetting',
            attributes: ['price'],
            include: [
              { model: supportModel, as: 'support', attributes: ['title'] },
            ],
          },
        ],
      });
      if (cartData) {
        return res.status(200).json({
          success: true,
          cart: cartData,
        });
      } else {
        return res.status(200).json({
          success: false,
          message: '! سلة المشتريات الخاصة بك فارغة',
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

  // User Cart Data Count
  static getCartCount = async (req, res) => {
    try {
      const userId = req.user.id;
      const cartData = await cartModel.count({
        where: { userId: userId },
      });
      if (cartData) {
        return res.status(200).json({
          success: true,
          data: cartData,
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
  // User Add Product To Cart
  static createCart = async (req, res) => {
    try {
      const userId = req.user.id;
      let cartExist = await cartModel.findOne({
        attributes: ['userId', 'productId'],
        where: {
          userId: userId,
          productId: req.params.productId,
        },
      });

      if (cartExist) {
        return res.status(200).json({
          error: '! هذا المنتج موجود في السلة بالفعل',
        });
      } else {
        let cartData = await cartModel.create({
          productLicenseSettingId: req.body.productLicenseSettingId,
          productSupportSettingId: req.body.productSupportSettingId,
          productId: req.params.productId,
          userId: userId,
        });

        if (cartData) {
          return res.status(200).json({
            success: true,
            message: '! تمت اضافة المنتج الى سلة الشراء بنجاح',
          });
        } else {
          return res.status(200).json({
            success: false,
            message: '! فشل اضافة المنتج الى سلة الشراء',
          });
        }
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

  // User Update Product From Cart
  static updateCart = async (req, res) => {
    try {
      const userId = req.user.id;
      const { productId, productLicenseSettingId, productSupportSettingId } =
        req.body;
      let cartData = await cartModel.update({
        where: { productId: productId, userId: userId },
        productLicenseSettingId: productLicenseSettingId,
        productSupportSettingId: productSupportSettingId,
      });

      if (cartData) {
        return res.status(200).json({
          success: true,
          message: '! تمت تعديل المنتج في سلة الشراء بنجاح',
        });
      } else {
        return res.status(200).json({
          success: false,
          message: '! فشل تعديل المنتج في سلة الشراء',
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

  // User Delete Product From Cart
  static deleteCart = async (req, res) => {
    try {
      const userId = req.user.id;

      let cartData = await cartModel.destroy({
        where: { productId: req.params.productId, userId: userId },
      });
      return res.status(200).json({
        success: true,
        message: `! تم حذف المنتج من السلة بنجاح`,
      });
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: 'Unexpected Error',
        status: 400,
        error: err,
      });
    }
  };

  // User Clear Cart
  static clearCart = async (req, res) => {
    try {
      const userId = req.user.id;

      let cartData = cartModel.destroy({
        truncate: true,
        where: { userId: userId },
      });
      return res.status(200).json({
        success: true,
        message: `! تم حذف المنتجات من السلة بنجاح`,
      });
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

module.exports = cart;
