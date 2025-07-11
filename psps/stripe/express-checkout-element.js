const stripe = Stripe('pk_live_NkaQ1QQFUyXrPsCuOkzt3IeS', {
    apiVersion: "2024-04-10",
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

const expressCheckoutElement = elements.create('expressCheckout', expressCheckoutOptions)
expressCheckoutElement.mount('#express-checkout-element')