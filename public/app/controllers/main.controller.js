angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', '$filter', function($scope, $filter) {

    $scope.sidebar = function() {
      $('.ui.sidebar').sidebar('toggle');
    };

  }]);
  
