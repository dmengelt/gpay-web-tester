  async function adyenDropIn() {

    const configuration = {
      environment: 'test', // Change to one of the environment values specified in step 4.
      clientKey: 'test_K76GOD6MOJBM7N6LFCQI4S4JVMSVIV6N', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      analytics: {
        enabled: true // Set to false to not send analytics data to Adyen.
      },
      session: {
        id: 'CS78FD34EBF93DB410', // Unique identifier for the payment session.
        sessionData: 'Ab02b4c0!BQABAgBeG1Gh3xgY5S+YFoMsn83zBBcTTEMSf8dww4OSY+3zs9tWX2fBxY4e6X8z+XBg\/eLoo1smc4HpuNVgGFgbTtj\/oiIyfEOiWF5MRuKV3WLFKqrraubjqkWosBJ7DYwRsamMj28xRA+PiAgNVVp2qCYjVZjGoD2qCR0IJ7cpbqTbT\/vTH\/2k3loE01j9NoKrYwBI6rUAQvGBqTNnuxIN8aE1HOJEbJfQ1pt7NK6JQ6pVNPhj1zL9dL6IbZiuBYwhdw+EUxfIL3B7uEccW1gbs9fQocH3ZqzqSD5I5d0F02i44fUfV4jFRQModX8d9PEzAQ0wKNFxEHDYUBmx2LlSkVIDYcVQ3HZ1cLhamG\/K4lewbPeHhWpVlqOB9j0lXN4Fhgri5NZLF2uq1TDTyKwLX1CUYaAOiqbNcVr2KVxKbhbvL6EaslNRlyC915dAQdIo7Umw262huGPidIOJWrW5Z1iNAp3DUhy4epgF06qDTvdbt36Ud\/38KDPoOz90foTCA834hhNK3lT7OlPh4Rbdm6wNfe\/rei3QX6OZfDk4CW7r0FxTnPmmgTX7YX5X+6bPQebFqH6qBJALLMdVTfW3vBVLcIQsgUQMSWWOf4WTeKg74IBN2TTehBw2UzGuYmjgFWy3OfsZQpaf8kw38MP5JIAjV6HRjUzD6OZuml\/2MvhDJwyCNwTdm502x85b5q0ASnsia2V5IjoiQUYwQUFBMTAzQ0E1MzdFQUVEODdDMjRERDUzOTA5QjgwQTc4QTkyM0UzODIzRDY4REFDQzk0QjlGRjgzMDVEQyJ953Ci3GZRz6I0yBxodgIWS9jWgzKPudKevwz59qJtFXisuRP6OzyJOj2nhoU3CzfO1FxpKYIv4FLmAVAJYrNivmWqM2ZC+sT2Y8K6MgDxlz8PhX5gfrsDbwDHibYnPZ1MsfvnZWrR0TlpOvK3+i6Jfzbg32l+v+FwynWUWlEC\/Iuzt3qMvVfxoRbPHon86yxvnCiPj4EtXCA+Is51Hij\/97kL+3SnVtTe3u2zU1WWDjdVvOarMh3LfF2IciME+hJ\/Xrz1KjG9aupKC2dCrq5w3Fcn13\/2cd47jdjpwi2LCi+a4oPLegGsYvELstOzWpGS3ZwZgDqAX7Mk6f5Hmg2mh8WVAqMHkdo8IwzLQTva3FtGTmup+MFqYHSemWOtRIDAyOqgl8ujjKf9bh0T5weKROJxNk\/Gvs0X4IRqKZEFBuzixcfwtwj++qbCbYdwc0\/td3ykfC1LEXZOT7gqwfigKMYBSW9g4t4Aznm0AQdfKsxN2HkMl2G83Eatl2YGWfKYWlOd1IWgZn+XwtcNiR6QCuXbIYHXPEA+3Pr2vjitvbtRbCLP984EePCP0GIBRovdCuSoi1FQdw4RuG0JJVANmPdtjDhRWQA2Lg=='
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
