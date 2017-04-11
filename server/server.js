'use strict';

const
express = require('express'),
body_parser = require('body-parser'),
favicon = require('serve-favicon'),
path = require('path'),
_ = require('lodash');


const app = express();
app.disable('x-powered-by');


const public_path = path.resolve('../client/public');
app.use(express.static(public_path));

app.use(body_parser.json());

app.all('*', (req, res, next) => {
	res.set('Access-Control-Allow-Origin', 'http://localhost');
	res.set('Access-Control-Allow-Credentials', true);
	res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, DELETE, PUT');
	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	} else {
		next();
	}
});

require('./routes')(app);

app.all('/*', (req, res) => {
	res.sendFile(public_path + '/index.html');
});

app.use((err, req, res, next) => {
	if (_.isUndefined(err.status)) {
		return res.status(500).send(err.message);
	} else {
		return res.status(err.status).send(err.message);
	}
});


var server = app.listen(3333, () => {
	var host = server.address().address;
	var port = server.address().port;
	console.log('App listening at http://%s:%s', host, port);
});
