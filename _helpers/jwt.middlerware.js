(function () {
	'use strict';
  
	const JwtService = require('../services/jwt.service');
  
	exports.jwtCheck = function (req, res, next) {
	  if (req && req.headers && req.headers.authorization) {
		JwtService.jwtVerify(req.headers.authorization)
		  .then(decodedToken => {
			req.userId = decodedToken._id;
			next();
		  })
		  .catch(error => {
			console.log('error', error);
			next();
		  });
	  } else {
		req.userId = null;
		next();
	  }
	}
  })();
  