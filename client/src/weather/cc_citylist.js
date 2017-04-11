import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
	Row, Col, Button,
	Card, CardHeader, CardBlock, CardTitle, CardText,
	Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { fetchCity, removeCity } from './weather_actions';

const City = (props) => Object.assign(
	Object.create(React.Component.prototype),
	{
		props,

		state: { modal_open: false },

		on_remove: function (e) {
			e.preventDefault();
			this.setState((prevState) => ({ modal_open: true }));
		},

		confirm_remove: function (b) {
			this.setState((prevState) => ({ modal_open: false }));
			if (b) {
				this.props.onRemove();
			}
		},

		render() {
			return (
				<Col sm={4}>
					<Card className="mb-4">
						<CardHeader>
							{ this.props.data.name }
							<button type="button" className="close pull-right" onClick={ (e) => this.on_remove(e) }> &times; </button>
						</CardHeader>
						<CardBlock>
							<CardText> Temp: { this.props.data.main.temp }°C </CardText>
							<CardText> Humidity: { this.props.data.main.humidity }% </CardText>
							<Button color="primary" className="float-right" onClick={ () => this.props.onRefresh() }>
								<i className="fa fa-refresh"></i>
							</Button>
						</CardBlock>
					</Card>
					
					<Modal isOpen={ this.state.modal_open }>
						<ModalHeader> Confirmation </ModalHeader>
						<ModalBody> Are you sure you want to delete this city ? </ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={ () => this.confirm_remove(true) }> Yes </Button>{' '}
							<Button color="secondary" onClick={ () => this.confirm_remove(false) }> No </Button>
						</ModalFooter>
					</Modal>
				</Col>
			);
		}
	}
);

City.propTypes = {
	data: PropTypes.shape({
		name: PropTypes.string.isRequired,
		main: PropTypes.shape({
			temp: PropTypes.number.isRequired,
			humidity: PropTypes.number.isRequired
		}).isRequired
	}).isRequired,
	onRefresh: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

const CityList = (props) => (
	<Row>
		{ props.cities.map((city) => {
			return (
				<City
					key={ city.id }
					data={ city }
					onRefresh={ () => props.onRefreshCity(city.name) }
					onRemove={ () => props.onRemoveCity(city.id) }
				/>
			);
		}) }
	</Row>
);

CityList.propTypes = {
	cities: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired
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
