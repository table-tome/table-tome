angular.module('tabletome', [
    'tabletome.routes',
    // controllers
    'main.controller',
    'spellbook.controller',
    'contribute.controller',
    // services
    'spell.service',
    // markdown display
    'ngSanitize',
    'btford.markdown',
    // md5 hash
    'angular-md5',
    // auth0
    'auth0',
    'angular-storage',
    'angular-jwt',
  ])
  .config(function(markdownConverterProvider, authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
    // enable tables for spell description displays
    markdownConverterProvider.config({
      extensions: ['table']
    });

    // auth0 login stuff
    authProvider.init({
      domain: 'app47270198.auth0.com',
      clientID: 'h1L6V5X1y1Jf2SCEsaBja7oLTiE8EL9C'
    });

    authProvider.on('loginSuccess', function($location, profilePromise, idToken, store) {
      console.log("Login Success");
      profilePromise.then(function(profile) {
        store.set('profile', profile);
        store.set('token', idToken);
      });
      $location.path('/');
    });
    authProvider.on('loginFailure', function() {
      alert("Error");
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');
  })
  .run(function($rootScope, auth, store, jwtHelper, $location) {
    auth.hookEvents();


    $rootScope.$on('$locationChangeStart', function() {

      var token = store.get('token');
      if (token) {
        if (!jwtHelper.isTokenExpired(token)) {
          if (!auth.isAuthenticated) {
            auth.authenticate(store.get('profile'), token);
          }
        } else {
          // Either show the login page or use the refresh token to get a new idToken
          $location.path('/');
        }
      }

    });
  });
