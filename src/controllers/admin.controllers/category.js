const db = require("../../models/index.model");
const { categoryValidation } = require("../../middleware/validator");

const categoryModel = db.category;

class category {
  // Get All Categories
  static getAllCategory = (req, res) => {
    let category = [];

    categoryModel
      .findAll({})
      .then((foundedCategory) => {
        category = foundedCategory;

        if (category !== null) {
          return res.status(200).json({
            success: true,
            category: category,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no category found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Get Single Category
  static getSingleCategory = (req, res) => {
    let category = [];

    categoryModel
      .findAll({ where: { id: req.params.id } })
      .then((foundedCategory) => {
        category = foundedCategory;

        if (category !== null) {
          return res.status(200).json({
            success: true,
            category: category,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no category found",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Create New Category
  static createCategory = (req, res) => {
    let category = [];

    const { error } = categoryValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    let coverImage = req.files.coverImage;
    if (!coverImage) {
      return res
        .status(400)
        .json({ error: "! صورة الصنف لا يمكن ان تترك فارغة" });
    }
    function getFilePath(item) {
      var path = [item.path];
      return path;
    }
    coverImage = coverImage.map(getFilePath);

    categoryModel
      .create({
        title: req.body.title,
        description: req.body.description,
        coverImage: coverImage[0][0],
        sectionId: req.body.sectionId,
      })
      .then((createdCategory) => {
        category = createdCategory;

        if (category !== null) {
          return res.status(200).json({
            success: true,
            message: `! تمت اضافةالصنف بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! فشل اضافةالصنف",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Update Category
  static updateCategory = (req, res) => {
    let category = [];

    const { error } = categoryValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    let coverImage = req.files.coverImage;
    if (!coverImage) {
      return res
        .status(400)
        .json({ error: "! صورة الصنف لا يمكن ان تترك فارغة" });
    }
    function getFilePath(item) {
      var path = [item.path];
      return path;
    }
    coverImage = coverImage.map(getFilePath);

    categoryModel
      .update(
        {
          title: req.body.title,
          description: req.body.description,
          coverImage: coverImage[0][0],
          sectionId: req.body.sectionId,
        },
        { where: { id: req.params.id } }
      )
      .then((updatedCategory) => {
        category = updatedCategory;

        if (category !== null) {
          return res.status(200).json({
            success: true,
            message: `! تمت تعديل الصنف بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! فشل تعديل الصنف",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };

  // Delete Category
  static deleteCategory = (req, res) => {
    categoryModel
      .destroy({ where: { id: req.params.id } })
      .then((deletedCategory) => {
        return res.status(200).json({
          success: true,
          message: `! تم حذف الصنف بنجاح`,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: "Unexpected Error",
          status: 400,
          error: err,
        });
      });
  };
}
module.exports = category;
