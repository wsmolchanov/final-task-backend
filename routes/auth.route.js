(function () {
	'use strict';

	const AuthController = require('../controllers/auth.controller');

	module.exports = function (app) {
		app.get('/auth', AuthController.auth);
		app.post('/auth/login', AuthController.login);
		app.post('/auth/signup', AuthController.signup);
		app.put('/auth/update', AuthController.update);
		app.get('/auth/getUsers', AuthController.getUsers)
	};
})();