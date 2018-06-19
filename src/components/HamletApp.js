import React from "react";
import AddOption from "./AddOption";
import Option from "./Option";
import Action from "./Action";
import Options from "./Options";
import Header from "./Header";
import OptionModal from './OptionModal';
import MusicPlayer from './MusicPlayer';
import database from '../../Firebase/firebase';

class HamletApp extends React.Component {
  constructor(props) {
    // The props object here is the same as this.props
    super(props);
    this.state = {
      // options: ["One", "Two", "Three"]
      options: props.options,
      selectedOption: undefined,
      isPlaying: false
    };
    // Bind removeAll() to 'this' context, so when it's called in an event handler, the context won't be lost. They're not necessary when using arrow functions
    // this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
    // this.handlePick = this.handlePick.bind(this);
    // this.handleAddOption = this.handleAddOption.bind(this);
    // this.handleDeleteOption = this.handleDeleteOption.bind(this);
    // this.clearSelectedOption = this.clearSelectedOption.bind(this);
  }

  componentDidMount() {
    // In case the JSON object passed to JSON.parse() is invalid JSON
    // try {
    //   const json = localStorage.getItem("options");
    //   const options = JSON.parse(json);
    //   if (options) {
    //     // this.setState(() => {
    //     //   return { options: options }
    //     // });
    //     this.setState(() => ({ options }));
    //   }
    // } catch (e) {
    //   // Do nothing if it's invalid JSON
    // }
    const options = [];
    database.ref('options')
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          console.log(childSnapshot.val());
          options.push(childSnapshot.val());
          this.setState({ options });
        });
      });
      // .then(() => {
      //   this.setState({ options });
      // });
  }

  componentDidUpdate(prevState) {
    // if (prevState.options.length !== this.state.options.length) {
    //   const json = JSON.stringify(this.state.options);
    //   // Store our data in localStorage, giving it the key 'options'
    //   localStorage.setItem("options", json);
    // }
    database.ref('options').set(this.state.options);
  }

  handleDeleteAllOptions = () => {
    // this.setState(() => {
    //   return {
    //     options: []
    //   };
    // });
    this.setState({ options: [] });
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState({
      selectedOption: option
    });
  }

  handleAddOption = (option) => {
    if (!option) {
      return "Enter valid value to add item.";
      // indexOf returns -1 if the item is not in the array
    } else if (this.state.options.indexOf(option) > -1) {
      return "The item has already been added.";
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

  handleDeleteOption = (optionToRemove) => {
    console.log(optionToRemove);
    // filter(), return true to keep the element, false to remove it. It returns a new array with only the elements that passed the test
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return optionToRemove !== option;
      })
    }));
  }

  clearSelectedOption = () => {
    this.setState({
      selectedOption: undefined
    });
  }

  handlePlayMusic = () => {
    const music = document.getElementById('music');

    // Passing in a callback because this.setState() does not immediately mutate
    // the state
    this.setState((prevState) => ({
      isPlaying: !prevState.isPlaying
    }), () => {
      console.log(this.state.isPlaying);
      if (this.state.isPlaying) { 
        music.play(); 
        music.loop = true;
      } else {
        music.pause();
      }
    });
  };

  render() {
    const subtitle = "Put your life in the hands of a computer";

    // You can pass in props, or key-value pairs, to components when you instantiate them. It's a one-way dataflow. HamletApp passes data to the Header and Options component in the form of props. Options component passes data to the Option component. Props can only be passed downstream.
    return <div>
        <Header />
        <MusicPlayer handlePlayMusic={this.handlePlayMusic} isPlaying={this.state.isPlaying} />
        <div className="container">
          <Action hasOptions={this.state.options.length} handlePick={this.handlePick} />
          <div className="widget">
            <Options options={this.state.options} handleDeleteAllOptions={this.handleDeleteAllOptions} handleDeleteOption={this.handleDeleteOption} />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal selectedOption={this.state.selectedOption} clearSelectedOption={this.clearSelectedOption} />
      </div>;
  }
}

HamletApp.defaultProps = {
  options: []
};

export default HamletApp;