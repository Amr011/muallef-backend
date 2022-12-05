const db = require('../../models/index.model');

const reviewModel = db.review;

class review {
   static readAllReview = async (req, res) => {
      try {
         const userId = req.user.id;

         let reviewData = await reviewModel.findAll({
            where: { productId: req.body.productId },
         });

         if (reviewData) {
            return res.status(200).json({
               success: true,
               review: reviewData,
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

   static createReview = async (req, res) => {
      try {
         const userId = req.user.id;

         let checkValidateReview = await reviewModel.findAll({
            where: { productId: req.body.productId, userId: userId },
         });
         if (checkValidateReview.length >= 1) {
            return res
               .status(400)
               .json({
                  success: false,
                  message: '! لقد قيمت هذا المنتج بالفعل',
                  review: checkValidateReview,
               })
               .end();
         }
         let reviewData = await reviewModel.create({
            productId: req.body.productId,
            rate: req.body.rate,
            description: req.body.description,
            userId: userId,
         });
         if (reviewData) {
            return res.status(200).json({
               success: true,
               message: '! تم تقيم المنتج بنجاح',
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! خطا, لم يتم تقيم المنتج',
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
   static updateReview = async (req, res) => {
      try {
      } catch (err) {
         console.log(err);
         return res.status(400).json({
            message: 'Unexpected Error',
            status: 400,
            error: err,
         });
      }
   };

   static deleteReview = async (req, res) => {
      try {
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

module.exports = review;
