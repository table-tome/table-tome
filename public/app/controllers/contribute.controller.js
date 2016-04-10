angular.module('contribute.controller', [])
  .controller('contributeCtrl', ['$scope', '$filter', '$http', '$location', function($scope, $filter, $http, $location) {
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
    $scope.emptySpell = $.extend(true, {}, $scope.newSpell);

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

    $scope.submitPassword = "";
    $scope.customError = "";
    $scope.submit = function() {
      var spell = $scope.compile();
      $http.post('/api/spell/create', { pass: $scope.submitPassword, spell: spell }).success(function(data) {
        if (data.status === "error") {
          console.log(data.message);
          $scope.customError = data.message;
          $scope.submitPassword = "";
        } else {
          $scope.resetForm();
          $(".ui.basic.modal.success").modal({ closable: false }).modal("show");
        }
      });
    };

    $scope.resetForm = function() {
      $('form').form('clear');
      $scope.newSpell = $.extend(true, {}, $scope.emptySpell);
      $(".ui.basic.modal.success").modal().modal("hide");
    };

    $scope.visitSpellbook = function() {
      $(".ui.basic.modal.success").modal().modal("hide");
      $location.path("/spellbook");
    };

    $scope.exampleDescription = "This is an example description to try to help you write your descriptions and have them match the other spell's descriptions on Table Tome. If I'm missing anything in this example, please file an issue on github specifying what might help another user write their descriptions.\n\nThis box on the left contains the raw input, while the box on the right is a preview of what is displayed. You can play with markdown here if you like!\n\n#### This is a Table Header\n\n| Size | HP | AC | Attack | Str | Dex |\n|--------|----|----|----------------------------|-----|-----|\n| Tiny | 20 | 18 | +8 to hit, 1d4 + 4 damage | 4 | 18 |\n| Small | 25 | 16 | +6 to hit, 1d8 + 2 damage | 6 | 14 |\n| Medium | 40 | 13 | +5 to hit, 2d6 + 1 damage | 10 | 12 |\n| Large | 50 | 10 | +6 to hit, 2d10 + 2 damage | 14 | 10 |\n| Huge | 80 | 10 | +8 to hit, 2d12 + 4 damage | 18 | 6 |\n\n*The above table was generated using this [Markdown Table Generator](http://www.tablesgenerator.com/markdown_tables).*\n\nThis is a separate paragraph. You need one line of blank space between paragraphs for them to be rendered separately.\n\n**This is a Section Header.** One example of common usage is below.\n\n**At Higher Levels.** If you cast this spell using a spell slot of 6th level or higher, you can do more stuff.\n\nMore Markdown syntax can be found [here](http://daringfireball.net/projects/markdown/)."
    $scope.showExample = function() {
      $(".ui.basic.fullscreen.modal.example").modal({ closable: false }).modal("show");
    };
    $scope.closeExample = function() {
    	$(".ui.basic.fullscreen.modal.example").modal().modal("hide");
    }

    $scope.print = function() {
      console.log($scope.exampleDescription);
    };

  }]);
