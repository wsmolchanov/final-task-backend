(function () {
	'use strict';

	const bcrypt = require('bcrypt-nodejs');
	const config = require('../../config/config.js');
	const jwt = require('jsonwebtoken');


	module.exports = {
		comparePassword,
		generateHash,
		createUser
	};

	

	function comparePassword (password, currentUser) {
		return new Promise(function (resolve, reject) {
			bcrypt.compare(password, currentUser.password, function (err, same) {
				if (err) {
					// bcrypt internal error or smth.
					reject(new Error(JSON.stringify({
						status : 400,
						type   : 'Login failed'
					})));
				} else if (!err && !same) {
					// wrong password
					reject(new Error(JSON.stringify({
						status : 400,
						type   : `Passwords don't match`
					})));
				} else {
					// user exists and credentials is correct
					return resolve(currentUser);
				}
			});
		});
	}

	function generateHash(password) {
		return new Promise(function (resolve) {
			let salt = bcrypt.genSaltSync(10);
			let hash = bcrypt.hashSync(password, salt);
			resolve(hash);
		});
	}

	function createUser(username, hash, email ) {
		
	}
	function createUser (query ) {
		try {
			var users = await User.find(query)
			return users;
		} catch (e) {
			// Log Errors
			throw Error('Error while Paginating Users')
		}

		
	}
	exports.getUsers = async function (query) {

		try {
			var users = await New.User (query)
			return users;
		} catch (e) {
			// Log Errors
			throw Error('Error while Paginating Users')
		}
	}
})();