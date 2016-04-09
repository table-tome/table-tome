angular.module('tabletome.routes', ['ngRoute'])
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/pages/home.html'
      })
      .when('/spellbook', {
      	templateUrl: 'app/views/pages/spellbook.html',
      	controller: 'spellbookCtrl'
      })
      .otherwise({
      	templateUrl: 'app/views/pages/404.html'
      });

      $locationProvider.html5Mode(true);
  });
