(function () {
	'use strict';
  
	const bcrypt = require('bcrypt-nodejs');
	const server = require('../server');
	const config = require('../config/config');
	const jwt = require('jsonwebtoken');
	const User = server.main.model('User');
  
  
	module.exports = {
	  createUser,
	  findUsers,
	  comparePassword
	};
  
	async function findUsers(query) {
	  try {
		return await User.find(query);
	  } catch (error) {
		throw error;
	  }
	}
  
	async function createUser(userParams) {
	  try {
		// const hashPassword = await _generateHash(userParams.password);
		// userParams.password = hashPassword;
		const user = await User.create(userParams);
  
		return user;
	  } catch (e) {
		throw e;
	  }
	}
  
  
	function comparePassword(password, currentUser) {
	  return new Promise(function (resolve, reject) {
		bcrypt.compare(password, currentUser.password, function (err, same) {
		  if (err) {
			reject(new Error(JSON.stringify({
			  status: 400,
			  type: 'Login failed'
			})));
		  } else if (!err && !same) {
			// wrong password
			reject(new Error(JSON.stringify({
			  status: 400,
			  type: `Passwords don't match`
			})));
		  } else {
			return resolve(currentUser);
		  }
		});
	  });
	}
  
	function _generateHash(password) {
	  return new Promise(function (resolve) {
		let salt = bcrypt.genSaltSync(10);
		let hash = bcrypt.hashSync(password, salt);
		resolve(hash);
	  });
	}
  
  })();