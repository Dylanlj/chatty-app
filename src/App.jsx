import React, {Component} from 'react';
import ChatBar      from './ChatBar.jsx';
import MessageList  from './MessageList.jsx'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: {
        name: '',
        color:''
      },
      messages: [{
        content: '',
        style:{},
        type: '',
        username:''
      }],
      numberOfUsers: 1,
    }
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.socket = new WebSocket('ws://localhost:3001')
    this.socket.onopen = (event) => {
      console.log('Connected to server');
      const assignColor = () => {
        const colors = ['#1AADD9', '#1AD987', '#D9771A', '#6530AB']
        return colors[Math.floor(Math.random() * colors.length)]
      }
      this.setState({
        currentUser: {
          name: 'Anonymous',
          color: assignColor()
        }

      })
    };

//receives messages from the websocket server
    this.socket.onmessage = (evt) => {
      const parsedEvent = JSON.parse(evt.data)
      switch(parsedEvent.type) {
        //for messages sent by users
        case 'incomingMessage':
         const newMessage = [{
          content: parsedEvent.content,
          id: parsedEvent.id,
          username: parsedEvent.username,
          type: parsedEvent.type,
          style: {color: parsedEvent.style}
        }]
        const mess = newMessage.concat(this.state.messages)
        this.setState({messages: mess})
          break;
        case 'incomingNotification':
        //notification for when a new user joins the chat, leaves or changes their name
          if(parsedEvent.numberOfUsers) {
            //updates the number of users online
            this.setState({
              numberOfUsers: parsedEvent.numberOfUsers,
            })
          }
          //notification for when a user changes their name
          const newNotification = [{
            content: parsedEvent.content,
            type: parsedEvent.type,
            id: parsedEvent.id
          }]

          const notify = newNotification.concat(this.state.messages)
          this.setState({messages:notify})
            break
          default:
            throw new Error('Unknown event type ' + parsedEvent.type)
      }
    }
  }

//when someone sends a message, sends the info to the websocket server
  addMessage = (evt) => {
    if(evt.key === 'Enter') {
      let newEntry = {
        type: 'postMessage',
        content: evt.target.value,
        username: this.state.currentUser.name,
        style: this.state.currentUser.color
      }
      this.socket.send(JSON.stringify(newEntry))
      evt.target.value = ''
    }
  }

//when someone changes their username messages the websocket server
  userChange = (evt) => {
    if(evt.key === 'Enter') {
      const newUser = evt.target.value
      if(newUser !== this.state.currentUser.name) {
        const postNameChange = {
          type: 'postNotification',
          content: `${this.state.currentUser.name} has changed their name to `,
          newName: newUser
        }
        this.setState({
          currentUser: {
            name: newUser,
            color: this.state.currentUser.color
          }
        })
        this.socket.send(JSON.stringify(postNameChange))
       }
    }
  }

  render() {
    console.log('rendering App')
    return ( <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>Chatty</a>
          <a className='navbar-users'>{this.state.numberOfUsers} Users Online</a>
        </nav>
          <MessageList messages={this.state.messages}/>
        <ChatBar addMessage={this.addMessage} userChange={this.userChange} currentUser={this.state.currentUser.name}/>
    </div>);
  }
}
export default App;


