
const User = {
	hasRole(roles) {
		if (Array.isArray(roles)) {
			return roles.some((r) => this.roles.includes(r));
		} else {
			return this.roles.indexOf(roles) >= 0;
		}
	}
};

const makeUser = (user) => Object.assign(Object.create(User), user);

const user = (
	state = null,
	action
) => {
	switch (action.type) {
		case 'USER::RESPONSE_SIGNIN':
			return makeUser(action.data);
		case 'USER::SIGNOUT':
			return null;
		default:
			return state;
	}
};

export default user;
