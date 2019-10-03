(function () {
  'use strict';

  const jwt = require('jsonwebtoken');
  const config = require('../config/config');
  const JWT_KEY = config.JWT_KEY;

  module.exports = {
    jwtCreate,
    jwtVerify
  };

  function jwtCreate(payload, expiresIn = '1d') {
    return new Promise(function (resolve, reject) {
      jwt.sign(payload, JWT_KEY, { expiresIn }, function (err, token) {
        if (err) {
          reject(new Error(JSON.stringify({
            status: 400,
            type: 'JWT Generate Server Error'
          })));
        } else {
          resolve({ token: token, payload: payload });
        }
      });
    });
  }

  function jwtVerify (token, key) {
	return new Promise(function (resolve, reject) {
  	  jwt.verify(
	    token,
		  key || JWT_KEY,
		  function (err, decoded) {
			if (err) {
		      reject(new Error(JSON.stringify({
			  status : 400,
				type   : 'JWT Verify Server Error'
			  })));
			} else {
			   resolve(decoded);
			}
		  }
	  );
	});
  }

})();