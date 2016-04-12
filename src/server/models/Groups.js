var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var group_schema = new Schema({
	user_id : Number,
	title   : String,
	type    : String,
});

var Group      = mongoose.model('Group', group_schema);
module.exports = Group;
