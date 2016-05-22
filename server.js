var express         = require('express');
var app             = express();
var body_parser     = require('body-parser');
var method_override = require('method-override');
var morgan          = require('morgan');
var mongoose        = require('mongoose');
var db              = require(__dirname + '/config/db');
var port            = 12345;
var User            = require(__dirname + '/src/server/models/User');

mongoose.connect(db.url);

app.use(body_parser.json());
app.use(body_parser.json({ type : 'application/vnd.api+json' }));
app.use(body_parser.urlencoded({ extended : true }));
app.use(express.static(__dirname + '/src/client/'));
app.use(morgan('dev'));

// Handle angular requests
// Determine if the user is logged in or not
app.use('/api', function(req, res, next) {
	var token = true;
	if(token) {
		next();
	}
});

require(__dirname + '/src/server/routes/auth')(app, express);
require(__dirname + '/src/server/routes/groups')(app, express);
require(__dirname + '/src/server/routes/bookmarks')(app, express);
require(__dirname + '/src/server/routes/lists')(app, express);

app.get('/', function(req, res) {
	return res.sendfile(__dirname + '/src/client/main/main.html');
});

app.listen(port);

console.log("Serving on port " + port);

exports = module.exports = app;
