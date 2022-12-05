var products = [
  {
    id: 82,
    name: 'مدونتنا',
    title: 'ترخيص موسّع',
    reviews: { rateCount: 0, rateAvg: null },
    salles: { sallesCount: 0 },
  },
  {
    id: 81,
    name: 'برمجتوتو',
    reviews: { rateCount: 2, rateAvg: '7.0000' },
    salles: { sallesCount: 8 },
  },
  {
    id: 80,
    name: 'برمجتوتو',
    reviews: { rateCount: 5, rateAvg: '6.0000' },
    salles: { sallesCount: 12 },
  },
];

products.sort((a, b) => {
  return b.reviews.rateAvg - a.reviews.rateAvg;
});

console.log(products);
/*








 * @productReviews Finder
 * @productSalles Finder
 */
response.products.forEach(async (product, index) => {
  var objReviews = await product.dataValues.reviews;
  var objSalles = await product.dataValues.salles;
  console.log({
    Salles: objSalles.dataValues,
    Reviews: objReviews.dataValues,
  });
});
