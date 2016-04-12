(function() {
	'use strict';

	angular
		.module('BookmarkCtrl', ['angularify.semantic.modal'])
		.controller('BookmarkController', BookmarkController);

	BookmarkController.$inject = ['$stateParams', '$state', 'Bookmark', 'Group'];

	function BookmarkController($stateParams, $state, Bookmark, Group) {
		var self              = this;
		var group_id          = $stateParams.group_id;
		var $group_container  = angular.element(document.querySelector(".group-container"));
		self.edit             = {};
		self.modal            = {};
		self.group_id         = group_id;
		self.show_modal       = false;
		self.toggle_container = group_id ? "show-container" : "hide-container";

		if(group_id) {
			self.group = Group.get({_id : group_id});
		}

		// Toggle the class for mobile to determine if we dispaly the groups
		$group_container.toggleClass("hide-groups", group_id);

		// Get the bookmarks for the selected group
		self.bookmarks = Bookmark.query({group_id : group_id});

		// Adding or editing an existing bookmark
		self.editBookmark = function(bookmark_id) {
			var title       = self.modal.title;
			var url         = self.modal.url;
			var description = self.modal.description;
			var params      = bookmark_id ? {_id : bookmark_id} : {};
			var bookmark    = new Bookmark(params);

			if(!title || !url) {
				return;
			}

			bookmark.url         = url;
			bookmark.title       = title;
			bookmark.description = description;
			bookmark.group_id    = group_id;

			bookmark.$save().then(function(data) {
				self.modal.title       = '';
				self.modal.description = '';
				self.modal.url         = '';

				self.bookmarks  = Bookmark.query({group_id : group_id});
				self.show_modal = false;
			});
		};

		self.deleteBookmark = function(bookmark_id) {
			Bookmark.delete({_id : bookmark_id}, function() {
				self.bookmarks  = Bookmark.query({group_id : group_id});
				self.show_modal = false;
			});
		};

		self.showModal = function(index) {
			var data = {
				display_text : 'Add',
				edit         : false,
			};

			if(index !== undefined) {
				// @todo Figure out a way to not have to hard code these
				// Somehow to set the object to this.bookmark but not to watch it
				var bookmark      = self.bookmarks[index];
				data._id          = bookmark._id;
				data.title        = bookmark.title;
				data.url          = bookmark.url;
				data.description  = bookmark.description;
				data.display_text = 'Edit';
				data.edit         = true;
			}

			self.modal      = data;
			self.show_modal = true;
		};
	}
})();
