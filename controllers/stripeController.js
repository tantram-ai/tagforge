const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { Subscription, User } = require('../models');

async function stripeWebhook(req, res) {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log('Stripe webhook signature verification failed', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'invoice.payment_succeeded' || event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.created') {
    const subscription = event.data.object;
    const customerId = subscription.customer;
    const stripeSubId = subscription.id;
    const status = subscription.status;
    const currentPeriodEnd = new Date(subscription.current_period_end * 1000);

    // Find subscription record and update; find user by stripeCustomerId
    const sub = await Subscription.findOne({ where: { stripeCustomerId: customerId }});
    if (sub) {
      sub.status = status;
      sub.stripeSubscriptionId = stripeSubId;
      sub.currentPeriodEnd = currentPeriodEnd;
      await sub.save();
    } else {
      // You may have logic to create new subscription row
      await Subscription.create({ stripeCustomerId: customerId, stripeSubscriptionId: stripeSubId, status, currentPeriodEnd });
    }
  }

  // handle canceled etc.
  res.json({ received: true });
}

module.exports = { stripeWebhook };
