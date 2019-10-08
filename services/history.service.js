(function () {
	'use strict';

	const server = require('../server');
	const config = require('../config/config');
	const History = server.main.model('history');


	module.exports = {
	  findHistory,
      createHistory

  };

  async function findHistory(query) {
		try {
			return await History.find(query);
		} catch (error) {
			throw error;
		}
	}

  async function createHistory(historyParams) {
		try {
			const history = await History.create(historyParams);

			return history;
		} catch (e) {
			throw e;
		}
	}








})();
