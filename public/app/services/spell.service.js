angular.module('spell.service', [])
  .factory('Spells', ['$http', function($http) {
    var factory = {};

    factory.get = function() {
      return $http.get('/api/spells/');
    };

    factory.getSpellById = function(id) {
      return $http.get('/api/spells/' + id);
    };

    factory.getSpellsByIds = function(id_list) {
      return $http.get('/api/spells/multiple', {
        id_list: id_list
      });
    };

    return factory;
  }]);
