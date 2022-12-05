const db = require('../../models/index.model');

const userModel = db.user;
const billModel = db.billInfo;

const bcrypt = require('bcrypt');
const { userValidation } = require('../../middleware/validator');

const jwt = require('jsonwebtoken');

class user {
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

   static userLogOut = async (req, res) => {
      const accessToken = jwt.sign(
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
   };

   static userProfile = async (req, res) => {
      const username = req.user;
      return res.status(200).json({
         success: true,
         message: `! مرحبا بعودتك ${username.firstname}`,
      });
   };
}

module.exports = user;
