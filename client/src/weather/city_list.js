import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup } from 'reactstrap';

import CityListItem from './city_list_item';

import { fetchCity, removeCity } from './actions';

const CityList = (props) => (
	<ListGroup>
		{ props.cities.map((city) => (
			<CityListItem
				active={ city.id === props.currentCityId }
				key={ city.id }
				city={ city }
				onRefresh={ () => props.onRefreshCity(city.name) }
				onRemove={ () => props.onRemoveCity(city.id) }
			/>
		)) }
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
	onRemoveCity: PropTypes.func.isRequired,
	currentCityId: PropTypes.number
};

export default connect(
	(state, ownProps) => ({
		cities: state.weather.cities,
		currentCityId: parseInt(ownProps.match.params.city_id)
	}),
	(dispatch) => ({
		onRefreshCity: (cityName) => dispatch(fetchCity(cityName)),
		onRemoveCity: (cityId) => dispatch(removeCity(cityId))
	})
)(CityList);
