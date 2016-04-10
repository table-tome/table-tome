angular.module('main.controller', [])
  .controller('mainCtrl', ['$scope', '$filter', function($scope, $filter) {

    $scope.loggedIn = false;

    $scope.login = function() { $scope.loggedIn = true; };
    $scope.logout = function() { $scope.loggedIn = false; };

    $scope.sidebar = function() {
      $('.ui.sidebar').sidebar('toggle');
    };

    $scope.keep = false;

  }])
  .controller('createCtrl', ['$scope', '$filter', function($scope, $filter) {
    $scope.newSpell = {
      // metadata
      source: { name: "", page: null },
      // spell
      name: "",
      ritual: false,
      level: "",
      classes: [],
      school: "",
      castingTime: "",
      duration: "",
      range: "",
      components: {
        verbal: false,
        somatic: false,
        material: { has: false, items: "" }
      },
      description: ""
    };

    $scope.compile = function() {
      // clone the spell so that the display does not change to
      //  lowercase later
      var newSpell = $scope.newSpell;

      // convert all fields that should be lowercase to lowercase
      newSpell.name = $filter('lowercase')(newSpell.name);
      newSpell.castingTime = $filter('lowercase')(newSpell.castingTime);
      newSpell.duration = $filter('lowercase')(newSpell.duration);
      newSpell.range = $filter('lowercase')(newSpell.range);
      newSpell.components.material.items = $filter('lowercase')(newSpell.components.material.items);

      // return the compiled spell
      console.log(newSpell);
      return newSpell;
    };
    $scope.clickedSpell = {};
    $scope.preview = function() {
      $scope.clickedSpell = $scope.compile();
      $(".ui.modal.preview").modal({
        onVisible: function() {
          $(".ui.modal.preview").modal("refresh");
        }
      }).modal("show");
    };

    $scope.exampleDescription="Objects come to life at your command. Choose up to ten nonmagical objects within range that are not being worn or carried. Medium targets count as two objects, Large targets count as four objects, Huge targets count as eight objects. You can't animate any object larger than Huge. Each target animates and becomes a creature under your control until the spell ends or until reduced to 0 hit points.\n\nAs a bonus action, you can mentally command any creature you made with this spell if the creature is within 500 feet of you (if you can control multiple creatures, you can command any or all of them at the same time, issuing the same command to each one). You decide what action the creature will take and where it will move during its next turn, or you can issue a general command, such as to guard a particular chamber or corridor. If you no commands, the creature only defends itself against hostile creatures. Once given an order, the creature continues to follow it until its task is complete.\n\n#### Animated Object Statistics\n\n| Size | HP | AC | Attack | Str | Dex |\n|--------|----|----|----------------------------|-----|-----|\n| Tiny | 20 | 18 | +8 to hit, 1d4 + 4 damage | 4 | 18 |\n| Small | 25 | 16 | +6 to hit, 1d8 + 2 damage | 6 | 14 |\n| Medium | 40 | 13 | +5 to hit, 2d6 + 1 damage | 10 | 12 |\n| Large | 50 | 10 | +6 to hit, 2d10 + 2 damage | 14 | 10 |\n| Huge | 80 | 10 | +8 to hit, 2d12 + 4 damage | 18 | 6 |\n\nAn animated object is a construct with AC, hit points, attacks, Strength, and Dexterity determined by its size. Its Constitution is 10 and its Intelligence and Wisdom are 3, and its Charisma is 1. Its speed is 30 feet; if the object lacks legs or other appendages it can use for locomation, it instead has a flying speed of 30 feet and can hover. If the object is securely attached to a surface or a larger object, such as a chain bolted to a wall, its speed is 0. It has blindsight with a radius of 309 feet and is blind beyond that distance. When the animated object drops to 0 hit points, it reverts to its original object form, and any remaining damage carries over to its original object form.\n\nIf you command an object to attack, it can make a single melee attack against a creature within 5 feet of it. It makes a slam attack with an attack bonus and bludgeoning damage determined by its size. The DM might rule that a specific object inflicts slashing or piercing damage based on its form.\n\n**At Higher Levels.** If you cast this spell using a spell slow of 6th level or higher, you can animate two additional objects for each slot level above 5th."
    $scope.showExample = function() {
    	$(".ui.basic.fullscreen.modal.example").modal().modal("show");
    };

    $scope.print = function() {
    	console.log($scope.exampleDescription);
    }

  }]);
