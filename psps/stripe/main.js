const stripe = Stripe('pk_test_51Mg8nWA9tv049KWdCFQOwUElIVS3FvQLaGlugWfltUCuTjp4oj5oLkH5pq26W4cTr5GscxAgNaKAMA3z85j6GZUW00D54sM83r', {
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
    document.getElementById('payment-request-button').style.display = 'none';
  }
})();