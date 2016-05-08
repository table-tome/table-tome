angular.module('settings.controller', [])
  .controller('settingsCtrl', ['$scope', 'auth', 'User', function($scope, auth, User) {

    $scope.auth = auth;

    $scope.username = '';
    $scope.changeUsername = function() {
      console.log($scope.username);
    };

    $scope.about_me = '';
    $scope.changeAboutMe = function() {
      console.log($scope.about_me);
    };

    $scope.resetPassword = function() {
      auth.reset();
    };

  }]);
