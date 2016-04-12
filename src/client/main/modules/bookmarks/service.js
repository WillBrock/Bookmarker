angular.module('BookmarkService', []).factory('Bookmark', ['$resource', function($resource) {
	var Bookmark = $resource('/api/bookmarks/:_id', {_id : '@_id'}, {
		create : {
			method : 'POST'
		},
		update : {
			method : 'PUT'
		}
	});

	Bookmark.prototype.$save = function() {
		if(this._id) {
			return this.$update();
		}
		else {
			return this.$create();
		}
	};

	return Bookmark;
}]);
