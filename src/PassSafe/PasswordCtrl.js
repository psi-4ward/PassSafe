angular.module('PassSafe').controller('PasswordCtrl', ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
  $scope.editing = false;

  $scope.toggleEditing = function(state) {
    if(typeof state != 'undefined') $scope.editing = state;
    else $scope.editing = !$scope.editing;
    if($scope.editing) {
      $timeout(function() {
        $element.find('input:first').focus();
      });
    }
  };

  $scope.endEditOnEnter = function(ev) {
    if(ev.keyCode == 13) {
      ev.preventDefault();
      $scope.toggleEditing(false);
    }
    if(ev.keyCode == 9 && jQuery(ev.target).hasClass('pass')) {
      $scope.toggleEditing(false);
      ev.preventDefault();
      $scope.add();
    }
  };

  $scope.remove = function() {
    var index = $scope.passwordList.indexOf($scope.item);
    if(index < 0) return alert('Error: Item not found!');
    $scope.passwordList.splice(index, 1);
  };

  $scope.$on('add', function(scope, item) {
    if(item == $scope.item) {
      $scope.toggleEditing(true);
    }
  })

}]);