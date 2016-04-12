(function() {
	'use strict';

	angular
		.module('GroupCtrl', ['angularify.semantic.modal'])
		.controller('GroupController', GroupController);

	GroupController.$inject = ['$stateParams', '$state', 'Group'];

	function GroupController($stateParams, $state, Group) {
		var self           = this;
		var state          = $state.current.name;
		var group_type     = state.match(/\.details/) ? state.replace('.details', '').substr(0, state.length -1 ) : state ;
		group_type         = group_type.substr(0, group_type.length-1) || 'bookmark';
		var group_id       = $state.params.group_id;
		self.modal         = {};
		self.group         = {};
		self.group_type    = group_type;
		self.groups        = Group.query({type : group_type});
		self.toggle_groups = group_id ? "hide-groups" : "show-groups";
		self.show_modal    = false;

		self.addGroup = function(group_type) {
			var title        = self.title;
			var group_data   = new Group();
			group_data.title = title;
			group_data.type  = group_type;

			Group.save(group_data, function(data) {
				self.title = '';
				self.groups.push(data);
			});
		};

		self.editGroup = function(index) {
			var group = self.groups[index];

			group.$save().then(function(test) {
				self.show_modal = false;
			});
		};

		self.showModal = function(index) {
			self.group       = self.groups[index];
			self.modal.index = index;
			self.show_modal  = true;
		};

		self.deleteGroup = function(index) {
			self.groups[index].$delete(function() {
				self.groups     = Group.query({type : group_type});
				self.show_modal = false;
			});
		};
	}
}());
