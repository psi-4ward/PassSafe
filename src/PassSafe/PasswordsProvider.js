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

  this.$get = ['$q', '$timeout', function($q, $timeout) {
    // https://keybase.io/triplesec/
    return {

      /**
       * check if theres a ciphertext
       * @returns {boolean}
       */
      isEmpty: function() {
        return loader().length>0;
      },

      /**
       * Load the ciphertext using loader() and decrypt it
       * @param {string} passwd
       * @return $q
       */
      load: function(passwd) {
        var ciphertext = loader();
        var deferred = $q.defer();

        if(ciphertext.length > 1) {
          triplesec.decrypt({
            data: new triplesec.Buffer(ciphertext, "hex"),
            key: new triplesec.Buffer(passwd)
          }, function(err, buff) {
            if(err) return deferred.reject(err);
            deferred.resolve(angular.fromJson(buff.toString()));
          });
        } else {
          $timeout(function() {
            deferred.resolve([]);
          });
        }

        return deferred.promise;
      },

      /**
       * Encrypt the plaintext and push it to saver()
       * @param {string} passwd
       * @param {json} data
       */
      save: function(passwd, data) {
        data = angular.copy(data);

        triplesec.encrypt({
          data: new triplesec.Buffer(angular.toJson(data)),
          key: new triplesec.Buffer(passwd)
        }, function(err, buff) {
          if(err) throw err;
          saver(buff.toString('hex'));
        });
      }
    };
  }];

});