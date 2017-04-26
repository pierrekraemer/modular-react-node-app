import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
	ListGroupItem,
	Button,
	Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

const CityListItem = (props) => Object.assign(
	Object.create(React.Component.prototype),
	{
		props,

		state: { modal_open: false },

		on_remove: function () {
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
				<ListGroupItem>
					<Link className="col" to={ '/weather/' + this.props.city.id }> { this.props.city.name } </Link>
					<Button outline color="primary" className="ml-auto" onClick={ () => this.props.onRefresh() }>
						<i className="fa fa-refresh"></i>
					</Button>
					<Button outline color="danger" className="ml-1" onClick={ () => this.on_remove() }>
						<i className="fa fa-times"></i>
					</Button>
					<Modal isOpen={ this.state.modal_open }>
						<ModalHeader> Confirmation </ModalHeader>
						<ModalBody> Are you sure you want to delete this city ? </ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={ () => this.confirm_remove(true) }> Yes </Button>{' '}
							<Button color="secondary" onClick={ () => this.confirm_remove(false) }> No </Button>
						</ModalFooter>
					</Modal>
				</ListGroupItem>
			);
		}
	}
);

CityListItem.propTypes = {
	city: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired
	}).isRequired,
	onRefresh: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default CityListItem;
