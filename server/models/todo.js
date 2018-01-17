'use strict';

module.exports = (sequelize, DataTypes) => {

	const Todo = sequelize.define(
		'Todo',
		{
			text: { type: DataTypes.STRING },
			done: { type: DataTypes.BOOLEAN, defaultValue: false }
		}
	);

	Todo.associate = (db) => {
		Todo.belongsTo(db.User);
	};

	return Todo;

};
