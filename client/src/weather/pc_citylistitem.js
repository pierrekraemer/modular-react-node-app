import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ListGroupItem,
	Button,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const CityListItem = (props) => {
	
	const comp = Object.create(React.Component.prototype);

	const onRemove = () => {
		comp.setState({ confirmation_modal_open: true });
	};

	const confirmRemove = () => {
		comp.setState({ confirmation_modal_open: false });
		return comp.props.onRemove();
	};

	const dismissRemove = () => {
		comp.setState({ confirmation_modal_open: false });
	};
	
	return Object.assign(comp, {
		props,

		state: {
			confirmation_modal_open: false
		},

		render() {
			return (
				<ListGroupItem>
					<Link className="col" to={ '/weather/' + this.props.city.id }> { this.props.city.name } </Link>
					<Button outline color="primary" className="ml-auto" onClick={ this.props.onRefresh }>
						<i className="fa fa-refresh"></i>
					</Button>
					<Button outline color="danger" className="ml-1" onClick={ onRemove }>
						<i className="fa fa-times"></i>
					</Button>
					<Modal isOpen={ this.state.confirmation_modal_open }>
						<ModalHeader> Confirmation </ModalHeader>
						<ModalBody> Are you sure you want to delete this city ? </ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={ confirmRemove }> Yes </Button>{' '}
							<Button color="secondary" onClick={ dismissRemove }> No </Button>
						</ModalFooter>
					</Modal>
				</ListGroupItem>
			);
		}
	});
}

CityListItem.propTypes = {
	city: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	onRefresh: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default CityListItem;