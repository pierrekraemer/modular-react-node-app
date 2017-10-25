'use strict';

const
bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {

	const User = sequelize.define(
		'User',
		{
			username: DataTypes.STRING,
			password: DataTypes.STRING,
			roles: {
				type: DataTypes.STRING,
				get: function () {
					const r = this.getDataValue('roles');
					if (r) { return r.split(','); }
					else { return []; }
				},
				set: function (value) {
					if (Array.isArray(value)) {
						this.setDataValue('roles', value.join(','));
					} else {
						this.setDataValue('roles', value);
					}
				}
			}
		},
		{
			// underscored: true
		}
	);

	User.associate = function (db) {
		User.hasMany(db.Todo);
	};

	User.generateHash = (password) => bcrypt.hashSync(password, 10);

	User.roles = () => ({
		admin: 'admin',
		user: 'user'
	});

	User.prototype.toJSON = function () {
		const data = Object.assign({}, this.get());
		delete data.password;
		return data;
	};

	User.prototype.validatePassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	User.prototype.hasRole = function (role) {
		return this.roles.includes(role);
	};

	User.prototype.addRole = function (role) {
		if (!this.roles.includes(role)) {
			this.roles.push(role);
		}
	};

	return User;

};
