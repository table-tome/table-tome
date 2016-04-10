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
    'angular-md5'
  ])
  .config(['markdownConverterProvider', function(markdownConverterProvider) {
  	markdownConverterProvider.config({
  		extensions: ['table']
  	});
  }]);
