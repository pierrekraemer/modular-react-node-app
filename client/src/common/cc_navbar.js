import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import SigninNav from '../user/pc_signin_nav';
import ProtectedNavItem from '../user/pc_protected_navitem';

const NavBar = (props) => (
	<Navbar className="mb-4" color="inverse" inverse toggleable>
		<NavbarToggler right />
		<NavbarBrand tag={ Link } to="/"> Home </NavbarBrand>
		<Collapse navbar>
			<Nav navbar>
				<NavItem>
					<NavLink tag={ Link } to="/weather"> Weather </NavLink>
				</NavItem>
				<ProtectedNavItem user={ props.user } authorizedRoles={ ['user'] }>
					<NavLink tag={ Link } to="/todolist"> TodoList </NavLink>
				</ProtectedNavItem>
			</Nav>
			<SigninNav user={ props.user } />
		</Collapse>
	</Navbar>
);

export default connect(
	(state) => ({
		user: state.user
	})
)(NavBar);
