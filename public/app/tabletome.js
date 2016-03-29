angular.module('tabletome', [
    'tabletome.routes',
    // controllers
    'main.controller',
    'spellbook.controller',
    // services
    'spell.service',
    // markdown display
    'ngSanitize',
    'btford.markdown'
  ])
  .config(['markdownConverterProvider', function(markdownConverterProvider) {
  	markdownConverterProvider.config({
  		extensions: ['table']
  	});
  }]);
