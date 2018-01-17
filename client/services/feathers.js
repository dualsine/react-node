import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

class Feathers {
  constructor() {
    this.init();

    const usersService = this.client.service('users');

    window.usersService = usersService;

    this.loginFromStorage();

    usersService.on('created', res => console.log(res));

    usersService.create({
      email: 'admin@admin.com',
      password: 'admin123',
    }).then(res => console.log(res));
  }

  init() {
    const socket = io('http://localhost:3000', {
      transports: ['websocket'],
      forceNew: true,
    });
    this.client = feathers();
    this.client.configure(auth({
      storage: localStorage,
      entity: 'user',
      service: 'users',
    }));
    this.client.configure(socketio(socket));
  }

  async loginFromStorage() {
    try {
      const { accessToken } = await this.client.authenticate();
      const payload = await this.client.passport.verifyJWT(accessToken);
      const user = await this.client.service('users').get(payload.userId);
      this.client.set('user', user);
      return user;
    } catch (err) {
      return null;
    }
  }

  async loginWithPassword(email, password) {
    try {
      const { accessToken } = await this.client.authenticate({
        strategy: 'local',
        email,
        password,
      });
      const payload = await this.client.passport.verifyJWT(accessToken);
      const user = await this.client.service('users').get(payload.userId);
      this.client.set('user', user);
      return user;
    } catch (err) {
      return null;
    }
  }
}

export default (() => {
  return new Feathers();
})();
