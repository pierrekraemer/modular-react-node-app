import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signout } from 'actions/user';

class UserSignout extends React.Component {

	componentDidMount() {
		this.props.signout();
	}
	
	render() {
		return (<Redirect to="/" />);
	}
};

UserSignout.propTypes = {
	signout: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		signout: () => dispatch(signout())
	})
)(UserSignout);
