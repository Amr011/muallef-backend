// search query
const term = req.query; // string

// pagenation query
const page = req.query; // number
const limit = req.query; // number

// Filter query
const newest = req.query; // boolean
const topSaller = req.query; // boolean
const topRated = req.query; // boolean

// SQL operators
var attarbutes = [];
var include = [];
var order = [];
var group = [];

if (newest) {
  order = [['createdAt', 'DESC']];
  attarbutes = ['id', 'name', 'createdAt']; // Get createdAt Field
  include = []; // no include
  group = []; // no group
}
if (topSaller) {
  order = [['salles', 'DESC']]; // Order Data By Top Saller
  attarbutes = ['id', 'name', 'Salles']; // Get Salles count
  include = [{ model: 'orderDetails', attarbutes: [] }]; // Include Order Without Data
  group = ['id']; // group data
}
if (topRated) {
  order = [['rate', 'DESC']]; // Order Data By Top Saller
  attarbutes = ['id', 'name', 'Rate']; // Get Salles count
  include = [{ model: 'review', attarbutes: [] }]; // Include Order Without Data
  group = ['id']; // group data
}

// Get All Products include , where , atterbutes , order , group
const productData = productModel.findAll({
  include,
  attarbutes,
  order,
  group,
  where,
});
// forEach product assign data where product id
productData.forEach((product, index) => {
  if (topSaller && !topRated) {
    // assign review data only if
    const reviewData = reviewModel.findAll({
      where: [product.id],
    });
    productData.setDataValue('reviewData', reviewData);
  }
  if (topRated && !topSaller) {
    // assign salles data only if
    const sallesData = orderDetailModel.findAll({
      where: [product.id],
    });
    productData.setDataValue('salesData', sallesData);
  }

  if (index === productData.length - 1) {
    // resopnse data
  }
});

/**
 *
 *
 *
 *
 *
 */

/*
    Algorithem Say's : 

    include review Data in Product Reviews




 */
