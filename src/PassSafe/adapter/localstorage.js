function supports_html5_storage() {
  try { return 'localStorage' in window && window['localStorage'] !== null; }
  catch(e) { return false; }
}
if(!supports_html5_storage()) {
  alert('Sorry, your old Browser has no localStorage! Go and get a HTML5 Browser... bye');
  document.location.href = 'http://www.google.de/intl/de/chrome/browser/';
}


// configure saver() and loader() for PasswordsProvider
angular.module('PassSafe').config(['PasswordsProvider', function(PasswordsProvider) {

  // fetch the ciphertext from the div
  PasswordsProvider.setLoader(function() {
    return localStorage.getItem("PassSafe") || '';
  });

  // ajax POST the new ciphertext and reload the page
  PasswordsProvider.setSaver(function(ciphertext) {
    localStorage.setItem("PassSafe", ciphertext);
    alert('Ciphertext was saved to your localStorage');
  });
}]);
