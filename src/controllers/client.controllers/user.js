const bcrypt = require('bcrypt');

const { userValidation } = require('../../middleware/validator');

const jwt = require('jsonwebtoken');
const db = require('../../models/index.model');

const userModel = db.user;

class user {
   // User Register New Account
   static userRegister = async (req, res) => {
      // validate form
      const { error } = userValidation(req.body);
      if (error) return res.status(400).json(error.details[0].message);

      const { firstname, lastname, email, password, phone } = req.body;
      // user existing validation
      const userE = await userModel.findOne({ where: { email: email } });
      if (userE) {
         return res
            .status(400)
            .json({ error: '! هذا البريد الالكتروني مستخدم بالفعل' })
            .end();
      }

      // register user & hash password
      bcrypt.hash(password, 12).then((hash) => {
         userModel
            .create({
               firstname: firstname,
               lastname: lastname,
               email: email,
               password: hash,
               phone: phone,
               isAdmin: false,
            })
            .then((registerdUser) => {
               if (registerdUser != null) {
                  return res.status(200).json({
                     success: true,
                     message: '! تم تسجيل الدخول بنجاح',
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
      });
   };

   // User Login From Existing Account
   static userLogin = async (req, res) => {
      const { email, password } = req.body;

      const user = await userModel.findOne({
         include: [],
         where: {
            email: email,
         },
      });

      if (!user) {
         return res
            .status(400)
            .json({ error: '! لا يوجد مستخدم يطابق البيانات المدخلة' })
            .end();
      }
      const dbPassword = user.password;

      bcrypt.compare(password, dbPassword).then((match) => {
         if (!match) {
            return res.status(400).json({
               error: '! خطأ في البريد الالكتروني او كلمة المرور',
            });
         }

         const accessToken = jwt.sign(
            {
               id: user.id,
               firstname: user.firstname,
               lastname: user.lastname,
               email: user.email,
            },
            process.env.ACCESS_TOKEN
         );

         res.cookie('access-token', accessToken, {
            maxAge: 1000 * 60 * 60 * 24 * 30, // 1 mounth
            httpOnly: true,
         });

         return res.status(200).json({
            message: '! تم تسجيل الدخول بنجاح',
            accessToken: accessToken,
         });
      });
   };

   // User Logout From Existing Account
   static userLogout = async (req, res) => {
      try {
         const accessToken = await jwt.sign(
            { email: user.email, id: user.id },
            process.env.ACCESS_TOKEN
         );

         res.cookie('access-token', accessToken, {
            maxAge: 1, // 0.001 sec
            httpOnly: true,
         });

         return res.status(200).json({
            success: true,
            message: `! تم تسجيل الخروج بنجاح`,
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
   // User Get All
   static userGetAll = async (req, res) => {
      try {
         let userData = await userModel.findAll();

         if (userData) {
            return res.status(200).json({
               success: true,
               user: userData,
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! لا يوجد مستخدمين بعد',
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
   // User Get Single
   static userGetSingle = async (req, res) => {
      try {
         let userData = await userModel.findOne({
            where: { id: req.params.id },
         });

         if (userData) {
            return res.status(200).json({
               success: true,
               user: userData,
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! لا يوجد مستخدم',
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

   // User Show Info
   static userProfile = async (req, res) => {
      try {
         const userId = req.user.id;
         let userData = await userModel.findOne({
            where: { id: userId },
         });

         if (userData) {
            return res.status(200).json({
               success: true,
               user: userData,
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! لا يوجد مستخدم',
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

   // User Update Info
   static userUpdate = async (req, res) => {
      try {
         const { error } = userValidation(req.body);
         if (error)
            return res.status(400).json({ err: error.details[0].message });

         let coverImage = req.files.coverImage;

         function getFilePath(item) {
            var path = [item.path];
            return path;
         }
         coverImage = coverImage.map(getFilePath);

         const userId = req.user.id;
         const { firstname, lastname, email, phone } = req.body;
         let userData = await userModel.update({
            where: { id: userId },
            firstname: firstname,
            lastname: lastname,
            coverImage: [0][0],
            email: email,
            phone: phone,
         });

         if (userData) {
            return res.status(200).json({
               success: true,
               message: '! تم التعديل بنجاح',
            });
         } else {
            return res.status(200).json({
               success: false,
               message: '! فشل التعديل',
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

   // User Delete Account
   static userDelete = async (req, res) => {
      try {
         const userId = req.user.id;

         await userModel.destroy({
            where: { id: userId },
         });

         return res.status(200).json({
            success: true,
            message: '! تم حذف حساب المستخدم بنجاح',
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

module.exports = user;
