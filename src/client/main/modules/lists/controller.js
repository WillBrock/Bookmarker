(function() {
	'use strict';

	angular
		.module('ListCtrl', [])
		.controller('ListController', ListController);

	ListController.$inject = ['$stateParams', '$state', 'List', 'Group'];

	function ListController($stateParams, $state, List, Group) {
		var self              = this;
		var group_id          = $stateParams.group_id;
		var $group_container  = angular.element(document.querySelector(".group-container"));
		self.toggle_container = group_id ? "show-container" : "hide-container";
		self.lists            = [];
		self.show_modal       = false;
		self.group            = {};
		self.group_id         = group_id;

		if(group_id) {
			self.group = Group.get({_id : group_id});
		}

		// Toggle the class for mobile to determine if we dispaly the groups
		$group_container.toggleClass("hide-groups", group_id);

		var tmp_lists = List.query({group_id : group_id});

		// Remove any item that is marked as completed
		tmp_lists.$promise.then(function(lists) {
			angular.forEach(lists, function(value, index) {
				if(!value.completed) {
					self.lists.push(value);
				}
			});
		});

		// Add new list item
		self.addItem = function() {
			var list         = new List({});
			list.description = self.description;
			list.group_id    = self.group_id;

			if(!list.description) {
				return;
			}

			list.$save().then(function(record) {
				self.description = '';
				self.lists.push(record);
			});
		}

		// Edit the description of an existing item
		self.editItem = function(index, modal) {
			if(modal) {
				self.lists[index].description = self.modal.description;
			}

			self.lists[index].$save();

			if(modal) {
				self.show_modal = false;
			}
		}

		self.markCompleted = function(index) {
			self.lists[index].completed = 1;
			self.lists[index].$save().then(function() {
				self.lists.splice(index, 1);
			});
		}

		self.deleteItem = function(index) {
			self.lists[index].$delete(function() {
				self.lists.splice(index, 1);
			});
		}

		self.showModal = function(index) {
			self.modal = {
				index       : index,
				description : self.lists[index].description
			};

			self.show_modal = true;
		}
	}

}());
