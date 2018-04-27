class IndecisionApp extends React.Component {
  constructor(props) {
    // The props object here is the same as this.props
    super(props);
    this.state = {
      // options: ["One", "Two", "Three"] 
      options: props.options
    };
    // Bind removeAll() to 'this' context, so when it's called in an event handler, the context won't be lost
    this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    // In case the JSON object passed to JSON.parse() is invalid JSON
    try {
      const json = localStorage.getItem('options');
      const options = JSON.parse(json);
      if (options) {
        // this.setState(() => { 
        //   return { options: options }
        // });
        this.setState(() => ({options}));
      }
    } catch (e) {
      // Do nothing if it's invalid JSON
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      // Store our data in localStorage, giving it the key 'options'
      localStorage.setItem('options', json);
    }
  }

  handleDeleteAllOptions() {
    // this.setState(() => {
    //   return {
    //     options: []
    //   };
    // });
    this.setState(() => ({ options: [] }));
  }

  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }

  handleAddOption(option) {
    if (!option) {
      return 'Enter valid value to add item.';
    // indexOf returns -1 if the item is not in the array  
    } else if (this.state.options.indexOf(option) > -1) {
      return 'The item has already been added.'
    }

    // this.setState((prevState) => {
    //   return {
    //     options: prevState.options.concat([option])
    //   };
    // });

    // Using concat() returns a new array without changing either of the array we're concatenating
    this.setState((prevState) => ({
      options: prevState.options.concat([option])
    }));
  }

  handleDeleteOption(optionToRemove) {
    console.log(optionToRemove);
    // filter(), return true to keep the element, false to remove it. It returns a new array with only the elements that passed the test
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {
        return optionToRemove !== option;
      })
    }));
  }

  render() {
    const subtitle = "Put your life in the hands of a computer";

    // You can pass in props, or key-value pairs, to components when you instantiate them. It's a one-way dataflow. IndecisionApp passes data to the Header and Options component in the form of props. Options component passes data to the Option component. Props can only be passed downstream.
    return (
      <div>
        <Header />
        <Action hasOptions={this.state.options.length} handlePick={this.handlePick}/>
        <Options options={this.state.options} handleDeleteAllOptions={this.handleDeleteAllOptions} handleDeleteOption={this.handleDeleteOption}/>
        <AddOption handleAddOption={this.handleAddOption} />
      </div>
    );
  }
}

const Header = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.subtitle && <h2>{props.subtitle}</h2>}
    </div>
  );
}

Header.defaultProps = {
  title: 'Indecision',
  subtitle: 'Put your life in the hands of a machine'
};

IndecisionApp.defaultProps = {
  options: []
};

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick} disabled={props.hasOptions}>
        What should I do?
      </button>
    </div>
  );
}

const Options = (props) => {
  return (
    <div>
      {props.options.map(option => (
        <Option
          key={option}
          optionText={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      ))}
      {props.options.length === 0 && <p>Please add an option</p>}
      <button onClick={props.handleDeleteAllOptions}>Remove All</button>
    </div>
  );
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button onClick={() => props.handleDeleteOption(props.optionText)}>
        Remove
      </button>
    </div>
  );
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    }
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
      e.target.elements.option.value = '';
    }
  }

  // If this.state.error is not undefined, render a paragraph containing the error message
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp options={['a', 'b', 'c']}/>, document.getElementById("app"));