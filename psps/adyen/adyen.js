  async function adyenDropIn() {

    const configuration = {
      environment: 'test', // Change to one of the environment values specified in step 4.
      clientKey: 'test_K76GOD6MOJBM7N6LFCQI4S4JVMSVIV6N', // Public key used for client-side authentication: https://docs.adyen.com/development-resources/client-side-authentication
      analytics: {
        enabled: true // Set to false to not send analytics data to Adyen.
      },
      session: {
        id: 'CSBF931123D492F2BD7B9E237', // Unique identifier for the payment session.
        sessionData: 'Ab02b4c0!BQABAgCmsbFZ+VOnC\/mRlTU5aiWYexLyPIsvd1BSNCMkgx+ENclBiLKmUrj1lFUyLJ0xHStzoOvezMTFfyZ8HLkdndsoO86MbjTMJo1If334SclHsYzUXpiTPaU8hq\/B6+73G4BhbRRuCcYQTVu+1U7q4HHfyQkKdqDPXrQGCpzFxGR9nXDO5\/j8pZC2pZd2fSvyCizmXeogVr5cG16JI35Sic\/nIBALUzqiWTvkR+LWqOvrGFrZW3Om7AT1i2OJ15Gh8L7gZyjHxW+6suMEe1SAlRTiDOz8TLAGg5aSN3HI8SqgRBENkAnQFOVxEI\/C1OuPpv6b52Uygxa6JQHWl3+2SCNe9\/AnvgDAKtEFOIv\/++8cLrCIkKgQ+TESPUW9HL6c4CSpZRZ6aFu2+gGPP0G343uIJeRNCoaBoSN6eDq7xo7brnzHfNdsPHzJz3F9ZLhLyHYcW1uky4kV7Sx5vyNXHYBxqxSBIt8XXiAkDSrscn59lg77jOH\/cBqXT7+xfmjtIvIt+Zs\/PicI3NM27Ii0q\/iE0R8c4sVt\/z0FoKJOeQMOIspul0M+k8RiYstbFbrZ7QQH7ua95mEXgw9U23Jy1crislRUe4p6bIFqdaLL13romN09aGu5L2bw9s0LMH7FN1As3sXyAYL\/Z2fYbtS2NJ22ySWG0RrDvBOzvY\/yLIAd6gx0DyE4xtoNnnP924oASnsia2V5IjoiQUYwQUFBMTAzQ0E1MzdFQUVEODdDMjRERDUzOTA5QjgwQTc4QTkyM0UzODIzRDY4REFDQzk0QjlGRjgzMDVEQyJ98V7avr3A7NEIZUF2Sco2Wtf\/GP9lDAF5GDi\/ooYOHVfaas7PcqoAYjHB6MTWrALuLFbkeveBeJz9BiE94Sa+ibcVVkw0cYZJQ2z4GU+vkVNg7pvEahmybrIq3+jVTYMBv1bqt4Ar7a1ymUNbio+NrA6YtAIYdbRAZf1OWEzG4mVuNs+PYvGQS+Iw3YljMJQ7Csf3eZCaCkI2bY\/uPbiWuED+3N68PEW6WVQttXZghN8mXEACRK58QiWLqpzw31KO79P69MOGslQBDZxVqQJ8hgOj4KVekcKimvZWdGrTjVlwoQwg5ItnQP3K46WDYINkbtBa+QWp2Oh7fEZVGaolVnk1mzlJv5HbzxyfIFPSfaP5n6ox3+8LulARPW1Yb\/CFyyCc3m2mM9EXzk0XtItbgusw8YeUdiQxx\/\/uQING3cLagOYcNXCLop6HuHXY0ko\/akbxOql5IJOjNEoJ20KEIHnV4Nbyj1RSF0zDZYs0FVE+zvzLTOEmRA6JxdQQ\/6gCLMZaSiKi0yc2+ernzsRKHgoUW0NSHWAVy7bKu9jVpi4VTN3b3VccC446x20HsLazKprqeEmmGmzDBRGijVvpQ0K5cFvZz1fd2X25imruAyfj\/l\/baS28RvjiFAMVWeVDcbeKaslFoabP+tQJcZXtH24oT5JRWM7o\/k3Uqs+z4lKa6kQv4bSPb3wSXk\/D6tLkl7eBXAHeCAT8KrhxXmDY\/la3eJc='
      },
      onPaymentCompleted: (result, component) => {
        console.info(result, component);
      },
      onAuthorized: (result, component) => {
        console.info(result, component);
      },
      onError: (error, component) => {
        console.error(error.name, error.message, error.stack, component);
      }
    };

    // Drop-in configuration.
    const dropInConfiguration = {
      // Configuration for individual payment methods.
       paymentMethodsConfiguration: {
        card: {
          hasHolderName: true,
          holderNameRequired: true,
          billingAddressRequired: true
        },
        paywithgoogle: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          buttonType: 'pay',
          onAuthorized: (result, component) => {
            console.info(result, component);
          }
        },
        instantPaymentTypes: ['applepay', 'googlepay'],
        googlepay: {
          onAuthorized: (result, component) => {
            console.info(result, component);
          }
        }
      }
    };

    const { AdyenCheckout, Dropin, Card, GooglePay, PayPal  } = window.AdyenWeb;

    // Create an instance of AdyenCheckout using the configuration object.
    const checkout = await AdyenCheckout(configuration);

    const dropin = new Dropin(checkout, dropInConfiguration).mount('#googlepay-container');


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
