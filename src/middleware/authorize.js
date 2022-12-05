const db = require('../models/index.model')
const userModel = db.user

const pageAuthorize = async (req, res, next) => {
  try {
    const userId = req.user.id
    let userData = await userModel.findAll({
      where: { id: userId, isAdmin: true },
    })
    if (userData.length >= 1) {
      return next()
    } else {
      return res.status(400).json({
        success: false,
        message: '! ليس لديك الصلاحيات للوصول',
      })
    }
  } catch (err) {
    console.log(err)
    return res.status(200).json({
      err: err,
    })
  }
}

module.exports = pageAuthorize
