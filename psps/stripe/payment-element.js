const stripe = Stripe('pk_test_51Mg8nWA9tv049KWdCFQOwUElIVS3FvQLaGlugWfltUCuTjp4oj5oLkH5pq26W4cTr5GscxAgNaKAMA3z85j6GZUW00D54sM83r', {
    apiVersion: "2024-04-10",
});

const appearance = {
  theme: 'flat'
}

// fetch this from your backend
const clientSecret = 'pi_3PxQfrA9tv049KWd1lF1KTcm_secret_p583E7HMkQcbpPjZ1xdVJARPr';

const elements = stripe.elements({ clientSecret, appearance });

const options = {
  layout: {
    type: 'accordion',
    defaultCollapsed: false,
    radios: false
  }
};

const expressCheckoutElement = elements.create('payment', options)
expressCheckoutElement.mount('#payment-element')