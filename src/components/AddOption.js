import React from 'react';

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
    this.handleAddOption = this.handleAddOption.bind(this);
  }

  handleAddOption(e) {
    e.preventDefault();
    const option = e.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);

    this.setState(() => ({ error }));
    // if (option) {
    //   this.props.handleAddOption(option);
    // }

    // If no error, clear the form
    if (!error) {
      e.target.elements.option.value = "";
    }
  }

  // If this.state.error is not undefined, render a paragraph containing the error message
  render() {
    return (
      <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
          <input className="add-option__input" type="text" name="option" />
          <button className="add-option-button">Add Task</button>
        </form>
      </div>
    );
  }
}