angular.module('user.service', [])
  .factory('User', ['$http', function($http) {
    var factory = {};

    factory.get = function(username) {
      return $http.get('/api/users/' + username);
    };

    factory.updateAboutMe = function(about_me) {
      return $http.post('/api/users/edit/about_me', {
        about_me: about_me
      });
    };

    return factory;
  }]);
