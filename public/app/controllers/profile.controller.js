angular.module('profile.controller', [])
  .controller('profileCtrl', ['$scope', '$routeParams', 'auth', 'User', function($scope, $routeParams, auth, User) {

    $scope.user = {
      nickname: 'Fake',
      picture: 'http://www.tribe-war.com/images/user.jpg',
      user_id: 'fakeid123456789'
      user_metadata: {
        spell_lists: [{
          name: 'List 1',
          list: [
            '56f86f6b62cb71540b9b9541',
            '570adc3e56f29603004ccd0c'
          ]
        }, {
          name: 'List 2',
          list: [
            '570adc3e56f29603004ccd0c'
          ]
        }],
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam commodo metus nec convallis facilisis. Aliquam sit amet convallis lacus. Pellentesque sit amet lacinia leo, sit amet accumsan ex. Sed eleifend ultricies tellus. Proin sit amet ullamcorper nunc. Proin mauris massa, vulputate sed orci vitae, pharetra lacinia sem. Etiam quis ipsum dolor. Suspendisse commodo, purus sit amet rutrum mollis, metus purus fermentum mi, ac consequat ligula ex nec nisl.'
      }
    };

    // TODO: uncomment when editing a user is feasable
    // var username = $routeParams.username;
    // $scope.user = null;
    // User.get(username).success(function(data) {
    //   console.log(data);
    //   console.log(auth.profile);
    //   $scope.user = data;
    // });

    $scope.auth = auth;
  }]);