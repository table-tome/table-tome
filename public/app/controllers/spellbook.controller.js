angular.module('spellbook.controller', ['spell.service', 'list.service'])
  .controller('spellbookCtrl', ['$scope', 'Spells', 'SpellLists', function($scope, Spells, SpellLists) {

    $scope.spells = [];
    $scope.getSpells = function() {
      Spells.get().success(function(data) {
        $scope.spells = data;
      });
    };

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

    $scope.spellLists = {
      lists: [],
      selected: "all",
      filter: function(spell) {
        // if no specific list selected or the spell id is in the list
        if ($scope.spellLists.selected === "all" ||
          _.indexOf($scope.spellLists.lists[$scope.spellLists.selected].list, spell._id) > -1) {
          return spell;
        }

      },
      update: function() {
        SpellLists.get().success(function(data) {
          $scope.spellLists.lists = data;
        });
      },
      create: {
        name: null,
        show: function() {
          $("#spell-list-create-modal")
            .modal({
              closable: false
            })
            .modal("show");
        },
        submit: function() {
          console.log("Creating spell lists named " + $scope.spellLists.create.name);
          SpellLists.create($scope.spellLists.create.name).success(function(data) {
            $scope.spellLists.lists = data;
            console.log($scope.spellLists);
            $scope.spellLists.create.reset();
          });
          $("#spell-list-create-modal").modal("hide");
        },
        cancel: function() {
          $("#spell-list-create-modal").modal("hide");
          $scope.spellLists.create.reset();
        },
        reset: function() {
          $scope.spellLists.create.name = null;
        }
      },
      append: function(list, id) {
        console.log(list + ": " + id);
        SpellLists.append(list, id).success(function(data) {
          $scope.spellLists.lists = data;
        });
      }
    };

    $scope.getSpells();
    $scope.spellLists.update();

  }]);
