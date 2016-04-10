angular.module('tabletome.routes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/pages/home.html'
      })
      .when('/login', {
        templateUrl: 'app/views/pages/login.html'
      })
      .when('/register', {
        templateUrl: 'app/views/pages/register.html'
      })
      .when('/spellbook', {
      	templateUrl: 'app/views/pages/spellbook.html',
      	controller: 'spellbookCtrl'
      })
      .when('/create', {
        templateUrl: 'app/views/pages/create.html',
        controller: 'createCtrl'
      })
      .otherwise({
      	templateUrl: 'app/views/pages/404.html'
      });

      $locationProvider.html5Mode(true);
  });
