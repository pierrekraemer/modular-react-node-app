import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';

import AddCity from './cc_addcity';
import CityList from './cc_citylist';
import { fetchAll } from './weather_actions';

const WeatherApp = (props) => (
	<div>
		<Row className="mb-4">
			<Col sm={10}>
				<AddCity />
			</Col>
			<Col sm={2}>
				<Button color="primary" onClick={ props.onRefreshAll }>
					<i className="fa fa-refresh"></i> Refresh all
				</Button>
			</Col>
		</Row>
		<CityList />
	</div>
);

WeatherApp.propTypes = {
	onRefreshAll: PropTypes.func.isRequired
};

export default connect(
	null,
	(dispatch) => ({
		onRefreshAll: () => dispatch(fetchAll())
	})
)(WeatherApp);
