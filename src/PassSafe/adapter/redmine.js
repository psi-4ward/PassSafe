// Adjust the ifrmae height
function setIframeHeight() {
  var iframe = window.parent.jQuery('iframe');
  iframe.height(jQuery(document.body).height() + 30);
}
jQuery(function() {
  setIframeHeight();
  jQuery('#PassSafe').scope().$watch('passwordList.length', function() {
    // perhaps theres a better way doing this?
    setTimeout(function() {
      setIframeHeight();
    },10);
  });
});

// configure saver() and loader() for PasswordsProvider
angular.module('PassSafe').config(function(PasswordsProvider) {

  // fetch the ciphertext from the div
  PasswordsProvider.setLoader(function() {
    return window.parent.jQuery('div.passsafe').html();
  });

  // ajax POST the new ciphertext and reload the page
  PasswordsProvider.setSaver(function(ciphertext) {
    var section = jQuery(window.parent.jQuery('div.passsafe').prevAll('.contextual')[0]).find('a').attr('href').match(/section=(\d+)/)[1];
    var headline = window.parent.jQuery('div.passsafe').prevAll('h1,h2,h3')[0];
    var headlineText = headline.innerText;
    headline = headline.tagName.toLowerCase();

    var body = headline + ". " + headlineText + "\n\n" + '{{passsafe(' + ciphertext + ')}}';
    var token = window.parent.jQuery('meta[name=csrf-token]').attr('content');

    $.post(window.parent.document.location.href,
      {
        '_method': "put",
        'authenticity_token': token,
        section: section,
        'content[text]': body
      })
      .done(function() {
        parent.window.location.reload();
      })
      .fail(function() {
        alert('AJAX POST Error, see Javascript Console for details.');
        console.log('ERR', arguments);
      });
  });
});
