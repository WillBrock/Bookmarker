(function() {
	'use strict';

	angular
		.module('MainCtrl', [])
		.controller('MainController', MainController);

	MainController.$inject = ['$scope'];

	function MainController($scope) {
		$scope.display_menu = false;

		$scope.toggleMenu = function() {
			$scope.display_menu = !$scope.display_menu;
		}

		$scope.logout = function() {

		}
	}
})();
