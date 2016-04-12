angular
	.module('ListStates', [])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state('lists', {
				url : '',
				controller  : 'GroupController as GroupCtrl',
				templateUrl : 'main/modules/groups/groups.html'
			})

			.state('lists.details', {
				url : '/lists/:group_id',
				views : {
					'@lists' : {
						controller  : 'ListController as ListCtrl',
						templateUrl : 'main/modules/lists/lists.html'
					}
				}
			});
	}]);
