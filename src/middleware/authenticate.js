const dotenv = require('dotenv');
dotenv.config();

const db = require('../models/index.model');
const roleModel = db.role;

const { sign, verify } = require('jsonwebtoken');

const createTokens = (user) => {
   const accessToken = sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      {
         expiresIn: 1000 * 60 * 5, // 5 min
      }
   );

   return accessToken;
};

const validateToken = (req, res, next) => {
   const accessToken = req.cookies['access-token'];
   if (!accessToken) {
      return res.status(400).json({ error: '! يجب عليك تسجيل الدخول اولاً' });
   }

   try {
      const validToken = verify(accessToken, process.env.ACCESS_TOKEN);
      req.user = validToken;

      if (validToken) {
         req.authenticated = true;
         return next();
      }
   } catch (err) {
      return res.status(400).json({ error: err });
   }
};

const pageAuthorize = () => {
   return (req, res, next) => {
      const userRole = req.body.RoleId;
      roleModel.findOne({ where: userRole }).then((role) => {
         if (role.id == userRole) {
            next();
         } else {
            return res.status(200).json('! عذراً لا يمكنك اتمام العملية');
         }
      });
   };
};

module.exports = { createTokens, validateToken, pageAuthorize };
