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
    prButton.mount('#payment-request-button');    
    //document.getElementById('payment-request-button').style.display = 'none';    
  }
})();