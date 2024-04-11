  async function adyenDropIn() {

    const configuration = {
      environment: 'test', // Change to one of the environment values specified in step 4.
      clientKey: 'test_K76GOD6MOJBM7N6LFCQI4S4JVMSVIV6N', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      analytics: {
        enabled: true // Set to false to not send analytics data to Adyen.
      },
      session: {
        id: 'CSF0E2C31C981DD711', // Unique identifier for the payment session.
        sessionData: 'Ab02b4c0!BQABAgA8y+PEjfThbk9tdv31SnMtTiQbjV+n094buKxWQvo8x8oKxdjKMGwDnexfRsQQc7gvUrPkwZfgxLnVmEPC3cCkz95iT6KLAzYfT4cpKSab9Q0ck0XHVxaiYVklO2CK6YqIMSXm4KlHPEDfzTIORfYqVNBzc+fv+S+mClcEgjteOt\/bWqy4X6kOA\/FsQCDCE2+Gzw5FI7pDi4YOXuJp64YjZRCp4EKlQ0+6aOfecvfoPFfpAd\/PrWIs0NcTDkhhOR8bTDWTrAPRfN0g+9197Etx77Q2uJPaWkuh8jNrV0pvnamnC2pLD+7bx1zvhLgsq+dImCMzJiNVRsoqoH9BMou2J2W7V5w+gPPk0TG0cqb9HGZ9xsHXE+i0glwof7M8ceJ5GmmYkxQz1EGr38JVrAW6Tf7xu5Wm5ltWE8MLjPspyMhjqqxUteddtiTtZOyB\/xr9QiAeiKTOt4KYDCLL0wDZ4hYx1\/IcfqEGn3bA7\/B5l4BngdEkPuAC0bX93Vv8GhjXu9pOSadiACD8mcCbZAtjkYC3KDb1a8AEneoyS8pfFsEQycvk8DZLrQcs1TJEdEp0t1IWfTUH1tgs0nE3OZ47iPIHfaVpIpxfYspCvKyHDKZLsX+YQekJ7GzLlGF5uIJ9TF77q5UPGnlNr+x3Jdm5smVV6YQoA3rR8v6kyw9yJwwiG7nh5nAh85BDLBEASnsia2V5IjoiQUYwQUFBMTAzQ0E1MzdFQUVEODdDMjRERDUzOTA5QjgwQTc4QTkyM0UzODIzRDY4REFDQzk0QjlGRjgzMDVEQyJ9aMqYjm3CxPbCJVbkKChQtLdPZvh\/j6yCp7YJDzIDOf3XIspnpds61\/N2sL7TeiIQZuGUicAkoPoy9fEA1SqDwUhA3XjiZc+Lust0DNesJxTv9UYED1ACAIRvWmZ+SPPIkV7rasSpFAezcXp1DHr2lF1jHDG4d\/vpTJ29i\/QJREDPKuzf93pv1tnYyPJZhuAb7L6wP\/WQtYYDDHEph4iUVcqGKLduDlnWFMZm8DjNV+IvBXlYnJwsQ1n0URCFzAlSnpVpDRWns2Em8Niv5ZNis9\/dkVjg6Jdb6h+LqUuLsfcT\/X8Tje\/bWgUN06aornTa+N9a8v0LNZEAkxSWFAMl7B0LLST7xzmm0CcjHGNDTOmywW5OJXzBSxPeLsBKB1KbfCdn0lL2SL\/5QstMBvg\/id6so0dlLLpcizaWBu\/wPPSyToLeYMgPQF78wRr2+L673GCIhz2DeWzUJ2rh3DVWgStQI6EI9oM3wXCtU1YebemR\/X5qFk1YY7lN34rhzh58wXdhl+5EjpKL2PKosKVl5nzcWjhTupQrzmr7Cu6EbP5dYAvZFGemJUjHJ7rWpAawiqGswxfXCAn493j8NR9MZ2TY+OCvsn3n4RA='
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
