'use strict';

const
utils = require('../services/utils'),
userCtrl = require('../controllers/user');

module.exports = {
	prefix: '/api/user',
	routes: [
		{
			path: '/signin',
			usage: [
				{
					verb: 'post',
					func: userCtrl.signin
				}
			]
		},
		{
			path: '/signup',
			usage: [
				{
					verb: 'post',
					func: userCtrl.signup
				}
			]
		},
		{
			path: '/whoami',
			usage: [
				{
					verb: 'get',
					func: [ utils.identifyUser, userCtrl.getByToken ]
				}
			]
		}
	]
};
