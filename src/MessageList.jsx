
import React, {Component} from 'react';
import Message      from './Message.jsx';

class MessageList extends Component {
  render() {


    const message = this.props.messages.map((message) => {
    //  console.log("dsdsd" + message.id)
      return(
        <div className="message" key={message.id}>
          <span className="message-username">{message.username}</span>
          <span className="message-content">{message.content}</span>
        </div>);
    })

    console.log("rendering MessageList")

    return (
      <main className="messages">
          {message}
          <Message />
      </main>

    );
  }
}
export default MessageList;



// <main class="messages">
//   <div class="message">
//     <span class="message-username">Anonymous1</span>
//     <span class="message-content">I won't be impressed with technology until I can download food.</span>
//   </div>
//   <div class="message system">
//     Anonymous1 changed their name to nomnom.
//   </div>
//   <div id="react-root"></div>
//   <script src="/build/bundle.js"></script>
// </main>



// state.messages = [
//         {
//             type: "incomingMessage",
//             content: "I won't be impressed with technology until I can download food.",
//             username: "Anonymous1"
//         },
//         {
//             type: "incomingNotification",
//             content: "Anonymous1 changed their name to nomnom",
//         },
//         {
//             type: "incomingMessage",
//             content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
//             username: "Anonymous2"
//         },
//         {
//             type: "incomingMessage",
//             content: "...",
//             username: "nomnom"
//         },
//         {
//             type: "incomingMessage",
//             content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
//             username: "Anonymous2"
//         },
//         {
//             type: "incomingMessage",
//             content: "This isn't funny. You're not funny",
//             username: "nomnom"
//         },
//         {
//             type: "incomingNotification",
//             content: "Anonymous2 changed their name to NotFunny",

//         },

//     ]
