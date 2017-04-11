'use strict';

const
jsonwebtoken = require('jsonwebtoken'),
secret = require('../config/secret'),
db = require('../models');

module.exports = {

	signin: (req, res, next) => {
		const username = req.body.username || '';
		const password = req.body.password || '';

		db.User.findOne({
			where: { username }
		})
		.then((user) => {
			if (!user) {
				const err = new Error('User not found');
				err.status = 404;
				throw err;
			}
			if (!user.validatePassword(password)) {
				const err = new Error('Wrong password');
				err.status = 401;
				throw err;
			}

			const token = jsonwebtoken.sign(
				{ id: user.id },
				secret,
				{ expiresIn: 60 * 60 * 12 }
			);

			return res.json({ user, token });
		})
		.catch((err) => next(err));
	},
	
	getByToken: (req, res, next) => {
		return res.json(req.user);
	}

};
