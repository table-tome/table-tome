angular.module('spell.service', [])
  .factory('Spells', ['$http', function($http) {
    var factory = {};

  	factory.get = function() {
  		return $http.get('/api/spells/');
  	};

  	return factory;
  }]);
