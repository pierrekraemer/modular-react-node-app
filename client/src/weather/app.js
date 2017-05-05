import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

import AddCity from './add_city';
import CityList from './city_list';
import CityDetail from './city_detail';

import { fetchAll } from './actions';

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
				{ props.isFetching && <i className="ml-1 fa fa-spinner fa-spin"></i> }
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
	isFetching: PropTypes.bool.isRequired,
	onRefreshAll: PropTypes.func.isRequired
};

export default connect(
	(state) => ({
		isFetching: state.weather.isFetching
	}),
	(dispatch) => ({
		onRefreshAll: () => dispatch(fetchAll())
	})
)(WeatherApp);
