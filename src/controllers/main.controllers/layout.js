const db = require('../../models/index.model');
const sectionModel = db.section;
const categoryModel = db.category;
const sortModel = db.sort;

class layout {
   // Get All Layout Sections
   static getAllLayoutSections = async (req, res) => {
      try {
         const layoutData = await sectionModel.findAll({
            attributes: ['id', 'title', 'description'],
         });
         if (layoutData.length !== 0) {
            return res.status(200).json({
               success: true,
               data: layoutData,
            });
         } else {
            return res.status(200).json({
               success: true,
               message: '! لا يوجد اي اقسام بعد',
            });
         }
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected error',
            err: err,
         });
      }
   };

   // Get All Layout Categories
   static getAllLayoutCategories = async (req, res) => {
      try {
         const layoutData = await categoryModel.findAll({
            where: { sectionId: req.params.sectionId },
            attributes: ['id', 'title', 'description'],
         });
         if (layoutData.length !== 0) {
            return res.status(200).json({
               success: true,
               data: layoutData,
            });
         } else {
            return res.status(200).json({
               success: true,
               message: '! لا يوجد اي اقسام بعد',
            });
         }
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected error',
            err: err,
         });
      }
   };
   // Get All Layout Sorts
   static getAllLayoutSorts = async (req, res) => {
      try {
         const layoutData = await sortModel.findAll({
            where: { categoryId: req.params.categoryId },
            attributes: ['id', 'title', 'description'],
         });
         if (layoutData.length !== 0) {
            return res.status(200).json({
               success: true,
               data: layoutData,
            });
         } else {
            return res.status(200).json({
               success: true,
               message: '! لا يوجد اي اقسام بعد',
            });
         }
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected error',
            err: err,
         });
      }
   };
}

module.exports = layout;
