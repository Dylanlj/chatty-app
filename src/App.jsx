import React, {Component} from 'react';
import ChatBar      from './ChatBar.jsx';

import MessageList  from './MessageList.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 75928
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. you lost your marbles Bob. You lost them for good.",
          id: 93758
        }
      ]

    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 4345, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }

  newMessage = (evt) => {
    if(evt.key === 'Enter') {
      let newEntry = {id: 45236, content: evt.target.value, username: this.state.currentUser.name}
      this.setState(this.state.messages = this.state.messages.concat(newEntry))
      evt.target.value = ''
    }
  }

  render() {

    console.log("rendering App")
    return ( <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
          <MessageList messages={this.state.messages}/>

        <ChatBar newMessage={this.newMessage} currentUser={this.state.currentUser.name}/>
    </div>);
  }

}
export default App;


