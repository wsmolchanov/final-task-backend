(function () {
  'use strict';

  const server = require('../server');
  const config = require('../config/config');
  const HistoryService = require('../services/history.service');
  const UserService = require('../services/user.service');



  module.exports = {
    getAll,
    getHistoryById,
    createHistory
  };

  async function getAll(req, res, next) {
    try {
      if (req.userId) {
        const user = await UserService.findUsers({ _id: req.userId });
        if (user && user[0]) {
          console.log('getAll');

          const historys = await HistoryService.findHistory();

          res.status(200).send(historys);
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

  async function getHistoryById(req, res, next) {
    try {
      if (req.userId) {
        const user = await UserService.findUsers({ _id: req.userId });
        console.log(req)
        if (user && user[0]) {
          const { id } = req.params;
          console.log('getHistoryById', req.params);
          const history = await HistoryService.findHistory({ id: id });
          res.status(200).send(history);
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


    async function createHistory(req, res, next) {
      try {
        console.log('req',req)
        if (req.userId) {
          const user = await UserService.findUsers({ _id: req.userId });
          if (user && user[0]) {
            console.log('createHistory', req.body);
            const history = await HistoryService.createHistory(req.body);
            res.status(200).send(history);
          } else {
            throw new Error('user not found');
          }
        } else {
          throw new Error('bad auth  token!!!');
        }


      } catch (error) {
        next(error);
      }
    }









  }) ();