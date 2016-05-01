angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', '$location', 'auth', 'store', function($scope, $location, auth, store) {

    $scope.auth = auth;
    
    $scope.login = function() {
      auth.signin({}, function(profile, id_token) {
        console.log(id_token);
        store.set('profile', profile);
        store.set('token', id_token);
      }, function() {
        // TODO handle when login fails
      })
    };

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
    };

    $scope.sidebar = function() {
      $('.ui.sidebar').sidebar('toggle');
    };

  }]);
