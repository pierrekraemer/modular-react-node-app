import React from 'react';
import PropTypes from 'prop-types';

class InlineEdit extends React.Component {
	state = {
		text: this.props.text,
		lastSave: this.props.text,
		editing: false
	};

	textInput = null;

	toggleEdit = (event) => {
		event.preventDefault();
		this.setState({ editing: true });
	};

	handleChange = (event) => {
		this.setState({ text: event.target.value });
	};

	handleKeyUp = (event) => {
		if (event.keyCode === 13) {
			this.handleBlur();
		}
	};

	handleBlur = () => {
		this.setState({ editing: false });
		this.props.onEdited(this.state.text)
		.then(() => this.setState({ lastSave: this.state.text }))
		.catch(() => this.setState({ text: this.state.lastSave }));
	};

	componentDidUpdate(prevProps, prevState) {
		if (this.state.editing && !prevState.editing) {
			this.textInput.focus();
		}
	}

	render() {
		if (this.state.editing) {
			return (
				<input type="text" value={ this.state.text }
					ref={ (elem) => this.textInput = elem }
					onChange={ this.handleChange }
					onKeyUp={ this.handleKeyUp }
					onBlur={ this.handleBlur }
				/>
			);
		} else {
			return (
				<span>
					{ this.state.text }
					<a href="" className="btn btn-small text-warning" onClick={ this.toggleEdit }>
						<i className="fa fa-pencil"></i>
					</a>
				</span>
			);
		}
	}
}

InlineEdit.propTypes = {
	text: PropTypes.string.isRequired,
	onEdited: PropTypes.func.isRequired
};

export default InlineEdit;
