import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardText } from 'reactstrap';

const CityDetail = (props) => {
	if (!props.data) {
		return (<Redirect to="/weather" />);
	} else {
		return (
			<Card className="mb-4">
				<CardHeader> { props.data.name } </CardHeader>
				<CardBody>
					<CardText> Temp: { props.data.main.temp }°C </CardText>
					<CardText> Humidity: { props.data.main.humidity }% </CardText>
				</CardBody>
			</Card>
		);
	}
};

CityDetail.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string.isRequired,
		main: PropTypes.shape({
			temp: PropTypes.number.isRequired,
			humidity: PropTypes.number.isRequired
		}).isRequired
	})
};

const getCityData = (cities, city_id) => {
	return cities.find((c) => c.id == city_id);
};

export default withRouter(connect(
	(state, ownProps) => ({
		data: getCityData(state.weather.cities, ownProps.match.params.city_id)
	})
)(CityDetail));
