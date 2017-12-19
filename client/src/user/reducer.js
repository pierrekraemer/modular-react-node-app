
const User = {
	hasRole(roles) {
		if (Array.isArray(roles)) {
			return roles.some((r) => this.roles.includes(r));
		} else {
			return this.roles.indexOf(roles) >= 0;
		}
	}
};

const makeUser = (data) => Object.assign(Object.create(User), data);

const user = (
	state = null,
	action
) => {
	switch (action.type) {
		case 'USER::RESPONSE_SIGNIN':
			return makeUser(action.user);
		case 'USER::SIGNOUT':
			return null;
		default:
			return state;
	}
};

export default user;
