'use strict';

const
fs = require('fs'),
express = require('express');

module.exports = (app) => {

	fs.readdirSync(__dirname)
	.filter((filename) => filename !== 'index.js')
	.forEach((filename) => {
		const router_data = require('./' + filename);

		const router = express.Router({ mergeParams: true });

		router_data.routes.forEach((route_data) => {
			const r = router.route(route_data.path);
			route_data.usage.forEach((u) => { r[u.verb](u.func); });
		});

		app.use(router_data.prefix, router);
	});

};
