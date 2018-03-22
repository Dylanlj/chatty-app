
import React, {Component} from 'react';

class MessageList extends Component {
  render() {
    //rendering the entire message list
    const message = this.props.messages.map((message) => {

      let messageContents = message.content
      var regEx = /http.+?(png|jpg|gif)/ig;
      const foundImages =[];
      var myArray;
      //finds imageUrls, removes them from the message contents and adds them to an array
      while ((myArray = regEx.exec(message.content)) !== null) {
        messageContents = messageContents.replace(myArray[0], "")
        foundImages.push(myArray[0])
      }
      //adds the images to the message
      const contentImage = foundImages.map((imageUrl) => {
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
            <div key={message.id} className="message system">
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

