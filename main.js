
const otMeta = document.createElement('meta');
otMeta.httpEquiv = 'origin-trial';
otMeta.content = 'AsMgTuvMft2My/+ti9JRH6mlE4BoHnJoAYtTiBrDeUywtoBRISsXp19XNOOVKcVml8izx9ECNSo0MwGtPEnLuQEAAABpeyJvcmlnaW4iOiJodHRwczovL2RtZW5nZWx0LmdpdGh1Yi5pbzo0NDMiLCJmZWF0dXJlIjoiUGF5bWVudEhhbmRsZXJNaW5pbWFsSGVhZGVyVVgiLCJleHBpcnkiOjE3MDE5OTM1OTl9';
document.head.append(otMeta);


/**
 * Define the version of the Google Pay API referenced when creating your
 * configuration
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|apiVersion in PaymentDataRequest}
 */
const baseRequest = {
  apiVersion: 2,
  apiVersionMinor: 0
};

/**
 * Card networks supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm card networks supported by your site and gateway
 */
const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];

/**
 * Card authentication methods supported by your site and your gateway
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 * @todo confirm your processor supports Android device tokens for your
 * supported card networks
 */
let allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];

/**
 * Identify your gateway and your site's gateway merchant identifier
 *
 * The Google Pay API response will return an encrypted payment method capable
 * of being charged by a supported gateway after payer authorization
 *
 * @todo check with your gateway on the parameters to pass
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#gateway|PaymentMethodTokenizationSpecification}
 */
const tokenizationSpecification = {
  type: 'PAYMENT_GATEWAY',
  parameters: {
    'gateway': 'ariane',
    'gatewayMerchantId': 'exampleGatewayMerchantId'
  }
};

/**
 * Describe your site's support for the CARD payment method and its required
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
let baseCardPaymentMethod = {
  type: 'CARD',
  parameters: {
    allowedAuthMethods: allowedCardAuthMethods,
    allowedCardNetworks: allowedCardNetworks,
    cvcRequired: false
  }
};

/**
 * Describe your site's support for the CARD payment method including optional
 * fields
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#CardParameters|CardParameters}
 */
const cardPaymentMethod = Object.assign(
    {},
    baseCardPaymentMethod,
    {
      tokenizationSpecification: tokenizationSpecification
    }
);

let existingPaymentMethodRequiredValue = false;

/**
 * Configure your site's support for payment methods supported by the Google Pay
 * API.
 *
 * Each member of allowedPaymentMethods should contain only the required fields,
 * allowing reuse of this base request when determining a viewer's ability
 * to pay and later requesting a supported payment method
 *
 * @returns {object} Google Pay API version, payment methods supported by the site
 */
function getGoogleIsReadyToPayRequest() {
  return Object.assign(
      {},
      baseRequest,
      {
        allowedPaymentMethods: [baseCardPaymentMethod],
        existingPaymentMethodRequired: existingPaymentMethodRequiredValue
      },
  );
}

/**
 * Configure support for the Google Pay API
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#PaymentDataRequest|PaymentDataRequest}
 * @returns {object} PaymentDataRequest fields
 */
function getGooglePaymentDataRequest() {
  const paymentDataRequest = Object.assign({}, baseRequest);
  paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
  paymentDataRequest.allowedPaymentMethods[0].parameters.assuranceDetailsRequired = true;
  paymentDataRequest.merchantInfo = {
    // @todo a merchant ID is available for a production environment after approval by Google
    // See {@link https://developers.google.com/pay/api/web/guides/test-and-deploy/integration-checklist|Integration checklist}
    // merchantId: '01234567890123456789',
    merchantName: 'Example Merchant'
  };

  return paymentDataRequest;
}

let environmentValue = 'TEST';
let buttonColor = 'default';
let buttonType = 'buy';

/**
 * Return an active PaymentsClient or initialize
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
 * @returns {google.payments.api.PaymentsClient} Google Pay API client
 */
function getGooglePaymentsClient() {
  return new google.payments.api.PaymentsClient({
    environment: environmentValue
  });
}

function existingPaymentMethodRequired(event) {
  existingPaymentMethodRequiredValue = (event.target.value === 'true');
  onGooglePayLoaded();
}

function buttonShape(event) {
  const buttonContainers = document.querySelectorAll(
      ".gpay-card-info-container.black, .gpay-card-info-animation-container.black");
  if (event.target.value === 'rectangular') {
    buttonContainers.forEach(element => {
      element.classList.add("gpay-border-radius");
    });
  } else {
    buttonContainers.forEach(element => {
      element.classList.remove("gpay-border-radius");
    });
  }
}

function allowedAuthMethods(event) {
  if (event.target.value === 'PAN_ONLY_CRYPTOGRAM_3DS') {
    baseCardPaymentMethod.parameters.allowedAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
  } else {
    baseCardPaymentMethod.parameters.allowedAuthMethods = [event.target.value]
  }
  onGooglePayLoaded();
}

function gateways(event) {
  if (event.target.value === 'stripe') {
    // special handling for Stripe. the publishable key is a publicly available key from their docs
    tokenizationSpecification.parameters = {
      ...tokenizationSpecification.parameters,
      'stripe:version': '2022-11-15',
      'stripe:publishableKey': 'pk_test_TYooMQauvdEDq54NiTphI7jx'
    };
    delete tokenizationSpecification.parameters.gatewayMerchantId;
  }

  if (event.target.value === 'braintree') {
    // special handling for braintree. Please use your own tokenization key.
    // https://developer.paypal.com/braintree/docs/guides/authorization/tokenization-key
    tokenizationSpecification.parameters = {
      ...tokenizationSpecification.parameters,
      'braintree:apiVersion': 'v1',
      'braintree:sdkVersion': 'braintree.client.3.40.0',
      'braintree:merchantId': 'qdm7byww9wgjx3xq',
      'braintree:clientKey': 'sandbox_x64tmbjf_qdm7byww9wgjx3xq'
    };
    delete tokenizationSpecification.parameters.gatewayMerchantId;
  }

  if (event.target.value === 'arianev2') {
    baseCardPaymentMethod.parameters.cvcRequired = true;
  }

  tokenizationSpecification.parameters.gateway = event.target.value;
  onGooglePayLoaded();
}

function environments(event) {
  environmentValue = event.target.value;
  onGooglePayLoaded();
}

function buttonColors(event) {
  buttonColor = event.target.value;
  onGooglePayLoaded();
}

function buttonTypes(event) {
  buttonType = event.target.value;
  onGooglePayLoaded();
}

/**
 * Initialize Google PaymentsClient after Google-hosted JavaScript has loaded
 *
 * Display a Google Pay payment button after confirmation of the viewer's
 * ability to pay.
 */
function onGooglePayLoaded() {
  document.querySelectorAll("input[name='existingPaymentMethodRequired']").forEach((input) => {
    input.addEventListener('change', existingPaymentMethodRequired);
  });

  /*
  document.querySelectorAll("input[name='buttonShape']").forEach((input) => {
    input.addEventListener('change', buttonShape);
  });
  */

  document.querySelectorAll("input[name='allowedAuthMethods']").forEach((input) => {
    input.addEventListener('change', allowedAuthMethods);
  });

  document.querySelectorAll("select[name='gateways']").forEach((input) => {
    input.addEventListener('change', gateways);
  });

  document.querySelectorAll("select[name='environments']").forEach((input) => {
    input.addEventListener('change', environments);
  });

  document.querySelectorAll("select[name='buttonColors']").forEach((input) => {
    input.addEventListener('change', buttonColors);
  });

  document.querySelectorAll("select[name='buttonTypes']").forEach((input) => {
      input.addEventListener('change', buttonTypes);
    });

  document.getElementById('isRTPrequest').innerHTML = JSON.stringify(
      getGoogleIsReadyToPayRequest(), null, 2);
  const paymentsClient = getGooglePaymentsClient();

  paymentsClient.isReadyToPay(getGoogleIsReadyToPayRequest())
      .then(res => {
        document.getElementById('log').innerHTML = JSON.stringify(res, null, 2);
        if (res.result) {
          addGooglePayButton();
        } else {
          addGooglePayButton();
        }
      })
      .catch(function (err) {
        // show error in developer console for debugging
        console.error(err);
      });

}

/**
 * Add a Google Pay purchase button alongside an existing checkout button
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#ButtonOptions|Button options}
 * @see {@link https://developers.google.com/pay/api/web/guides/brand-guidelines|Google Pay brand guidelines}
 */
function addGooglePayButton() {
  const paymentsClient = getGooglePaymentsClient();
  renderButton(paymentsClient, document.getElementById('container'), allowedCardNetworks);
  renderButton(paymentsClient, document.getElementById('container2'), ["AMEX"])
  renderButton(paymentsClient, document.getElementById('container3'), ["MASTERCARD"])
  renderButton(paymentsClient, document.getElementById('container4'), ["VISA"])
}

function renderButton(paymentsClient, element, allowedCardNetworks) {
  const button =
      paymentsClient.createButton({
        buttonColor: buttonColor,
        buttonType: buttonType,
        onClick: onGooglePaymentButtonClicked,
        allowedPaymentMethods: [{
          "type": "CARD",
          "parameters": {
            "allowedAuthMethods": ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            "allowedCardNetworks": allowedCardNetworks
          }

        }]
      });

  if (element.firstChild) {
    element.replaceChild(button, element.firstChild);
  } else {
    element.appendChild(button);
  }

}

/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/request-objects#TransactionInfo|TransactionInfo}
 * @returns {object} transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
function getGoogleTransactionInfo() {
  return {
    countryCode: 'US',
    currencyCode: "USD",
    totalPriceStatus: "FINAL",
    totalPrice: "13.37",
    checkoutOption: "COMPLETE_IMMEDIATE_PURCHASE"
  };
}

/**
 * Show Google Pay payment sheet when Google Pay payment button is clicked
 */
function onGooglePaymentButtonClicked() {
  const paymentDataRequest = getGooglePaymentDataRequest();

  if(environmentValue === 'PRODUCTION') {
    paymentDataRequest.merchantInfo.merchantId = '14697717800897553235';
  }

  console.log(JSON.stringify(paymentDataRequest, null, 2));
  paymentDataRequest.transactionInfo = getGoogleTransactionInfo();

  paymentDataRequest.emailRequired = true;
  paymentDataRequest.shippingAddressRequired = true;
  paymentDataRequest.shippingAddressParameters = {
    phoneNumberRequired: true
  }

  paymentDataRequest.shippingOptionRequired = true;

  paymentDataRequest.shippingOptionParameters = {
    defaultSelectedOptionId: "shipping-001",
    shippingOptions: [
      {
        "id": "shipping-001",
        "label": "$0.00: Free worldwide shipping",
        "description": "Free Shipping delivered in 5 business days."
      }
    ]
}

  const paymentsClient = getGooglePaymentsClient();
  //paymentsClient.loadPaymentData(paymentDataRequest);

  paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
    let paymentToken = paymentData.paymentMethodData.tokenizationData.token;
    document.getElementById('result').innerHTML = JSON.stringify(paymentData, null, 2);
    console.log("loadPaymentData success");
  }).catch(function (err) {
    console.error(err);
  });
}