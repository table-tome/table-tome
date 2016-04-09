angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', function($scope) {

    $scope.sidebar = function() {
    	$('.ui.sidebar').sidebar('toggle');
    };

  }]);
