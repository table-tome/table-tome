angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', 'auth', function($scope, auth) {

   $scope.auth = auth;

  }]);


