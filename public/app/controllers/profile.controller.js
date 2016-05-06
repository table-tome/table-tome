angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', '$routeParams', 'auth', 'User', function($scope, $routeParams, auth, User) {

    var username = $routeParams.username;
    $scope.user = null;
    User.get(username).success(function(data) {
      console.log(data);
      $scope.user = data;
    });

    $scope.auth = auth;
  }]);
