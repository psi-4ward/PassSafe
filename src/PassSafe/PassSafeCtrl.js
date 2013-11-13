
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
    Passwords.load($scope.passwd)
      .then(
      function(data) {
        $scope.passwordList = data;
        $scope.decrypt_error = false;
        $scope.decrypted = true;
      },
      function(err) {
        $scope.decrypt_error = err.message;
      });
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