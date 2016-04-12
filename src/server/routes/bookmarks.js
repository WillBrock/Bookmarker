module.exports = function(app, express) {
	var router   = express.Router();
	var Bookmark = require('../models/Bookmarks');

	router.route('/bookmarks')
		.get(function(req, res) {
			var group_id = req.query.group_id;
			var params   = {};

			if(group_id) {
				params = {
					group_id : group_id
				};
			}

			Bookmark.find(params, function(error, bookmarks) {
				res.json(bookmarks);
			});
		})

		.post(function(req, res) {
			var bookmark         = new Bookmark();
			bookmark.title       = req.body.title;
			bookmark.group_id    = req.body.group_id;
			bookmark.url         = req.body.url;
			bookmark.description = req.body.description;

			bookmark.save(function(error) {
				if(error) {
					res.send(error);
				}

				res.json(bookmark);
			});
		});

	router.route('/bookmarks/:_id')
		.get(function(req, res) {
			Bookmark.findById(req.params._id, function(error, group) {
				res.json(group);
			});
		})

		.put(function(req, res) {
			var bookmark_id = req.params._id;
			delete req.body._id;

			Bookmark.findByIdAndUpdate(bookmark_id, req.body, {}, function(error, bookmark) {
				if(error) {
					console.log(error);
				}

				res.json(bookmark);
			});
		})

		.delete(function(req, res) {
			Bookmark.findByIdAndRemove(req.params._id, function(error) {
				if(error) {
					console.log('Some error');
				}

				res.json();
			});
		});

	app.use('/api', router);
};
