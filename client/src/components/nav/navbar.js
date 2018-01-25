import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import SigninNav from 'components/nav/signin';
import ConditionalNavItem from 'components/nav/conditional_navitem';

class NavBar extends React.Component {
	state = {
		navbarOpen: false
	};
	
	toggleNavbar = () => {
		this.setState((prevState) => ({
			navbarOpen: !prevState.navbarOpen
		}));
	};
	
	render() {
		return (
			<Navbar dark fixed="top" expand="md" className="bg-dark">
				<div className="container">
					<NavbarBrand tag={ Link } to="/"> Home </NavbarBrand>
					<NavbarToggler onClick={ this.toggleNavbar } />
					<Collapse isOpen={ this.state.navbarOpen } navbar>
						<Nav navbar>
							<NavItem>
								<NavLink tag={ Link } to="/weather"> Weather </NavLink>
							</NavItem>
							<ConditionalNavItem condition={ () => this.props.user /*&& this.props.user.hasRole(['user'])*/ }>
								<NavLink tag={ Link } to="/todolist"> TodoList </NavLink>
							</ConditionalNavItem>
						</Nav>
						<SigninNav user={ this.props.user } />
					</Collapse>
				</div>
			</Navbar>
		);
	}
};

NavBar.propTypes = {
	user: PropTypes.object
};

export default connect(
	(state) => ({
		user: state.user
	})
)(NavBar);
