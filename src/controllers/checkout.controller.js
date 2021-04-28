const config = require('../configs/stripe.config');
const stripe = require('stripe')(config.stripe.key)
require("regenerator-runtime/runtime");

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Order',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${config.stripe.vue_url}success`,
    cancel_url: `${config.stripe.vue_url}cancel`,
  });

  res.json({ id: session.id });
};
