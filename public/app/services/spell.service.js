angular.module('spell.service', [])
  .factory('Spells', ['$http', function($http) {
  	var spellFactory = { spells: [] };

  	spellFactory.update = function() {
  		$http.get('/api/spells/').success(function(data) {
  			angular.copy(data, spellFactory.spells);
  		});
  	};

  	spellFactory.update();

  	return spellFactory;
  }]);
