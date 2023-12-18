document.addEventListener('DOMContentLoaded', function() {
var style = {
  base: {
    color: '#535353',
    lineHeight: '18px',
    fontFamily: 'sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, 0.26)',
      fontSize:'15px'
    }
  },
  invalid: {
    color: 'red'
  }
};
// input labels/placeholders
var labels = {
    cardNumber:"Card Number",
    expirationDate:"MM/YY",
    cvv:"CVV",
    cardHolder:"Card Holder Name"
  };
//payment options
var paymentOptions = {
  currencyCode:["KWD","USD","SAR"],
  labels : labels,
  TextDirection:'ltr'
}



//pass your public key from tap's dashboard
var tap = Tapjsli('pk_test_EtHFV4BuPQokJT6jiROls87Y');
console.log(tap)
var elements = tap.elements({});
//create element, pass style and payment options
var card = elements.create('card', {style: style},paymentOptions);
//mount element
console.log(card);
card.mount('#element-container');
console.log("testing",card);
//card change event listener
card.addEventListener('change', function(event) {
  console.log("Inside UI loaded")

  if(event.BIN){
    console.log(event.BIN)
  }
  if(event.loaded){
    console.log("UI loaded :"+event.loaded);
    console.log("current currency is :"+card.getCurrency())
  }
  var displayError = document.getElementById('error-handler');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission
var form = document.getElementById('form-container');
form.addEventListener('submit', function(event) {
  event.preventDefault();
    console.log("card ->", card)
  tap.createToken(card).then(function(result) {
    console.log(result);
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('error-handler');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      var errorElement = document.getElementById('success');
      errorElement.style.display = "block";
      var tokenElement = document.getElementById('token');
      tokenElement.textContent = result.id;
      console.log(result.id);
    }
  });
});

var copyButton = document.getElementById('copyButton');
copyButton.addEventListener('click', function () {
    // Use the Clipboard API to copy the text content of the span to the clipboard
    var tokenElement = document.getElementById('token');

    var x = navigator.clipboard.writeText(tokenElement.textContent)
    console.log(x)
    // .then(function () {
    //     // You can provide feedback to the user, for example:
    //     alert('Token copied to clipboard!');
    // })
    // .catch(function (err) {
    //     console.error('Unable to copy to clipboard', err);
    // });ocument.body.removeChild(textarea);
  })
});

