(function () {
	'use strict';

	const server = require('../server');
	const config = require('../config/config');

	module.exports = {
		login,
		signup
  };

  function login(req, res, next) {
    console.log('login auth controller');

    
    console.log(req.body);

    res.status(200).send({ message: 'login is good' });
  }

  function signup(req, res, next) {
    console.log('signup auth controller');

    console.log(req.body);

    res.status(200).send({ message: 'signup is good' });
    let payload = {
			...req.body,
		}

  }

  



})();