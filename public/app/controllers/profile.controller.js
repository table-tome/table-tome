angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', '$routeParams', 'auth', 'User', 'Spells', function($scope, $routeParams, auth, User, Spells) {
    $scope.username = $routeParams.username;

    $scope.user = 'loading';
    $scope.spells = [];
    $scope.loading = true;
    User.get($scope.username).success(function(data) {
      $scope.user = data;

      // make sure that the user has spell lists
      if ($scope.user.user_metadata && $scope.user.user_metadata.spell_lists) {
        // get all the spell ids so that we can get the spell information
        // TODO: add custom spells to list when implemented
        var spell_ids = [];
        var spell_lists = $scope.user.user_metadata.spell_lists;
        for (i in spell_lists) {
          var list = spell_lists[i].list;
          spell_ids = _.union(spell_ids, list);
        }
        Spells.getSpellsByIds(spell_ids).success(function(spells) {
          $scope.spells = spells;
        });
      }
    });

    $scope.getSpell = function(id) {
      return _.select($scope.spells, function(spell) {
        return spell._id === id;
      })[0];
    };

    $scope.showSpellModalActions = false;
    $scope.showSpell = function(id) {
      $scope.modalSpell = $scope.getSpell(id);
      $("#profile-spell-modal").modal({
        onVisible: function() {
          $("#profile-spell-modal").modal("refresh");
        },
        onHidden: function() {
          $scope.modalSpell = {};
        }
      }).modal("show");
    };

    $scope.auth = auth;
  }]);
