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
			// underscored: true,
			classMethods: {
				associate: function (db) {
					User.hasMany(db.Todo);
					// User_.belongsToMany(models.OtherModel);
				},
				generateHash: (password) => bcrypt.hashSync(password, 10),
				roles: () => (
					{
						admin: 'admin',
						user: 'user'
					}
				)
			},
			instanceMethods: {
				toJSON: function () {
					const data = Object.assign({}, this.get());
					delete data.password;
					return data;
				},
				validatePassword: function (password) { return bcrypt.compareSync(password, this.password); },
				hasRole: function (role) { return this.roles.includes(role); },
				addRole: function (role) {
					if (!this.roles.includes(role)) {
						this.roles.push(role);
					}
				}
			}
		}
	);

	return User;

};
