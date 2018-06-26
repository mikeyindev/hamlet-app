import React from "react";
import { database, firebase, googleAuthProvider } from '../../Firebase/firebase';
import Action from "./Action";
import AddOption from "./AddOption";
import Header from "./Header";
import Login from './Login';
import Menu from './Menu';
import MusicPlayer from './MusicPlayer';
import Options from "./Options";
import OptionModal from './OptionModal';

class HamletApp extends React.Component {
  constructor(props) {
    // The props object here is the same as this.props
    super(props);
    this.state = {
      // options: ["One", "Two", "Three"]
      options: props.options,
      selectedOption: undefined,
      uid: undefined,
      isPlaying: false
    };
  }
    // Bind removeAll() to 'this' context, so when it's called in an event handler, the context won't be lost. They're not necessary when using arrow functions
    // this.handleDeleteAllOptions = this.handleDeleteAllOptions.bind(this);
    // this.handlePick = this.handlePick.bind(this);
    // this.handleAddOption = this.handleAddOption.bind(this);
    // this.handleDeleteOption = this.handleDeleteOption.bind(this);
    // this.clearSelectedOption = this.clearSelectedOption.bind(this);
  
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

    firebase.auth().onAuthStateChanged((user) => {
      // If user is logged in, retrieve data from Firebase
      if (user) {
        const uid = user.uid
        this.setState({ uid }, () => {
          console.log(this.state.uid);
          const options = [];
          database.ref(`users/${uid}/options`)
            .once('value')
            .then((snapshot) => {
              snapshot.forEach((childSnapshot) => {
                // console.log(childSnapshot.val());
                // options.push(childSnapshot.val());
                const option = {
                  id: childSnapshot.key,
                  text: childSnapshot.val()
                };
                options.push(option);
                this.setState({ options });
              });
            });
        });
      }
    });
  }

  // componentDidUpdate() {
  //   if (prevState.options.length !== this.state.options.length) {
  //     const json = JSON.stringify(this.state.options);
  //     // Store our data in localStorage, giving it the key 'options'
  //     localStorage.setItem("options", json);
  //   }
  // }

  handleDeleteAllOptions = () => {
    // this.setState(() => {
    //   return {
    //     options: []
    //   };
    // });
    this.setState({ options: [] }, () => {
      const uid = this.state.uid;
      if (uid) {
        database.ref(`users/${uid}/options`).remove();
      }
    });
  }

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum].text;
    this.setState({
      selectedOption: option
    });
  }

  handleAddOption = (optionToAdd) => {
    if (!optionToAdd) {
      return "Enter valid value to add item.";
      // indexOf returns -1 if the item is not in the array
    } else if (this.state.options.indexOf(optionToAdd) > -1) {
      return "The item has already been added.";
    }
    // User must now log in first before adding tasks.
    // this.setState((prevState) => {
    //   return {
    //     options: prevState.options.concat([{ text: optionToAdd }])
    //   };
    // });

    const uid = this.state.uid;
    if (uid) {
      database
        .ref(`users/${uid}/options`)
        .push(optionToAdd)
        .then((snapshot) => {
          const option = {
            id: snapshot.key,
            text: optionToAdd
          };
          this.setState((prevState) => ({
            // Using concat() returns a new array without changing either of the
            // array we're concatenating
            options: prevState.options.concat([option])
          }));
        });
    }
  }

  handleDeleteOption = (id) => {
    console.log(id);
    // filter(), return true to keep the element, false to remove it. It returns a new array with only the elements that passed the test
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return id !== option.id;
      })
    }), () => {
      const uid = this.state.uid;
      if (uid) {
        database.ref(`users/${uid}/options/${id}`).remove();
      }
    });
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

  handleLogin = () => {
    firebase.auth().signInWithPopup(googleAuthProvider);

    console.log('Logged in');
  }

  handleLogout = () => {
    firebase.auth().signOut();
    this.setState({ uid: undefined });
    console.log('Logged out');
  }

  render() {
    const subtitle = "Put your life in the hands of a computer";
    // console.log(this.state);

    // You can pass in props, or key-value pairs, to components when you instantiate them. It's a one-way dataflow. HamletApp passes data to the Header and Options component in the form of props. Options component passes data to the Option component. Props can only be passed downstream.
    return <div>
        <Header />
        <Menu>
          <Login handleLogin={this.handleLogin} 
            handleLogout={this.handleLogout}
            isLoggedIn={!!this.state.uid}
          />
          <MusicPlayer handlePlayMusic={this.handlePlayMusic} isPlaying={this.state.isPlaying} />
        </Menu>
        <div className="container">
          <Action hasOptions={this.state.options.length} handlePick={this.handlePick} />
          <div className="Widget">
            <Options 
              options={this.state.options} 
              uid={this.state.uid}
              handleDeleteAllOptions={this.handleDeleteAllOptions} 
              handleDeleteOption={this.handleDeleteOption} 
              handleLogin={this.handleLogin}
            />
            {this.state.uid && <AddOption handleAddOption={this.handleAddOption} />}
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