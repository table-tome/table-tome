angular.module('tabletome.routes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/pages/home.html'
      })
      .when('/login', {
        templateUrl: 'app/views/pages/login.html'
      })
      .when('/spellbook', {
        templateUrl: 'app/views/pages/spellbook.html',
        controller: 'spellbookCtrl'
      })
      .when('/contribute', {
        templateUrl: 'app/views/pages/contribute.html',
        controller: 'contributeCtrl'
      })
      .when('/u/:username', {
        templateUrl: 'app/views/pages/profile.html',
        controller: 'profileCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/views/pages/settings.html',
        requiresLogin: true
      })
      .otherwise({
        templateUrl: 'app/views/pages/404.html'
      });

    $locationProvider.html5Mode(true);
  });
