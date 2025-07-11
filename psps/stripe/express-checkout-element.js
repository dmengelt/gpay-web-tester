const stripe = Stripe('pk_live_NkaQ1QQFUyXrPsCuOkzt3IeS', {
    apiVersion: "2025-06-30.basil",
});

const appearance = {
  theme: 'stripe',
  variables: {
    borderRadius: '36px',
  }
}

const expressCheckoutOptions = {
  buttonType: {
    applePay: 'buy',
    googlePay: 'plain',
    paypal: 'buynow'
  },
  paymentMethods: {
    amazonPay: 'never',
    googlePay: 'never',
    applePay: 'never',
    payPal: 'never',
    klarna: 'never'
  }
}

const elements = stripe.elements({
  mode: 'payment',
  amount: 100,
  currency: 'usd',
  appearance,
})

const expressCheckoutElement = checkout.createExpressCheckoutElement(expressCheckoutOptions);
expressCheckoutElement.on('confirm', (event) => {
  checkout.confirm({expressCheckoutConfirmEvent: event})
});
expressCheckoutElement.mount('#express-checkout-element');

/*
const expressCheckoutElement = elements.create('expressCheckout', expressCheckoutOptions)
expressCheckoutElement.mount('#express-checkout-element')
*/