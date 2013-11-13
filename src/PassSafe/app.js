require('../vendor/ui.validate.js');

angular.module('PassSafe', ['ui.validate'])
  .directive('passwordMatch', require('./PasswordMatchDirective.js'));


require('./PasswordsProvider.js');
require('./PassSafeCtrl.js');
require('./PasswordCtrl.js');
window.triplesec = require('../vendor/triplesec-1.0.0-min.js');