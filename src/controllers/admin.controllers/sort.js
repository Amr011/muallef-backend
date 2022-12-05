const db = require("../../models/index.model");

const { sortValidation } = require("../../middleware/validator");

const sortModel = db.sort;

class sort {
  // Get All Sort
  static getAllSort = (req, res) => {
    let sort = [];

    sortModel
      .findAll({})
      .then((foundedSort) => {
        sort = foundedSort;

        if (sort) {
          return res.status(200).json({
            success: true,
            sort: sort,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no sort found",
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

  // Get Single Sort
  static getSingleSort = (req, res) => {
    let sort = [];

    sortModel
      .findAll({ where: { id: req.params.id } })
      .then((foundedSort) => {
        sort = foundedSort;

        if (sort) {
          return res.status(200).json({
            success: true,
            sort: sort,
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "there are no sort found",
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

  // Create New Sort
  static createSort = (req, res) => {
    let sort = [];

    const { error } = sortValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    sortModel
      .create({
        title: req.body.title,
        description: req.body.description,
        categoryId: req.body.categoryId,
      })
      .then((createdSort) => {
        sort = createdSort;

        if (sort) {
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

  // Update Sort
  static updateSort = (req, res) => {
    let sort = [];

    const { error } = sortValidation(req.body);
    if (error) return res.status(400).json({ err: error.details[0].message });

    sortModel
      .update(
        {
          title: req.body.title,
          description: req.body.description,
          categoryId: req.body.categoryId,
        },
        { where: { id: req.params.id } }
      )
      .then((updatedSort) => {
        sort = updatedSort;

        if (sort) {
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

  // Delete Sort
  static deleteSort = (req, res) => {
    sortModel
      .destroy({ where: { id: req.params.id } })
      .then((deletedSort) => {
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
module.exports = sort;
