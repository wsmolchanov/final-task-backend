(function () {
	'use strict';

	const server = require('../server');
  const config = require('../config/config');
  const AuthService = require('../services/auth.service');

	module.exports = {
		login,
		signup
  };

  async function login(req, res, next) {
    // todo: validate req.body
    try {
      console.log('login auth controller, body: ', req.body);

      let user = await AuthService.findUsers([req.body]);

      if (user && user[0]) {
        user = await AuthService.comparePassword(req.body.password, user[0]);
        // generate jwt token


        // res.status(200).send( {token: token, user:user} );

        res.status(200).send(user);
      } else {
        throw new Error('such user not found');
      }
    } catch (error) {
      next(error);
    }
  }

  async function signup(req, res, next) {
    // todo: validate req.body
    try {
      console.log('signup auth controller, body: ', req.body);

      let user = await AuthService.findUsers({email: req.body.email});

      if (user && user[0]) {
        throw new Error('user already exist');
      } else {
        user = await AuthService.createUser(req.body);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }





})();