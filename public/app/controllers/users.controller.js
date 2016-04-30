angular.module('users.controller', [])
	.controller('loginCtrl', function($scope, auth) {
		$scope.auth = auth;

	});