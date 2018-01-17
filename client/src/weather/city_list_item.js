import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ListGroupItem,
	Button,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class CityListItem extends React.PureComponent {
	state = {
		confirmation_modal_open: false
	};
	
	handleRemove = () => {
		this.setState({ confirmation_modal_open: true });
	};

	confirmRemove = () => {
		this.setState({ confirmation_modal_open: false });
		return this.props.onRemove(this.props.city.id);
	};

	dismissRemove = () => {
		this.setState({ confirmation_modal_open: false });
	};

	handleRefresh = () => {
		this.props.onRefresh(this.props.city.name);
	}
	
	render() {
		console.log('render city item : ' + this.props.city.name);
		return (
			<ListGroupItem className="d-flex align-items-center" color={ this.props.active ? 'info' : '' }>
				<Link to={ '/weather/' + this.props.city.id } className="col" style={{ textDecoration: 'none' }}> { this.props.city.name } </Link>
				<Button outline color="primary" className="ml-auto" onClick={ this.handleRefresh }>
					<i className="fa fa-refresh"></i>
				</Button>
				<Button outline color="danger" className="ml-1" onClick={ this.handleRemove }>
					<i className="fa fa-times"></i>
				</Button>
				<Modal isOpen={ this.state.confirmation_modal_open }>
					<ModalHeader> Confirmation </ModalHeader>
					<ModalBody> Are you sure you want to delete this city ({ this.props.city.name }) ? </ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={ this.confirmRemove }> Yes </Button>{' '}
						<Button color="secondary" onClick={ this.dismissRemove }> No </Button>
					</ModalFooter>
				</Modal>
			</ListGroupItem>
		);
	}
}

CityListItem.propTypes = {
	city: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	active: PropTypes.bool.isRequired,
	onRefresh: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default CityListItem;
