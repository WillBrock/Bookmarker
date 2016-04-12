angular
	.module('BookmarkStates', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('bookmarks', {
				url : '',
				controller  : 'GroupController as GroupCtrl',
				templateUrl : 'main/modules/groups/groups.html'
			})

			.state('bookmarks.details', {
				url : '/bookmarks/:group_id',
				views : {
					'@bookmarks' : {
						controller  : 'BookmarkController as BookmarkCtrl',
						templateUrl : 'main/modules/bookmarks/bookmarks.html'
					}
				}
			});
	}]);

