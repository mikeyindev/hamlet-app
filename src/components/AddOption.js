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
    return <div>
        {this.state.error && 
          <p className="AddOption--error">
            {this.state.error}
          </p>}
        <form className="AddOption" onSubmit={this.handleAddOption}>
        <input className="AddOption__input" type="text" name="option" />
          <button className="button">Add Task</button>
        </form>
      </div>;
  }
}