
import React, {Component} from 'react';
import Message      from './Message.jsx';

class MessageList extends Component {
  render() {


    const message = this.props.messages.map((message) => {
    //  console.log("dsdsd" + message.id)

      let contentImage = ""
      let contents = message.content
      const end = (message.content.search(/gif|jpg|png/)) + 3
      const beginning = (message.content.search("http"))
      if(end && beginning !== -1 ) {
        contentImage = contents.slice(beginning, end)
        contents = contents.replace(contents.substring(beginning, end), "");
      }

      switch(message.type) {
        case "incomingMessage":
          return(
            <div>
            <div style={message.style} className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{contents}
                <div>  <img className="image" src={contentImage} /> </div>
              </span>

            </div>

            </div>
          );
          break;
        case "incomingNotification":
          return (
            <div className="message system">
              {message.content}
            </div>
          )
          break;
        default:

      }

    })

    console.log("rendering MessageList")

    return (
      <main className="messages">
          {message}

      </main>

    );
  }
}
export default MessageList;

