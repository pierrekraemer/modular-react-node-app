import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InlineEdit from 'components/utils/inline_edit';

class TodoListItem extends React.PureComponent {
	state = {
		confirmationModalOpen: false
	};

	toggleDone = (event) => {
		event.preventDefault();
		return this.props.onUpdate(this.props.todo.id, { done: !this.props.todo.done });
	};
	
	changeText = (text) => {
		return this.props.onUpdate(this.props.todo.id, { text });
	};

	onRemove = (event) => {
		event.preventDefault();
		this.setState({ confirmationModalOpen: true });
	};

	confirmRemove = () => {
		this.setState({ confirmationModalOpen: false });
		return this.props.onRemove(this.props.todo.id);
	};

	dismissRemove = () => {
		this.setState({ confirmationModalOpen: false });
	};

	render() {
		return (
			<ListGroupItem className="d-flex align-items-center">
				{ this.props.todo.done ? (
					<a href="" className="btn btn-small text-warning" onClick={ this.toggleDone }>
						<i className="fa fa-repeat"></i>
					</a>
				) : (
					<a href="" className="btn btn-small text-success" onClick={ this.toggleDone }>
						<i className="fa fa-check"></i>
					</a>
				)}

				<span style={{
					color: this.props.todo.done ? 'darkgrey' : 'black',
					textDecoration: this.props.todo.done ? 'line-through' : 'none'
				}}>
					<InlineEdit text={ this.props.todo.text } onEdited={ this.changeText } />
				</span>
				
				<span className="ml-auto">
					<a href="" className="btn btn-small text-danger" onClick={ this.onRemove }> <i className="fa fa-trash"></i> </a>
				</span>

				<Modal isOpen={ this.state.confirmationModalOpen }>
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
};

TodoListItem.propTypes = {
	todo: PropTypes.shape({
		text: PropTypes.string.isRequired,
		done: PropTypes.bool.isRequired
	}).isRequired,
	onUpdate: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default TodoListItem;
