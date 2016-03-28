angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', function($scope) {

    $scope.loggedIn = false;

    $scope.login = function() { $scope.loggedIn = true; };
    $scope.logout = function() { $scope.loggedIn = false; };

    $scope.sidebar = function() {
    	$('.ui.sidebar').sidebar('toggle');
    };

  }]);
