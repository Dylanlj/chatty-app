
import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    console.log("rendering ChatBar")
    let user = (this.props.currentUser) ? this.props.currentUser : "Anonymous"
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={user}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>

    );
  }
}
export default ChatBar;
