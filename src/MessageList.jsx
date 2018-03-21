
import React, {Component} from 'react';
import Message      from './Message.jsx';

class MessageList extends Component {
  render() {


    const message = this.props.messages.map((message) => {
    //  console.log("dsdsd" + message.id)


      let messageContents = message.content

      var myRe = /http.+?(png|jpg|gif)/ig;

      const myImages =[];
      var myArray;
      while ((myArray = myRe.exec(message.content)) !== null) {
        messageContents = messageContents.replace(myArray[0], "")
        myImages.push(myArray[0])
      }

      const contentImage = myImages.map((imageUrl) => {
        return <img className="image" src={imageUrl} />
      })

      switch(message.type) {
        case "incomingMessage":
          return(
            <div style={message.style} className="message" key={message.id}>
              <span className="message-username">{message.username}</span>
              <span className="message-content">{messageContents}

                <div>{contentImage}</div>
              </span>


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

