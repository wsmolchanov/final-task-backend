(function () {
	'use strict';

	// const server = require('../../server');
	// const config = require('../../config/config');

	module.exports = {
		login,
		register
  };

  function login(req, res, next) {
    console.log('login auth controller');

    res.status(200).send({ message: 'login is good' });
  }

  function register(req, res, next) {
    console.log('register auth controller');

    res.status(200).send({ message: 'signup is good' });
  }



})();