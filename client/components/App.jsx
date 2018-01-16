import React from 'react';
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';

import Header from './Header';

class App extends React.Component {
  componentDidMount() {
    this.startFeathers();
  }
  startFeathers() {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      forceNew: true,
    });
    const client = feathers();
    client.configure(socketio(socket));
    const userService = client.service('user');

    window.userService = userService;

    userService.on('created', (res) => console.log(res));

    userService.create({
      email: 'admin@admin.com',
    }).then(res => console.log(res));
  }
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

export default App;
