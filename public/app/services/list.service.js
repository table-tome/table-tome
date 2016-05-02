angular.module('list.service', [])
  .factory('SpellLists', ['$http', function($http) {
  	var factory = {};

  	factory.get = function() {
  		var lists = $http.get('/api/spell_lists');
  		console.log(lists);
  		return lists;
  	};

  	factory.create = function(name) {
  		return $http.post('/api/spell_lists', { list_name: name });
  	};

  	factory.append = function(name, id) {
  		return $http.post('/api/spell_lists/' + name, { spell_id: id });
  	}

  	return factory;
  }]);
