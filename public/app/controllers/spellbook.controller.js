angular.module('spellbook.controller', ['spell.service'])
  .controller('spellbookCtrl', ['$scope', 'Spells', function($scope, Spells) {

    $scope.spells = Spells.spells;

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
