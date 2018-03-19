// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

// Render the top-level React component
import React        from 'react';
import ReactDOM     from 'react-dom';
import App          from './App.jsx';


ReactDOM.render(
    <App />
,
  document.getElementById('react-root'));

// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <title>Chatty</title>

// </head>
// <body>
// <nav class="navbar">
//   <a href="/" class="navbar-brand">Chatty</a>
// </nav>
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
// <footer class="chatbar">
//   <input class="chatbar-username" placeholder="Your Name (Optional)" />
//   <input class="chatbar-message" placeholder="Type a message and hit ENTER" />
// </footer>
// </body>
// </html>
