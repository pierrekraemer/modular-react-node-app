import React from 'react';
import PropTypes from 'prop-types';

const InlineEdit = (props) => {
	let textInput;

	const comp = Object.create(React.Component.prototype);

	const toggleEdit = (event) => {
		event.preventDefault();
		comp.setState({ editing: true });
	};

	const handleChange = (event) => {
		comp.setState({ text: event.target.value });
	};

	const handleKeyUp = (event) => {
		if (event.keyCode === 13) {
			handleBlur();
		}
	};

	const handleBlur = () => {
		comp.setState({ editing: false });
		props.onEdited(comp.state.text)
		.then(() => comp.setState({ lastSave: comp.state.text }))
		.catch(() => comp.setState({ text: comp.state.lastSave }));
	};

	return Object.assign(comp, {
		state: {
			text: props.text,
			lastSave: props.text,
			editing: false
		},

		componentDidUpdate(prevProps, prevState) {
			if (this.state.editing && !prevState.editing) {
				textInput.focus();
			}
		},

		render() {
			if (this.state.editing) {
				return (
					<input type="text" value={ this.state.text }
						ref={ (elem) => textInput = elem }
						onChange={ handleChange }
						onKeyUp={ handleKeyUp }
						onBlur={ handleBlur }
					/>
				);
			} else {
				return (
					<span>
						{ this.state.text }
						<a href="" className="btn btn-small text-warning" onClick={ toggleEdit }>
							<i className="fa fa-pencil"></i>
						</a>
					</span>
				);
			}
		}
	});
};

InlineEdit.propTypes = {
	text: PropTypes.string.isRequired,
	onEdited: PropTypes.func.isRequired
};

export default InlineEdit;
