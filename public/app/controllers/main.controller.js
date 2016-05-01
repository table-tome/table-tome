angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', '$location', 'auth', 'store', function($scope, $location, auth, store) {

    $scope.auth = auth;
    
    $scope.login = function() {
      auth.signin({}, function(profile, id_token) {
        console.log(profile);
        store.set('profile', profile);
        store.set('token', id_token);
        $location.path('/');
      }, function() {
        // TODO handle when login fails
      })
    };

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/');
    }

    $scope.sidebar = function() {
      $('.ui.sidebar').sidebar('toggle');
    };

  }]);
