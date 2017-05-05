import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';

const SigninNav = (props) => {
	if (props.user) {
		return (
			<Nav className="ml-auto" navbar>
				<NavItem> <NavLink tag={ Link } to="/signout"> Signout ({ props.user.username }) </NavLink> </NavItem>
			</Nav>
		);
	} else {
		return (
			<Nav className="ml-auto" navbar>
				<NavItem> <NavLink tag={ Link } to="/signup"> Signup </NavLink> </NavItem>
				<NavItem> <NavLink tag={ Link } to="/signin"> Signin </NavLink> </NavItem>
			</Nav>
		);
	}
};

SigninNav.propTypes = {
	user: PropTypes.object
};

export default SigninNav;
