function paginate(req, res, next) {
  var perPage = 9
  var page = req.params.page - 1
  Product.find()
    .skip(perPage * page)
    .limit(perPage)
    .populate('category')
    .exec(function (err, products) {
      if (err) return next(err)
      Product.count().exec(function (err, count) {
        if (err) return next(err)
        res.render('main/product-main', {
          products: products,
          pages: count / perPage,
        })
      })
    })
}
