
angular.module('PassSafe').controller('PassSafeCtrl', ['$scope', 'Passwords', '$element', '$timeout', function($scope, Passwords, $element, $timeout) {

  $scope.decrypted = false;
  $scope.passwordList = [];
  $scope.passwd = '';
  $scope.createNew = !Passwords.isEmpty();

  $scope.create = function() {
    $scope.createNew = false;
    $scope.decrypted = true;
  };

  $scope.decrypt = function() {
    try {
      $scope.passwordList = Passwords.load($scope.passwd);
      $scope.decrypt_error = false;
      $scope.decrypted = true;
    } catch(err) {
      $scope.decrypt_error = err.message + '. Probably you typed a wrong password.';
    }
  };

  $scope.add = function() {
    $scope.passwordList.unshift({});
    $timeout(function() {
      $scope.$broadcast('add', $scope.passwordList[0]);
    });
  };

  $scope.changePassword = function() {
    // TODO: take this out of the controller!
    $('#changePasswordModal').modal('hide');
    $scope.passwd = $scope.newPasswd;
    $scope.save();
  };

  $scope.save = function() {
    Passwords.save($scope.passwd, $scope.passwordList);
  };

}]);