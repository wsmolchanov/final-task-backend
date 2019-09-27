(function () {
	'use strict';

	const server = require('../server');
  const config = require('../config/config');
  const UserService = require('../services/user.service');
  const JwtServie = require('../services/jwt.service');
  const checkPassword = require('../_helpers/checkPassword');
  const jwt = require('jsonwebtoken');

  

	module.exports = {
		login,
		signup
  };

  async function login(req, res, next) {
    // todo: validate req.body
    const { email, password } = req.body;
    if (!email || !password) { next(new Error('invalid body request')); }
    try {
      console.log('login auth controller, body: ', req.body);

      let user = await UserService.findUsers([req.body]);

      if (user && user[0]) {
        throw new Error('user already exist');
      } else {
        user = await UserService.createUser(req.body);
      }
      // generate jwt token
      user = await User.findOne({ email: req.body.email });
      const jwtData = await JwtService.jwtCreate(user);

      res.status(200).send( {token: jwtData.token, user: user} );

      // res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
        

  async function signup(req, res, next) {
    // todo: validate req.body
    const { email, password } = req.body;
    if (!email || !password) { next(new Error('invalid body request')); }

    try {
      console.log('signup auth controller, body: ', req.body);

      let user = await AuthService.findUsers([req.body]);

      if (user && user[0]) {
        throw new Error('user already exist');
      } else {
        const hashPassword = await checkPassword._generateHash(userParams.password);
		    userParams.password = hashPassword;
        user = await AuthService.createUser(req.body);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
    
  }





})();