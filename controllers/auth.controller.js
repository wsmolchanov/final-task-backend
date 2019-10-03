(function () {
  'use strict';

  const server = require('../server');
  const config = require('../config/config');
  const UserService = require('../services/user.service');
  const JwtService = require('../services/jwt.service');
  const CheckPassword = require('../_helpers/checkPassword');
  const jwt = require('jsonwebtoken');



  module.exports = {
    auth,
    login,
    signup,
    update,
    getUsers
  };

  async function auth(req, res, next) {
    try {
      if (req.userId) {
        const user = await UserService.findUsers({ _id: req.userId });

        if (user && user[0]) {
          res.status(200).send(user[0]);
        } else {
          throw new Error('user not found');
        }
      } else {
        throw new Error('bad auth token');
      }
    } catch (error) {
      next(error);
    }
  }

  async function login(req, res, next) {
    // todo: validate req.body
    const { email, password } = req.body;
    if (!email || !password) { next(new Error('invalid body request')); }
    try {
      console.log('login auth controller, body: ', req.body);

      let user = await UserService.findUsers({ email: email });

      if (user && user[0]) {
        user = await CheckPassword.comparePassword(req.body.password, user[0]);

        // generate jwt token
        const jwtData = await JwtService.jwtCreate({
          _id: user._id,
          email: user.email,
          password: user.password,
          username: user.username
        });

        res.status(200).send({ token: jwtData.token, user: user });
      } else {
        throw new Error('user not found');

      }
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

      let user = await UserService.findUsers({
        email: email
      });

      if (user && user[0]) {
        throw new Error('user already exist');
      } else {
        const hashPassword = CheckPassword._generateHash(password);
        req.body.password = hashPassword;
        user = await UserService.createUser(req.body);
      }

      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  }
  async function update(err, db) {
    // todo: validate req.body
      if (err) throw err;
      let dbo = db.db("mydb");
      var myquery = { address: /^S/ };
      var newvalues = {$set: {name: "Minnie"} };
      dbo.collection("customers").updateMany(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document(s) updated");
        db.close();
      });

  }

  async function getUsers(req, res, next) {
    const { _id } = req.body;
    try {

      let user = await UserService.findUsers({ _id: _id });

      if (user && user[0]) {
        res.status(200).send({ user });
      } else {
        throw new Error('user not found');

      }
    } catch (error) {
      next(error);
    }


  }






})();