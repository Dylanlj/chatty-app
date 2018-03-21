import React, {Component} from 'react';
import ChatBar      from './ChatBar.jsx';
import MessageList  from './MessageList.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      numberOfUsers: 1
    }
  }

  componentDidMount() {
    console.log("componentDidMount <App />");

    this.socket = new WebSocket("ws://localhost:3001")
    this.socket.onopen = (event) => {
      console.log("Connected to server");
    };


    this.socket.onmessage = (evt) => {
      console.log(evt)
      const parsedEvent = JSON.parse(evt.data)

      switch(parsedEvent.type) {
        case "incomingMessage":

          const newMessage = [{
            content: parsedEvent.content,
            id: parsedEvent.id,
            username: parsedEvent.username,
            type: parsedEvent.type
          }]
          const mess = this.state.messages.concat(newMessage)
          this.setState({messages: mess})

          break;
        case "incomingNotification":
          if(parsedEvent.numberOfUsers) {
            this.setState({numberOfUsers: parsedEvent.numberOfUsers})
          }
          const newNotification = {
            content: parsedEvent.content,
            type: parsedEvent.type,
          }
          const notify = this.state.messages.concat(newNotification)
          this.setState({messages:notify})
          break
        default:
        throw new Error("Unknown event type " + parsedEvent.type)

      }
    }

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = {id: 4345, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({messages: messages})
    // }, 3000);
  }

  addMessage = (evt) => {
    if(evt.key === 'Enter') {

      let newEntry = {
        type: "postMessage",
        content: evt.target.value,
        username: this.state.currentUser.name
      }
      this.socket.send(JSON.stringify(newEntry))

      evt.target.value = ''
    }
  }

  userChange = (evt) => {
    if(evt.key === 'Enter') {
      const newUser = evt.target.value
      if(newUser !== this.state.currentUser.name) {

        const postNameChange = {
          type: "postNotification",
          content: `${this.state.currentUser.name} has changed their name to ${newUser}`
        }
        this.setState({currentUser: {name: newUser}})
        this.socket.send(JSON.stringify(postNameChange))
       }

    }
  }



  render() {

    console.log("rendering App")
    return ( <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="navbar-users">{this.state.numberOfUsers} Users Online</a>
        </nav>
          <MessageList messages={this.state.messages}/>

        <ChatBar addMessage={this.addMessage} userChange={this.userChange} currentUser={this.state.currentUser.name}/>
    </div>);
  }

}
export default App;


