angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', '$routeParams', 'auth', 'User', 'Spells', function($scope, $routeParams, auth, User, Spells) {

    $scope.username = $routeParams.username;
    // $scope.user = {
    //   nickname: 'No User',
    //   picture: 'http://www.tribe-war.com/images/user.jpg',
    //   user_id: 'fakeid123456789',
    //   user_metadata: {
    //     spell_lists: [{
    //       name: 'List 1',
    //       list: [
    //         '56f86f6b62cb71540b9b9541',
    //         '570adc3e56f29603004ccd0c'
    //       ]
    //     }, {
    //       name: 'List 2',
    //       list: [
    //         '570adc3e56f29603004ccd0c'
    //       ]
    //     }],
    //     about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo metus nec convallis facilisis. Aliquam sit amet convallis lacus. Pellentesque sit amet lacinia leo, sit amet accumsan ex. Sed eleifend ultricies tellus. Proin sit amet ullamcorper nunc. Proin mauris massa, vulputate sed orci vitae, pharetra lacinia sem. Etiam quis ipsum dolor. Suspendisse commodo, purus sit amet rutrum mollis, metus purus fermentum mi, ac consequat ligula ex nec nisl.'
    //   }
    // };

    $scope.user = '';
    $scope.spells = [];
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
