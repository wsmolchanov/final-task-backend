(function () {
	'use strict';

	const AuthController = require('../controllers/auth.controller');

	module.exports = function (app) {
    app.post('/auth/login', AuthController.login);
		app.post('/auth/register', AuthController.register);
	};
})();