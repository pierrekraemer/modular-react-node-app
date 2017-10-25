'use strict';

module.exports = function (sequelize, DataTypes) {

	const Todo = sequelize.define(
		'Todo',
		{
			text: { type: DataTypes.STRING },
			done: { type: DataTypes.BOOLEAN, defaultValue: false }
		}
	);

	Todo.associate = function (db) {
		Todo.belongsTo(db.User);
	};

	return Todo;

};
