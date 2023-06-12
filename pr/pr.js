function onBuyClicked() {
  var supportedInstruments = [{
    supportedMethods: 'https://google.com/pay',
    data: {
        apiVersion: 2,
        apiVersionMinor: 0,
        environment: 'TEST',
        allowedPaymentMethods: [{
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'DISCOVER', 'VISA', 'MASTERCARD'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              'gateway': 'example',
            },
          },
        }],
        transactionInfo: {
          countryCode: 'US',
          currencyCode: 'USD',
          totalPriceStatus: 'FINAL',
          totalPrice: '1.00',
        },
        merchantInfo: {
          merchantName: 'Example merchant Solomakhin',
        },
      }
  },
  {
      supportedMethods: 'https://apple.com/apple-pay',
      data: {
          version: 3,
          merchantIdentifier: 'merchant.com.apdemo',
          merchantCapabilities: [
              'supports3DS'
          ],
          supportedNetworks: [
              'amex',
              'discover',
              'masterCard',
              'visa'
          ],
          countryCode: 'US'
      }
    }];

  var details = {
    total: {
      label: 'Donation',
      amount: {
        currency: 'USD',
        value: '55.00'
      }
    },
    displayItems: [{
        label: 'Original donation amount',
        amount: {
          currency: 'USD',
          value: '65.00'
        }
      },
      {
        label: 'Friends and family discount',
        amount: {
          currency: 'USD',
          value: '-10.00'
        }
      },
      {
        label: 'Free worldwide shipping',
        amount: {
          currency: 'USD',
          value: '0.00'
        }
      }
    ],
    shippingOptions: [{
      id: 'freeShippingOption',
      label: 'Free worldwide shipping',
      amount: {
        currency: 'USD',
        value: '0.00'
      },
      selected: true
    }]
  };

  var options = {
    requestShipping: true,
    shippingType: "delivery"
  };

  if (!window.PaymentRequest) {
    console.error('PaymentRequest API is not supported.');
    return;
  }

  try {
    var request = new PaymentRequest(supportedInstruments, details, options);

    if (request.canMakePayment) {
      request.canMakePayment().then(function(result) {
        console.log(result ? "Can make payment" : "Cannot make payment");
      }).catch(function(err) {
        error(err);
      });
    }

    if (request.hasEnrolledInstrument) {
      request.hasEnrolledInstrument().then(function(result) {
        console.log(result ? "Has enrolled instrument" : "No enrolled instrument");
      }).catch(function(err) {
        console.error(err);
      });
    }

    request.addEventListener('shippingaddresschange', function(e) {
      e.updateWith(new Promise(function(resolve) {
        // No changes in price based on shipping address change.
        resolve(details);
      }));
    });

    request.addEventListener('shippingoptionchange', function(e) {
      e.updateWith(new Promise(function(resolve) {
        resolve(details);
      }));
    });

    request.show()
      .then(function(instrumentResponse) {
          instrumentResponse.complete('success')
            .then(function() {
              console.log('This is a demo website. No payment will be processed.', instrumentResponse);
            })
            .catch(function(err) {
              console.error(err);
            });
      })
      .catch(function(err) {
        console.error(err);
      });
  } catch (e) {
    console.error('Developer mistake: \'' + e.message + '\'');
  }
}