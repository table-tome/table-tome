angular.module('spellbook.controller', ['spell.service', 'list.service'])
  .controller('spellbookCtrl', ['$scope', '$document', 'Spells', 'SpellLists', function($scope, $document, Spells, SpellLists) {

    $scope.spells = 'loading';
    $scope.getSpells = function() {
      console.log('retrieving spells');
      Spells.get().then(function(res) {
        $scope.spells = res.data;
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
        SpellLists.get().then(function(res) {
          var data = res.data;
          if (data.success) {
            $scope.spellLists.lists = data.lists;
          } else {
            // TODO?
            console.log(data.message);
          }
        });
      },
      edit: {
        show: function() {
          $("#spell-list-edit-modal")
            .modal({
              closable: false
            })
            .modal("show");
          $('#spell-list-edit-accordion')
            .accordion();
        },
        remove_list: function(list_) {
          SpellLists.deleteList(list_).then(function(res) {
            var data = res.data;
            if (data.success) {
              $scope.spellLists.lists = data.lists;
              $("#spell-list-edit-modal").modal("hide");
              $scope.spellLists.selected = "all";
            } else {
              // TODO
              console.log(data.message);
            }
          });
        },
        remove_spell: function(list_, spell_) {
          console.log("Removing " + list_ + " " + spell_);
          SpellLists.removeSpell(list_, spell_).then(function(res) {
            var data = res.data;
            if (data.success) {
              $scope.spellLists.lists = data.lists;
            } else {
              // TODO
              console.log(data.message);
            }
          });
        },
        cancel: function() {
          $("#spell-list-edit-modal").modal("hide");
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
          SpellLists.create($scope.spellLists.create.name).then(function(res) {
            var data = res.data;
            if (data.success) {
              $scope.spellLists.lists = data.lists;
              $scope.spellLists.create.reset();
              $("#spell-list-create-modal").modal("hide");
            } else {
              // TODO
              console.log(data.message);
            }
          });
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
        SpellLists.append(list, id).then(function(res) {
          var data = res.data;
          if (data.success) {
            $scope.spellLists.lists = data.lists;
          } else {
            console.log(data.message)
          }
        });
      }
    };

    $document.ready(function() {
      $scope.getSpells();
      $scope.spellLists.update();
    });
  }]);
