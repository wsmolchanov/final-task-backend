(function() {
  'use strict';

  const bcrypt = require('bcrypt-nodejs');
  const jwt = require('jsonwebtoken');


  module.exports = {    
    comparePassword,
    _generateHash
  };




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