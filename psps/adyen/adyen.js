  async function adyenDropIn() {

    const configuration = {
      environment: 'test', // Change to one of the environment values specified in step 4.
      clientKey: 'test_K76GOD6MOJBM7N6LFCQI4S4JVMSVIV6N', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      analytics: {
        enabled: true // Set to false to not send analytics data to Adyen.
      },
      session: {
        id: 'CSEC8B331740AE0EDC', // Unique identifier for the payment session.
        sessionData: 'Ab02b4c0!BQABAgBwlSUIhU8Y8tFj9euCPjiVKiH7Z3cuup5FNTkpGhO+z47bvfEuvJtV7jLGrS55rRqTxLNhkSWWdamIzHI7tGC04xGx57Qd\/1LslSTiVKxESIwPBRP1hw3DlXEu+ygS6Q2xH7hMGGQzI3qvTFlKyXJk35vfaZuFl1zx6fgSdinaLjSid6vjr+3QAgrCN6BhhgP1JB3+jdwjX1ZcIu00NrlKrPu45WiK2d1VCzsSjTrOc8h7kjkEwx3rxK2SLMWouc8Q24VAuPBzicvvU5RinpW9NFbZ8wvGlJMK2iVPZ5LM00wotBGCDovNJ4pow7v7KgDl8Et2nPCv0\/eUJ8obOKwpwTRvrBdVaWCFIiEIn4ZNZd\/wPD9EUxGSHCEh59YztRdYy6lIrn8zyEoTL9vCS49L3+VHUCyML\/3dHfbgja0w0EMjQy9wIoG2haVBnhvPvp6bDLl7zE6+C0Zx4KtsUvz8hg7sm\/FUEFO4bY55kfmhMh2GDcpnaqbOm4r0fbj9w\/J565d2ftd3wMUYJ0\/GxiyM2zdFEeQ1vZe1\/oxHXox5x9lLZzLkEWxvKbJwaoga72Gi54CtouMa9MAqi4JRnMFqoHtqBW7Qz5UH8xjqwLBq5OlpbHAJ2xfdoyW3K9uc8h3LLvI47s+xhF9bHdgmFGiKRTUYklh705qf0MfVMuxfvQxsLpzOK8zOBnwfjmoASnsia2V5IjoiQUYwQUFBMTAzQ0E1MzdFQUVEODdDMjRERDUzOTA5QjgwQTc4QTkyM0UzODIzRDY4REFDQzk0QjlGRjgzMDVEQyJ9kqfHEqmmfyGWKCGnOMSs\/C5qWzjoZS3EJuduHGGr21TkQOQ\/tPzsGnnAODNJemMYVBNtsDJrkCx5IlvjJb0kysC7VmujBbKSKzaHk3ZhF7sfQHVVtx1TiY4yGIcAjTLoQvVcsQB3IvQbFcBX5GuDbqXr0Hx64g3f9jd5aXdL6o6umrMPoRW3BhwXNwh4pji3Eq+83\/AqdotBCI7+q9MeB5qSdQP1YMl19UcsMPSokQZap9IoCBzZZXzTIG7aHMuqSZLosqi4X4Con4yIPOpM0HyHnGuaZ3yZioN5MHKFKtETbM5z34+GDn1nG7GhQbCWPvot1akk1V57\/DuWrgwE\/s\/UT28mglCHUrH8pytUGCW2GUvG99Skztmbav2AUPH6ilJW0DclY5IIiGsrAGaZL4CZsiV+R98sD05cwxKpJo\/omYlKvRLq7FcO1aFABiT6QSk2jJ\/y6wsnt6ddAkEVovQqhvGSTWaWNU9g3e+CYmK4YF+phWqOmx6wV2o2QPLOOrRDmiIQtffIK3kpjvX9oXUhMLw0ltQOR3SldHlQG51hRdVgV12ukTy9i9YFcUgtSWkKzuIuRg3zV5I6Lw3JgAxx\/mN\/vhXhOg=='
      },
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      },
      // Any payment method specific configuration. Find the configuration specific to each payment method:  https://docs.adyen.com/payment-methods
      // For example, this is 3D Secure configuration for cards:
      paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true
        },
        paywithgoogle: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          buttonType: 'pay'
        }
      }
    };

    // Create an instance of AdyenCheckout using the configuration object.
    const checkout = await AdyenCheckout(configuration);

    const dropin = checkout.create('dropin', {
      // ... other optional configuration
      // For v5.30.0 or later: you can also use the value googlepay.
      //instantPaymentTypes: ['googlepay']

    }).mount('#googlepay-container');

//    const googlePayComponent = checkout.create('googlepay');
//    googlePayComponent
//       .isAvailable()
//       .then(() => {
//           googlePayComponent.mount("#googlepay-container");
//       })
//       .catch(e => {
//           //Google Pay is not available
//       });
  }
