const user = (
	state = null,
	action
) => {
	switch (action.type) {
		case 'USER::RESPONSE_SIGNIN': {
			return action.user;
		}
		case 'USER::SIGNOUT': {
			return null;
		}
		default:
			return state;
	}
};

export default user;
