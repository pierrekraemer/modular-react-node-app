import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import WeatherApp from './weather/cc_weatherapp';
import TodoListApp from './todolist/cc_todolistapp';

const App = (props) => (
	<div>
		<Navbar className="mb-4" color="inverse" inverse toggleable>
			<NavbarToggler right />
			<NavbarBrand tag={Link} to="/"> Home </NavbarBrand>
			<Collapse navbar>
				<Nav className="ml-auto" navbar>
					<NavItem> <NavLink tag={Link} to="/weather"> Weather </NavLink> </NavItem>
					<NavItem> <NavLink tag={Link} to="/todolist"> TodoList </NavLink> </NavItem>
				</Nav>
			</Collapse>
		</Navbar>
		<div className="container">
			<Route exact path="/" render={ () => (
				<div className="jumbotron">
					<h1> Welcome home ! </h1>
				</div>
			) } />
			<Route path="/weather" component={ WeatherApp } />
			<Route path="/todolist" component={ TodoListApp } />
		</div>
	</div>
);

export default App;
