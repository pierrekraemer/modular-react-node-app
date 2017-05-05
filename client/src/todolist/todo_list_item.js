import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InlineEdit from '../utils/inline_edit';

const TodoListItem = (props) => {

	const comp = Object.create(React.Component.prototype);

	const toggleDone = (event) => {
		event.preventDefault();
		return comp.props.onUpdate({ done: !comp.props.done });
	};
	
	const changeText = (text) => {
		return comp.props.onUpdate({ text });
	};

	const onRemove = (event) => {
		event.preventDefault();
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
					{ this.props.done ? (
						<a href="" className="btn btn-small text-warning" onClick={ toggleDone }>
							<i className="fa fa-repeat"></i>
						</a>
					) : (
						<a href="" className="btn btn-small text-success" onClick={ toggleDone }>
							<i className="fa fa-check"></i>
						</a>
					)}

					<span style={{
						color: this.props.done ? 'darkgrey' : 'black',
						textDecoration: this.props.done ? 'line-through' : 'none'
					}}>
						<InlineEdit text={ this.props.text } onEdited={ changeText } />
					</span>
					
					<span className="ml-auto">
						<a href="" className="btn btn-small text-danger" onClick={ onRemove }> <i className="fa fa-trash"></i> </a>
					</span>

					<Modal isOpen={ this.state.confirmation_modal_open }>
						<ModalHeader> Confirmation </ModalHeader>
						<ModalBody> Are you sure you want to delete this todo ? </ModalBody>
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

TodoListItem.propTypes = {
	text: PropTypes.string.isRequired,
	done: PropTypes.bool.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired
};

export default TodoListItem;
