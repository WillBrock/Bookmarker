 var mongoose = require('mongoose');
 var Schema   = mongoose.Schema;

var bookmark_schema = new Schema({
	group_id    : String,
	title       : String,
	url         : String,
	description : String,
	sort        : Number
});

var Bookmark   = mongoose.model('Bookmark', bookmark_schema);
module.exports = Bookmark;
