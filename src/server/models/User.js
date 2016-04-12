var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var user_schema = new Schema({
	first_name : String,
	last_name  : String,
	token      : String,
	email : {
		type     : String,
		required : true,
		unique   : true
	},
	password : {
		type     : String,
		required : true,
	}
});

var User       = mongoose.model('User', user_schema);
module.exports = User;
