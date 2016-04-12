(function() {
	'use strict';

	angular
		.module('AuthCtrl', [])
		.controller('AuthController', AuthController);

	AuthController.$inject = ['Auth'];

	function AuthController(Auth) {
		var self          = this;
		self.register     = {};
		self.authenticate = {};

		self.login = function() {
			var email         = self.authenticate.email;
			var password      = self.authenticate.password;
			var error_message = "Invalid email or password.";
			self.authenticate.error_message = false;
			console.log(self.authenticate);

			if(!email || !password) {
				self.authenticate.error_message = error_message;
				return;
			}

			Auth.login({
				email    : email,
				password : password
			})
			.success(function(data) {
				console.log(data);
				if(data.success) {
					localStorage.setItem("token", data.token);
					return;
					window.location = "/";
				}
				else {
					self.authenticate.error_message = error_message;
				}
			});
		}

		self.registerUser = function() {
			var first_name = self.register.first_name;
			var last_name  = self.register.last_name;
			var email      = self.register.email;
			var password   = self.register.password;

			self.register.error_message   = false;
			self.register.success_message = false;

			if(!first_name || !last_name || !email || !password) {
				self.register.error_message = "One or more fields are not filled out.";
				return;
			}

			Auth.register({
				first_name : first_name,
				last_name  : last_name,
				email      : email,
				password   : password
			})
			.success(function(data) {
				if(data.success) {
					self.register.success_message = "Your account is now activated.";
				}
				else {
					self.register.error_message = "Please use a different email address.";
				}
			});
		}
	}
}());

/*
angular.module('AuthCtrl', []).controller('authController', ['$scope', 'Auth', function($scope, Auth) {

	$scope.login = function() {
		var email    = $scope.email;
		var password = $scope.password;
		Auth.login({
			email    : email,
			password : password
		})
		.success(function(data) {
			console.log(data);

			if(data.success) {
				localStorage.setItem('user_token', data.token);
			}
		});
	};

}]);
*/
