import React from 'react';
import PropTypes from 'prop-types';
import { NavItem } from 'reactstrap';

const ConditionalNavItem = (props) => {
	if (props.condition()) {
		return (<NavItem> { props.children } </NavItem>);
	} else {
		return null;
	}
};

ConditionalNavItem.propTypes = {
	condition: PropTypes.func.isRequired
};

export default ConditionalNavItem;
