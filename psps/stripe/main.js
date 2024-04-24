const stripe = Stripe('pk_live_NkaQ1QQFUyXrPsCuOkzt3IeS', {
    apiVersion: "2024-04-10",
  });

  const paymentRequest = stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Demo total',
      amount: 1099,
    },
    disableWallets: [
      'link'
    ],
    requestShipping: true,
    shippingOptions: [
      {
        id: 'free-shipping',
        label: 'Free shipping',
        detail: 'Arrives in 5 to 7 days',
        amount: 0,
      },
      {         
        id: 'fast-shipping',
        label: 'Fast worldwide shipping',
        detail: 'Fast Shipping delivered in 1-2 business days',
        amount: 10
      }
    ]
  });

const elements = stripe.elements();
const prButton = elements.create('paymentRequestButton', {
  paymentRequest,
});

(async () => {
  // Check the availability of the Payment Request API first.
  const result = await paymentRequest.canMakePayment();
  if (result) {
    prButton.mount('#payment-request-button');
  } else {
    console.log("### canMakePayment returned false!");   
    document.getElementById('payment-request-button').innerHTML = 'canMakePayment returned false!'
  }
})();