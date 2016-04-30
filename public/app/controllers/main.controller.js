angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', '$filter', 'auth', 'store', function($scope, $filter, auth, store) {

  	$scope.auth = auth;
  	$scope.logout = function() {
  		auth.signout();
  		store.remove('profile');
  		store.remove('token');
  	}

    $scope.sidebar = function() {
      $('.ui.sidebar').sidebar('toggle');
    };

  }]);
  
