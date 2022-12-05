const db = require('../../models/index.model');
const Sequelize = require('sequelize');

const productModel = db.product;
const userModel = db.user;
const sortModel = db.sort;
const categoryModel = db.category;
const sectionModel = db.section;
const licenseModel = db.license;
const supportModel = db.support;
const productSupportSetting = db.productSupportSetting;
const productLicenseSetting = db.productLicenseSetting;

const { productValidation } = require('../../middleware/validator');

class product {
  // Create New Product
  static createProduct = (req, res) => {
    var product = [];

    const { error } = productValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    const userId = req.user.id;

    let coverImage = req.files.coverImage;
    let projectFile = req.files.projectFile;

    if (!coverImage) {
      return res
        .status(400)
        .json({ error: '! صورة المنتج لا يمكن ان تترك فارغة' });
    } else if (!projectFile) {
      return res
        .status(400)
        .json({ error: '! ملفات المنتج لا يمكن ان تترك فارغة' });
    }

    function getFilePath(item) {
      var path = [item.path];
      return path;
    }
    coverImage = coverImage.map(getFilePath);
    projectFile = projectFile.map(getFilePath);

    productModel
      .create({
        name: req.body.name,
        title: req.body.title,
        content: req.body.content,
        coverImage: coverImage[0][0],
        previewURL: req.body.previewURL,
        projectFile: projectFile[0][0],
        sortId: req.body.sortId,
        userId: userId,
        isExclusive: req.body.isExclusive,
        version: req.body.version,
      })
      .then((createdProduct) => {
        product = createdProduct;

        let standardLicensePricing = req.body.standardLicensePrice;
        let extendedLicensePricing = req.body.extendedLicensePrice;

        productLicenseSetting.bulkCreate([
          {
            price: standardLicensePricing,
            extraSettings: 'hello world',
            selllerPrice: (standardLicensePricing * 75) / 100,
            communityprice: (standardLicensePricing * 25) / 100,
            licenseId: 1,
            productId: product.id,
          },
          {
            price: extendedLicensePricing,
            extraSettings: 'hello world',
            selllerPrice: (extendedLicensePricing * 75) / 100,
            communityprice: (extendedLicensePricing * 25) / 100,
            licenseId: 2,
            productId: product.id,
          },
        ]);
        let supportPrice = req.body.supportPrice;

        productSupportSetting.create({
          price: supportPrice,
          availableWeekDayStart: req.body.availableWeekDayStart,
          availableWeekDayEnd: req.body.availableWeekDayEnd,
          availableByEmail: req.body.availableByEmail,
          supportEmail: req.body.supportEmail,
          availableBy3rdPartySite: req.body.availableBy3rdPartySite,
          supportSite: req.body.supportSite,
          supportId: 1,
          productId: product.id,
        });

        if (product) {
          return res.status(200).json({
            success: true,
            message: `! تمت اضافةالمنتج بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: '! فشل اضافةالمنتج',
          });
        }
      })

      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Unexpected Error',
          status: 400,
          error: err,
        });
      });
  };

  static updateProduct = (req, res) => {
    let product = [];

    const { error } = productValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    const userId = req.user.id;

    let coverImage = req.files.coverImage;
    let projectFile = req.files.projectFile;

    if (!coverImage) {
      return res
        .status(400)
        .json({ error: '! صورة المنتج لا يمكن ان تترك فارغة' });
    } else if (!projectFile) {
      return res
        .status(400)
        .json({ error: '! ملفات المنتج لا يمكن ان تترك فارغة' });
    }

    function getFilePath(item) {
      var path = [item.path];
      return path;
    }

    coverImage = coverImage.map(getFilePath);
    projectFile = projectFile.map(getFilePath);

    return productModel
      .update(
        {
          title: req.body.title,
          shortDescription: req.body.shortDescription,
          content: req.body.content,
          coverImage: coverImage[0][0],
          price: req.body.price,
          previewURL: req.body.previewURL,
          projectFile: projectFile[0][0],
          sortId: req.body.sortId,
          isExclusive: req.body.isExclusive,
        },
        {
          where: {
            id: req.params.productId,
            userId: userId,
          },
        }
      )

      .then((updatedProduct) => {
        product = updatedProduct;
        if (product !== null) {
          return res.status(200).json({
            success: true,
            message: `! تمت تعديل المنتج بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: '! فشل تعديل المنتج',
          });
        }
      })

      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Unexpected Error',
          status: 400,
          error: err,
        });
      });
  };

  static deleteProduct = (req, res) => {
    const userId = req.user.id;

    productModel
      .destroy({
        where: { userId: userId, id: req.params.id },
      })
      .then(() => {
        return res.status(200).json({
          success: true,
          message: '! تم حذف المنتج بنجاح',
        });
      })

      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Unexpected Error',
          status: 400,
          error: err,
        });
      });
  };
}

module.exports = product;
