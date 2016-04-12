(function() {
	'use strict';

	angular.module('AuthService', []).factory('Auth', ['$http', function($http) {
		return {
			login : function(data) {
				return $http.post('/auth/login', data);
			},

			register : function(data) {
				return $http.post('/auth/register', data);
			},

			test_login : function(data) {
				return $http.get('/auth/test_login');
			}
		};
	}]);
})();
