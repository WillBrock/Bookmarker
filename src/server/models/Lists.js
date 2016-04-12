(function() {
	'use strict';

	var mongoose = require('mongoose');
	var Schema   = mongoose.Schema;

	var list_schema = new Schema({
		group_id    : String,
		description : String,
		completed   : Number,
		sort        : Number
	});

	var List       = mongoose.model('List', list_schema);
	module.exports = List;
}());
