angular.module('list.service', [])
  .factory('SpellLists', ['$http', function($http) {
    var factory = {};

    factory.get = function() {
      return $http.get('/api/spell_lists');
    };

    factory.create = function(name) {
      return $http.post('/api/spell_lists', {
        list_name: name
      });
    };

    factory.append = function(name, id) {
      return $http.post('/api/spell_lists/' + name, {
        spell_id: id
      });
    };

    factory.deleteList = function(name) {
      return $http.delete('/api/spell_lists/' + name);
    };

    factory.removeSpell = function(name, id) {
      return $http.delete('/api/spell_lists/' + name + '/' + id);
    };

    return factory;
  }]);
