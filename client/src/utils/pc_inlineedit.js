import React from 'react';
import PropTypes from 'prop-types';

const InlineEdit = (props) => Object.assign(
	Object.create(React.Component.prototype),
	{
		props,

		state: {
			text: props.text,
			lastSave: props.text,
			editing: false
		},

		toggleEdit(event) {
			this.setState({ editing: true });
		},

		handleChange(event) {
			this.setState({ text: event.target.value });
		},

		handleKeyUp(event) {
			if (event.keyCode === 13) {
				this.handleBlur();
			}
		},

		handleBlur() {
			this.setState({ editing: false });
			this.props.onEdited(this.state.text)
			.then(() => this.setState({ lastSave: this.state.text }))
			.catch((err) => {
				this.setState({ text: this.state.lastSave });
			});
		},

		componentDidUpdate(prevProps, prevState) {
			if (this.state.editing && !prevState.editing) {
				this.textInput.focus();
			}
		},

		render() {
			if (this.state.editing) {
				return (
					<input type="text" value={ this.state.text }
						ref={ (input) => this.textInput = input }
						onChange={ (e) => this.handleChange(e) }
						onKeyUp={ (e) => this.handleKeyUp(e) }
						onBlur={ () => this.handleBlur() }
					/>
				);
			} else {
				return (
					<span>
						{ this.state.text }
						<a href="" className="btn btn-small text-warning" onClick={
							(e) => { e.preventDefault(); this.toggleEdit(e); }
						}> <i className="fa fa-pencil"></i> </a>
					</span>
				);
			}
		}
	}
);

InlineEdit.propTypes = {
	text: PropTypes.string.isRequired,
	onEdited: PropTypes.func.isRequired
};

export default InlineEdit;
