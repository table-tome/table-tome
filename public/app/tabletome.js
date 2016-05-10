angular.module('tabletome', [
    'tabletome.routes',
    // controllers
    'main.controller',
    'spellbook.controller',
    'contribute.controller',
    'profile.controller',
    'settings.controller',
    // services
    'spell.service',
    'list.service',
    'user.service',
    // markdown display
    'ngSanitize',
    'btford.markdown',
    // md5 hash
    'angular-md5',
    // auth0
    'auth0',
    'angular-storage',
    'angular-jwt',
    // animate
    'ngAnimate'
  ])
  .config(function(markdownConverterProvider, authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
    // enable tables for spell description displays
    markdownConverterProvider.config({
      extensions: ['table']
    });

    // auth0 login stuff
    authProvider.init({
      domain: 'app47270198.auth0.com',
      clientID: 'h1L6V5X1y1Jf2SCEsaBja7oLTiE8EL9C',
      loginUrl: '/login'
    });

    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    }

    // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
    // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
    // want to check the delegation-token example
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
