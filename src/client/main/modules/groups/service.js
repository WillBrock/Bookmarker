angular.module('GroupService', []).factory('Group', ['$resource', function($resource) {
	var Group = $resource('/api/groups/:_id', {_id : '@_id'}, {
		get    : { method : 'GET', cache : true },
		query  : { method : 'GET', cache : false, isArray : true },
		create : {
			method : 'POST'
		},
		update : {
			method : 'PUT'
		}
	});

	Group.prototype.$save = function() {
		if(this._id) {
			return this.$update();
		}
		else {
			return this.$create();
		}
	};

	return Group;
}]);
