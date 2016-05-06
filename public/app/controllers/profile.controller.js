angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', '$routeParams', 'auth', 'User', function($scope, $routeParams, auth, User) {
    console.log($routeParams.username);
    $scope.userUrl = $routeParams.username;
    $scope.user = null;
    User.get($scope.userUrl).success(function(data) {
      console.log(data);
      $scope.user = data;
    });

    $scope.auth = auth;
  }]);
