angular.module('tabletome', [
		'tabletome.routes',
		// controllers
		'main.controller',
		'spellbook.controller',
		// markdown display
		'ngSanitize',
		'btford.markdown'
	]);