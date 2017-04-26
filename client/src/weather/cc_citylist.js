import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

import CityListItem from './pc_citylistitem';

import { fetchCity, removeCity } from './weather_actions';

const CityList = (props) => (
	<ListGroup>
		{ props.cities.map((city) => {
			return (
				<CityListItem
					key={ city.id }
					city={ city }
					onRefresh={ () => props.onRefreshCity(city.name) }
					onRemove={ () => props.onRemoveCity(city.id) }
				/>
			);
		}) }
	</ListGroup>
);

CityList.propTypes = {
	cities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired
		}).isRequired
	).isRequired,
	onRefreshCity: PropTypes.func.isRequired,
	onRemoveCity: PropTypes.func.isRequired
};

export default connect(
	(state) => ({
		cities: state.weather.cities
	}),
	(dispatch) => ({
		onRefreshCity: (cityName) => dispatch(fetchCity(cityName)),
		onRemoveCity: (cityId) => dispatch(removeCity(cityId))
	})
)(CityList);
