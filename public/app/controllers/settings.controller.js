angular.module('settings.controller', [])
  .controller('settingsCtrl', ['$scope', '$window', 'auth', 'User', function($scope, $window, auth, User) {
    $scope.auth = auth;

    $scope.about_me = '';
    $scope.changeAboutMe = function() {
      console.log($scope.about_me);
      User.updateAboutMe($scope.about_me).success(function(data) {
        $window.location.reload();
      });
    };

    $scope.resetPassword = function() {
      auth.reset();
    };

  }]);
