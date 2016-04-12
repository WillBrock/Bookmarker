var app = angular.module('mainApp', [
	'ui.router',
	'ngResource',
	'MainCtrl',
	'GroupCtrl',
	'GroupService',
	'BookmarkStates',
	'BookmarkCtrl',
	'BookmarkService',
	'ListStates',
	'ListCtrl',
	'ListService'
]);

app.run(function($http) {
	$http.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
});

var underscore = angular.module('underscore', []);
underscore.factory('_', ['$window', function($window) {
	return $window._;
}]);
