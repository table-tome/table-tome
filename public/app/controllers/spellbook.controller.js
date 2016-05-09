angular.module('spellbook.controller', ['spell.service', 'list.service'])
  .controller('spellbookCtrl', ['$scope', '$document', 'Spells', 'SpellLists', function($scope, $document, Spells, SpellLists) {

    $scope.spells = 'loading';
    $scope.getSpells = function() {
      console.log('retrieving spells');
      Spells.get().success(function(data) {
        $scope.spells = data;
      });
    };
    //pulled over from profile.controller to get a specific spell for edit_list
    $scope.getSpell = function(id) {
      return _.select($scope.spells, function(spell) {
        return spell._id === id;
      })[0];
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

    $scope.modalSpell = {};
    $scope.showSpellModalActions = true;
    $scope.spellClick = function(spell) {
      $scope.modalSpell = spell;
      $("#spellbook-spell-modal").modal({
        onVisible: function() {
          $("#spellbook-spell-modal").modal("refresh");
        },
        onHidden: function() {
          $scope.modalSpell = {};
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
          console.log($scope.spellLists.lists);
        });
      },
      edit: {
        selected: null,
        current_spells: null,
        show: function() {
          $("#spell-list-edit-modal")
            .modal({
              closable: false
            })
            .modal("show");
          $('#spell-list-edit-accordion')
            .accordion();
        },
        submit: function() {
          //figure out how to update a specific spell list (if not async update)
        },
        remove_spell: function(spell_) {
          console.log("Removing " + $scope.edit.selected + " " + spell_);
          //figure out how to remove a spell from a list
          SpellLists.removeSpell(list_, spell_).success(function(data) {
            $scope.spellLists.lists = data;
          });
        },
        cancel: function() {
          $("#spell-list-edit-modal").modal("hide");
          $scope.spellLists.edit.reset();
        },
        reset: function() {
          $scope.spellLists.edit.selected = null;
          $scope.spellLists.edit.current_spells = null;
        }
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

    $document.ready(function() {
      $scope.getSpells();
      $scope.spellLists.update();
    });
  }]);
