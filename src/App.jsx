import React, {Component} from 'react';
import ChatBar      from './ChatBar.jsx';
import Message      from './Message.jsx';
import MessageList  from './MessageList.jsx'


class App extends Component {
  constructor(props) {
      super(props)
      this.state = {
        currentUser: {name: "Bob"},
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?"
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. you lost your marbles Bob. You lost them for good."
          }
        ]

      }
    }


  render() {

    console.log("rendering App")
    return ( <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <main>
          <Message />
          <MessageList messages={this.state.messages}/>
        </main>

        <ChatBar currentUser={this.state.currentUser.name}/>
    </div>);
  }
}
export default App;


