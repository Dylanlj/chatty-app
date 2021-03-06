
import React, {Component} from 'react';

class ChatBar extends Component {


  render() {
    console.log('rendering ChatBar')
    let user = (this.props.currentUser === 'Anonymous') ? '' : this.props.currentUser
    return (
      <footer className='chatbar' >
        <input className='chatbar-username' onKeyUp={this.props.userChange} placeholder='Your Name (Optional)'  defaultValue={user}/>
        <input className='chatbar-message' placeholder='Type a message and hit ENTER' onKeyUp={this.props.addMessage}/>
      </footer>
    );
  }
}
export default ChatBar;

