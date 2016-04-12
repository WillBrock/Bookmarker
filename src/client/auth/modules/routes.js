(function() {
	'use strict';

	angular.module('authRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

		$routeProvider

			// home page
			.when('/', {
				templateUrl : 'auth/modules/views/login.html'
				//controller  : 'AuthController as AuthCtrl'
			})

			.when('/register', {
				templateUrl: 'auth/modules/views/register.html'
				//controller: 'NerdController'
			});

		$locationProvider.html5Mode(true);
	}]);

})();
