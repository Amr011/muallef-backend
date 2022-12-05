const forsaData = require('./foras.json');
const forsaCompaiesData = require('./companies.json');

forsaCompaiesData.companies.forEach(async (elment, index) => {
  console.log(elment.Name);
});
