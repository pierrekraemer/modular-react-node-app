import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';

import AddCity from 'components/weather/add_city';
import CityList from 'components/weather/city_list';
import CityDetail from 'components/weather/city_detail';

import { fetchAll } from 'actions/weather';

const Weather = (props) => (
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
				<Route path={ props.match.url + '/:city_id?' } component={ CityList } /> 
			</Col>
			<Col sm={7}>
				<Route path={ props.match.url + '/:city_id' } component={ CityDetail } />
			</Col>
		</Row>
	</Col>
);

Weather.propTypes = {
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
)(Weather);
