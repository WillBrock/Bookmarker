module.exports = function(app, express) {
	var router = express.Router();
	var jwt    = require('jsonwebtoken');
	var User   = require('../models/User');

	router.post('/login', function(req, res) {
		User.findOne({
			email    : req.body.email,
			password : req.body.password
		},
		function(error, user) {
			if(!user) {
				res.json({
					success : false,
					message : 'Invalid email/password'
				});

				return;
			}

			var token = jwt.sign(user, 'token_hash_', {
				expiresInMinutes : 1440
			});

			user.token = token;
			user.save();

			res.json({
				success : true,
				message : 'Yay! logged in!!',
				token   : token
			});
		});

		//res.sendfile('../../client/main/main.html');
	});

	router.post('/register', function(req, res) {
		var data     = req.body;
		var email    = data.email;
		var password = data.password;

		if(!email || !password) {
			res.json({
				success : false,
				error   : "Username and password must be filled out."
			});

			return;
		}

		User.findOne({email : email},
			function(error, tmp_user) {
				// Check if the email already exists
				if(tmp_user) {
					res.json({
						success : false,
						error   : "Username already exists."
					});
				}
				// Register the user
				else {
					var new_user = new User(data);

					new_user.save(function(error2) {
						if(error2) {
							res.send(error2);
						}

						res.json({
							success : true
						});
					});
				}
			});
	});

	router.route('/users')
		.get(function(req, res) {
			User.find(function(error, users) {
				res.json(users);
			});
		});

	app.use('/auth', router);
};
