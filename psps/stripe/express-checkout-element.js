const stripe = Stripe('pk_test_51Mg8nWA9tv049KWdCFQOwUElIVS3FvQLaGlugWfltUCuTjp4oj5oLkH5pq26W4cTr5GscxAgNaKAMA3z85j6GZUW00D54sM83r', {
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
    googlePay: 'buy',
    paypal: 'buynow'
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