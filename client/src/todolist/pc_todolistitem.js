import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroupItem, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import InlineEdit from '../utils/pc_inlineedit';

const TodoListItem = (props) => Object.assign(
	Object.create(React.Component.prototype),
	{
		props,

		state: { confirmation_modal_open: false },

		toggleDone (e) {
			e.preventDefault();
			this.props.onToggleDone();
		},

		onRemove (e) {
			e.preventDefault();
			this.setState({ confirmation_modal_open: true });
		},

		confirmRemove (b) {
			this.setState({ confirmation_modal_open: false });
			if (b) {
				this.props.onRemove();
			}
		},

		render() {
			return (
				<ListGroupItem>
					{ this.props.done ? (
						<a href="" className="btn btn-small text-warning" onClick={ (e) => { this.toggleDone(e) } }>
							<i className="fa fa-repeat"></i>
						</a>
					) : (
						<a href="" className="btn btn-small text-success" onClick={ (e) => { this.toggleDone(e) } }>
							<i className="fa fa-check"></i>
						</a>
					)}

					<span style={{
						color: this.props.done ? 'darkgrey' : 'black',
						textDecoration: this.props.done ? 'line-through' : 'none'
					}}>
						<InlineEdit text={ this.props.text } onEdited={ (text) => this.props.onUpdate(text) } />
					</span>
					
					<span className="ml-auto">
						<a href="" className="btn btn-small text-danger" onClick={ (e) => this.onRemove(e) }> <i className="fa fa-trash"></i> </a>
					</span>

					<Modal isOpen={ this.state.confirmation_modal_open }>
						<ModalHeader> Confirmation </ModalHeader>
						<ModalBody> Are you sure you want to delete this todo ? </ModalBody>
						<ModalFooter>
							<Button color="danger" onClick={ () => this.confirmRemove(true) }> Yes </Button>{' '}
							<Button color="secondary" onClick={ () => this.confirmRemove(false) }> No </Button>
						</ModalFooter>
					</Modal>
				</ListGroupItem>
			);
		}
	}
);

TodoListItem.propTypes = {
	id: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	done: PropTypes.bool.isRequired,
	onRemove: PropTypes.func.isRequired,
	onToggleDone: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
};

export default TodoListItem;
