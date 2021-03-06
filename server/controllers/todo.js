'use strict';

const
db = require('../models');

module.exports = {

	create: (req, res, next) => {
		return req.user.createTodo({
			text: req.body.text
		})
		.then((todo) => res.json(todo))
		.catch((err) => next(err));
	},
	
	getByUser: (req, res, next) => {
		return req.user.getTodos({
			order: [ [ 'createdAt', 'DESC' ] ]
		})
		.then((todos) => res.json(todos))
		.catch((err) => next(err));
	},
	
	updateById: (req, res, next) => {
		let t;
		return req.user.getTodos({
			where: { id: req.params.todoid }
		})
		.then((todos) => {
			if (todos.length === 0) {
				const err = new Error('Requested Todo not found');
				err.status = 404;
				throw err;
			}
			t = todos[0];
			return t.update(
				req.body,
				{ fields: [ 'text', 'done' ] }
			);
		})
		.then(() => res.json(t))
		.catch((err) => next(err));
	},

	deleteById: (req, res, next) => {
		return req.user.getTodos({
			where: { id: req.params.todoid }
		})
		.then((todos) => {
			if (todos.length === 0) {
				const err = new Error('Requested Todo not found');
				err.status = 404;
				throw err;
			}
			return todos[0].destroy();
		})
		.then(() => res.status(200).end())
		.catch((err) => next(err));
	}

};
