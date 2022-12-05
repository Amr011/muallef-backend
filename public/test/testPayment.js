const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "pk_test_51JRqn6L6FwyJWvwARfnlsEr99PQivxw3JhfLTpspX8MfSc2MQby1LF5AUJ7PMWV1AEwdAulWHY4Ks86NA27B8m0a001yEDyy1a"
);

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.get("/pay", (req, res) => {
  const amount = 2500;
  const customerId = 244;

  stripe.customers
    .create({
      email: "req.body.stripeEmail",
      source: "req.body.stripeToken",
    })
    .then((customer) =>
      stripe.charges.create({
        amount,
        description: "Web Development Ebook",
        currency: "usd",
        customer: customerId,
      })
    )
    .then((charge) => res.js("success"));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
