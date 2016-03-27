angular.module('spellbook.controller', [])
  .controller('spellbookCtrl', ['$scope', function($scope) {

    $scope.spells = [{
      name: 'spell 1',
      level: '1',
      school: 'stuff',
      classes: 'wizard'
    }];

    $scope.filters = {
      search: "",
      levels: [],
      classes: [],
      schools: []
    };

    $scope.clickedSpell = {};
    $scope.clicked = function(spell) {
      console.log(spell);
      $scope.clickedSpell = spell;
      $('.ui.modal').modal('show');
    };

  }]);
