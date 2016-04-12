(function() {
	'use strict';

	angular.module('ListService', []).factory('List', ['$resource', function($resource) {
		var List = $resource('/api/lists/:_id', {_id : '@_id'}, {
			query  : { method : 'GET', cache : false, isArray : true },
			create : {
				method : 'POST'
			},
			update : {
				method : 'PUT'
			}
		});

		List.prototype.$save = function() {
			if(this._id) {
				return this.$update();
			}
			else {
				return this.$create();
			}
		};

		return List;
	}]);
})();
