 module.exports = function(app, express) {
 	var router = express.Router();
	var List   = require('../models/Lists');

	router.route('/lists')
		.get(function(req, res) {
			var group_id = req.query.group_id;
			var params   = {};

			if(group_id) {
				params = {
					group_id : group_id
				}
			}

			List.find(params, function(error, lists) {
				res.json(lists);
			})
		})

		// New list item
		.post(function(req, res) {
			var list = new List();
			list.description = req.body.description;
			list.group_id    = req.body.group_id;

			list.save(function(error) {
				if(error) {
					res.send(error);
				}

				res.json(list);
			});
		});

	router.route('/lists/:_id')
		.get(function(req, res) {
			List.findById(req.params._id, function(error, list) {
				res.json(list);
			});
		})

		.put(function(req, res) {
			var list_id = req.params._id;
			delete req.body._id;

			List.findByIdAndUpdate(list_id, req.body, {}, function(error, list) {
				if(error) {
					console.log(error);
				}

				res.json(list);
			});
		})

		.delete(function(req, res) {
			List.findByIdAndRemove(req.params._id, function(error) {
				if(error) {
					console.log('Some error');
				}

				res.json();
			});
		});

	app.use('/api', router);
}
