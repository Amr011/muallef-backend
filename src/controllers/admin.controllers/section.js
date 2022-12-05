const db = require("../../models/index.model");

const { sectionValidation } = require("../../middleware/validator");

const sectionModel = db.section;
const categoryModel = db.category;
const sortModel = db.sort;
const productModel = db.product;

class section {
  // Get All Sections
  static getAllSection = (req, res) => {
    let section = [];

    sectionModel
      .findAll({
        attributes: ["title"],
        include: [
          {
            model: categoryModel,
            as: "category",
            attributes: ["title"],
            include: [
              {
                model: sortModel,
                as: "sort",
                attributes: ["title"],
                include: [
                  {
                    model: productModel,
                    as: "product",
                    attributes: ["title"],
                  },
                ],
              },
            ],
          },
        ],
      })
      .then((foundedSection) => {
        section = foundedSection;

        if (section !== null) {
          return res.status(200).json({
            success: true,
            section: section,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no section found",
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

  // Get Single Section
  static getSingleSection = (req, res) => {
    let section = [];

    sectionModel
      .findAll({ where: { id: req.params.id } })
      .then((foundedSection) => {
        section = foundedSection;

        if (section !== null) {
          return res.status(200).json({
            success: true,
            section: section,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no section found",
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

  // Create New Section
  static createSection = (req, res) => {
    let section = [];

    const { error } = sectionValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    let coverImage = req.files.coverImage;
    if (!coverImage) {
      return res
        .status(400)
        .json({ error: "! صورة القسم لا يمكن ان تترك فارغة" });
    }
    function getFilePath(item) {
      var path = [item.path];
      return path;
    }
    coverImage = coverImage.map(getFilePath);

    sectionModel
      .create({
        title: req.body.title,
        description: req.body.description,
        coverImage: coverImage[0][0],
      })
      .then((createdSection) => {
        section = createdSection;

        if (section !== null) {
          return res.status(200).json({
            success: true,
            message: `! تمت اضافةالقسم بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! فشل اضافةالقسم",
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

  // Update Section
  static updateSection = (req, res) => {
    let section = [];

    const { error } = sectionValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    let coverImage = req.files.coverImage;
    if (!coverImage) {
      return res
        .status(400)
        .json({ error: "! صورة القسم لا يمكن ان تترك فارغة" });
    }
    function getFilePath(item) {
      var path = [item.path];
      return path;
    }
    coverImage = coverImage.map(getFilePath);

    sectionModel
      .update(
        {
          title: req.body.title,
          description: req.body.description,
          coverImage: coverImage[0][0],
        },
        { where: { id: req.params.id } }
      )
      .then((updatedSection) => {
        section = updatedSection;

        if (section !== null) {
          return res.status(200).json({
            success: true,
            message: `! تمت تعديل القسم بنجاح`,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "! فشل تعديل القسم",
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

  // Delete Section
  static deleteSection = (req, res) => {
    sectionModel
      .destroy({ where: { id: req.params.id } })
      .then((deletedSection) => {
        return res.status(200).json({
          success: true,
          message: `! تم حذف القسم بنجاح`,
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
module.exports = section;
