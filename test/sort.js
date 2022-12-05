const order = ['foo', 'bar', 'baz'];
const data = [
  { name: 'foo', score: 8 },
  { name: 'baz', score: 4 },
  { name: 'baz', score: 9 },
  { name: 'foo', score: 6 },
  { name: 'bar', score: 9 },
];
function sortArray(data, order) {
  const sortedArr = Array.from(data).sort(
    ({ name: name1, score: score1 }, { name: name2, score: score2 }) => {
      return name1 === name2
        ? score2 - score1
        : order.indexOf(name1) - order.indexOf(name2);
    }
  );
  return sortedArr;
}
console.log('***Sorted Array***');
console.log(sortArray(data, order));
console.log('***Original Array***');
console.log(data);
