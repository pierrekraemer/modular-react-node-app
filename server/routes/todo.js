'use strict';

const
utils = require('../services/utils'),
todoCtrl = require('../controllers/todo');

module.exports = {
	prefix: '/api/todo',
	routes: [
		{
			path: '/',
			usage: [
				{
					verb: 'post',
					func: todoCtrl.create
					// func: [ utils.identifyUser, todoCtrl.create ]
				},
				{
					verb: 'get',
					func: todoCtrl.getByUser
					// func: [ utils.identifyUser, todoCtrl.getByUser ]
				}
			]
		},
		{
			path: '/:todoid',
			usage: [
				{
					verb: 'put',
					func: todoCtrl.updateById
					// func: [ utils.identifyUser, todoCtrl.updateById ]
				},
				{
					verb: 'delete',
					func: todoCtrl.deleteById
					// func: [ utils.identifyUser, todoCtrl.deleteById ]
				}
			]
		}
	]
};
