angular.module('tabletome', [
    'tabletome.routes',
    // controllers
    'main.controller',
    'spellbook.controller',
    'contribute.controller',
    'users.controller',
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
  .config(function(markdownConverterProvider, authProvider) {
    // enable tables for spell description displays
    markdownConverterProvider.config({
      extensions: ['table']
    });
    authProvider.init({
      domain: 'app47270198.auth0.com',
      clientID: 'h1L6V5X1y1Jf2SCEsaBja7oLTiE8EL9C'
    });
  })
  .run(function(auth) {
    auth.hookEvents();
  });;
