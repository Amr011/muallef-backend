const productData = [
  { id: 79, name: 'product 1' },
  { id: 80, name: 'product 2' },
  { id: 81, name: 'product 3' },
  { id: 82, name: 'product 4' },
];

const reviewData = [
  { productId: 79, rate: 6.7 },
  { productId: 80, rate: 3.1 },
  { productId: 81, rate: 9.5 },
  { productId: 82, rate: 4.4 },
];

productData.forEach(myFunction);

function myFunction(product, index, arr) {
  arr[index] = product.push(reviewData[index]);
}
console.log(productData);
