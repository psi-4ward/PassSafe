window.sjcl = require('../vendor/sjcl.js');

// atob() and btoa() polyfill
var base64 = require('../vendor/base64.js');
if(typeof window.atob !== 'function') {
  window.atob = base64.atob;
  window.btoa = base64.btoa;
}


angular.module('PassSafe').provider('Passwords', function() {

  // overwrite this using angular.module('PassSafe').config('PasswordsProvider', ...
  var loader = function() { alert('Please provide an adapter!'); return ''; };
  var saver = function(ciphertext) { alert('Please provide an adapter!'); };

  // provide methods for .config()
  this.setLoader = function(fnk) {
    loader = fnk;
  };
  this.setSaver = function(fnk) {
    saver = fnk;
  };

  this.$get = function() {
    // cryptolib: http://bitwiseshiftleft.github.io/sjcl/
    return {

      /**
       * check if theres a ciphertext
       * @returns {boolean}
       */
      isEmpty: function() {
        return loader().length>1; // we use >1 here, a ciphertext is always much longer and some plugins (redmine) dont work with empty strings
      },

      /**
       * Load the ciphertext using loader() and decrypt it
       * @param {string} passwd
       * @return {Array}
       */
      load: function(passwd) {
        var ciphertext = loader();

        if(ciphertext.length > 1) {
          return angular.fromJson(sjcl.decrypt(passwd, atob(ciphertext)));
        }
        return [];
      },

      /**
       * Encrypt the plaintext and push it to saver()
       * @param {string} passwd
       * @param {Array} data
       */
      save: function(passwd, data) {
        data = angular.copy(data);
        saver(btoa(sjcl.encrypt(passwd, angular.toJson(data))));
      }
    };
  };

});