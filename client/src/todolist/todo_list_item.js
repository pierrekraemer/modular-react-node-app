import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InlineEdit from '../utils/inline_edit';

class TodoListItem extends React.Component {
	state = {
		confirmation_modal_open: false
	};

	toggleDone = (event) => {
		event.preventDefault();
		return this.props.onUpdate({ done: !comp.props.done });
	};
	
	changeText = (text) => {
		return this.props.onUpdate({ text });
	};

	onRemove = (event) => {
		event.preventDefault();
		this.setState({ confirmation_modal_open: true });
	};

	confirmRemove = () => {
		this.setState({ confirmation_modal_open: false });
		return this.props.onRemove();
	};

	dismissRemove = () => {
		this.setState({ confirmation_modal_open: false });
	};

	render() {
		return (
			<ListGroupItem className="d-flex align-items-center">
				{ this.props.done ? (
					<a href="" className="btn btn-small text-warning" onClick={ this.toggleDone }>
						<i className="fa fa-repeat"></i>
					</a>
				) : (
					<a href="" className="btn btn-small text-success" onClick={ this.toggleDone }>
						<i className="fa fa-check"></i>
					</a>
				)}

				<span style={{
					color: this.props.done ? 'darkgrey' : 'black',
					textDecoration: this.props.done ? 'line-through' : 'none'
				}}>
					<InlineEdit text={ this.props.text } onEdited={ this.changeText } />
				</span>
				
				<span className="ml-auto">
					<a href="" className="btn btn-small text-danger" onClick={ this.onRemove }> <i className="fa fa-trash"></i> </a>
				</span>

				<Modal isOpen={ this.state.confirmation_modal_open }>
					<ModalHeader> Confirmation </ModalHeader>
					<ModalBody> Are you sure you want to delete this todo ? </ModalBody>
					<ModalFooter>
						<Button color="danger" onClick={ this.confirmRemove }> Yes </Button>{' '}
						<Button color="secondary" onClick={ this.dismissRemove }> No </Button>
					</ModalFooter>
				</Modal>
			</ListGroupItem>
		);
	}
}

TodoListItem.propTypes = {
	text: PropTypes.string.isRequired,
	done: PropTypes.bool.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default TodoListItem;
