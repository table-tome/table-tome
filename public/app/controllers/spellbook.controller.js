angular.module('spellbook.controller', ['spell.service'])
  .controller('spellbookCtrl', ['$scope', 'Spells', function($scope, Spells) {

    $scope.spells = Spells.spells;

    $scope.filters = {
      search: "",
      levels: [],
      classes: [],
      schools: [],
      ritual: false
    };

    $scope.filter = function(spell) {
      // filters to spells that are any of the specified levels
      var levels = function(spell) {
        if ($scope.filters.levels.length > 0) {
          var levelsNums = $scope.filters.levels.map(Number);
          var contains = _.contains(levelsNums, spell.level);
          if (!contains) return false;
        }
        return true;
      };
      // filters to spells that are of any of the specified schools
      var schools = function(spell) {
        if ($scope.filters.schools.length > 0) {
          var contains = _.contains($scope.filters.schools, spell.school);
          if (!contains) return false;
        }
        return true;
      };
      // filters to spells that can be used by the specified classes
      var classes = function(spell) {
        if ($scope.filters.classes.length > 0) {
          var intersection = _.intersection($scope.filters.classes, spell.classes);
          if (intersection.length <= 0) return false;
        }
        return true;
      };
      // filters to ritual spells
      var ritual = function(spell) {
        if ($scope.filters.ritual && !spell.ritual) return false;
        return true;
      }

      // test all filters
      if (levels(spell) &&
        schools(spell) &&
        classes(spell) &&
        ritual(spell)) {
        return spell;
      }
    };

    $scope.clickedSpell = {};
    $scope.clicked = function(spell) {
      console.log(spell);
      $scope.clickedSpell = spell;
      $(".ui.modal.spell").modal({
          onVisible: function() {
            $(".ui.modal.spell").modal("refresh");
          }
        }).modal("show");
    };

  }]);
