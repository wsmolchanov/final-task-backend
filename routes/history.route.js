(function () {
	'use strict';

	const HistoryController = require('../controllers/history.controller');

	module.exports = function (app) {
		app.get('/history', HistoryController.getAll);
		app.get('/history/:id', HistoryController.getHistoryById);
		app.post('/history', HistoryController.createHistory);
	};
})();