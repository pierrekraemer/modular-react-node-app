import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavItem } from 'reactstrap';

const ProtectedNavItem = (props) => {
	if (props.user && props.user.hasRole(props.authorizedRoles)) {
		return (<NavItem> { props.children } </NavItem>);
	} else {
		return null;
	}
};

ProtectedNavItem.propTypes = {
	user: PropTypes.object,
	authorizedRoles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ProtectedNavItem;
