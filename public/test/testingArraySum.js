const data = [
  {
    id: 1,
    name: "Meriam",
    model: {
      id: 1,
      name: "firstModel",
      //   price: 50,
    },
  },
  {
    id: 2,
    name: "Samira",
    model: {
      id: 2,
      name: "secoundModel",
      //   price: 90,
    },
  },
  {
    id: 3,
    name: "Diva-Mehshi",
    model: {
      id: 3,
      name: "thirdModel",
      //   price: 120,
    },
  },
  {
    id: 4,
    name: "Em Johad",
    model: {
      id: 4,
      name: "forthModel",
      //   price: 40,
    },
  },
];

const totalPriceSum = () => {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    total = total + data[i].model.price;
  }
  if (total) {
    return total;
  } else {
    return 0;
  }
};

let money = Math.PI;

var roundedString = money.toFixed(2);
console.log(money);
