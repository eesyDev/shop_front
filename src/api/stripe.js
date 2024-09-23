const express = require('express');
const helmet = require('helmet');
import { loadStripe } from '@stripe/stripe-js';

const app = express();

const router = express.Router();
const stripe = require('stripe')('эsk_test_51McN7VEQc6TYnPrSLlam18XwKnXtCFnMG12UUK0QKFgxtVa4foX4CQa6CT4Wmcqum2zq9N40fIL35ucdiW9xY3Gk00mz9XDp53');

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-eval'"],  }
}));

router.post('/', async (req, res) => {
  const { cartItems } = req.body;
  try {
    const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [],
        line_items: req.body.cartItems.map((item) => {
            const img = item.image[0];
            return {
                price_data: { 
                    currency: 'eur',
                    product_data: { 
                      name: item.name,
                    },
                    unit_amount: item.price * 100,
                  },
                  adjustable_quantity: {
                    enabled: true,
                    minimum: 1,
                  },
                  quantity: item.quantity
            }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
    }
    const session = await stripe.checkout.sessions.create(params);
    res.status(200).json(session)
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;