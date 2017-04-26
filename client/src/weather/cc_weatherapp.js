import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

import AddCity from './cc_addcity';
import CityList from './cc_citylist';
import CityDetail from './cc_citydetail';

import { fetchAll } from './weather_actions';

const WeatherApp = (props) => (
	<Col sm={12} md={{ size: 8, offset: 2 }}>
		<Row className="mb-4">
			<Col sm={9}>
				<AddCity />
			</Col>
			<Col sm={3}>
				<Button color="primary" onClick={ props.onRefreshAll }>
					<i className="fa fa-refresh"></i> Refresh all
				</Button>
			</Col>
		</Row>
		<Row>
			<Col sm={5}>
				<CityList />
			</Col>
			<Col sm={7}>
				<Route path="/weather/:city_id" component={ CityDetail } />
			</Col>
		</Row>
	</Col>
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
