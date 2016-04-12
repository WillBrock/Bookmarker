module.exports = function(app, express) {
	var router = express.Router();
	var Group  = require('../models/Groups');

	router.route('/groups')
		.get(function(req, res) {
			Group.find({type : req.query.type}, function(error, groups) {
				res.json(groups);
			});
		})

		.post(function(req, res) {
			var group   = new Group();
			group.title = req.body.title;
			group.type  = req.body.type;

			group.save(function(error) {
				if(error) {
					res.send(error);
				}

				res.json(group);
			});
		});

	router.route('/groups/:_id')
		.get(function(req, res) {
			Group.findById(req.params._id, function(error, group) {
				res.json(group);
			});
		})

		.put(function(req, res) {
			Group.findByIdAndUpdate(req.params._id, req.body, {}, function(error, group) {
				if(error) {
					console.log(error);
				}

				res.json(group);
			});
		})

		.delete(function(req, res) {
			Group.findByIdAndRemove(req.params._id, function(error) {
				if(error) {
					console.log(error);
				}

				res.json();
			});
		});

	app.use('/api', router);
};
