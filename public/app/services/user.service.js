angular.module('user.service', [])
  .factory('User', ['$http', function($http) {
    var factory = {};

    factory.get = function(username) {
      return $http.get('/api/users/' + username);
    };

    return factory;
  }]);
