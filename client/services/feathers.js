import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

class Feathers {
  constructor() {
    this.init();

    const usersService = this.client.service('users');

    usersService.on('created', res => console.log(res));
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
      console.log(accessToken);
      const payload = await this.client.passport.verifyJWT(accessToken);
      console.log(payload);
      const user = await this.client.service('users').get(payload.userId);
      this.client.set('user', user);
      return {
        success: true,
        user,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        error: 'Wrong email or password.',
      };
    }
  }

  async countEmails(email) {
    try {
      const emails = await this.client.service('users').find({
        query: {
          email,
          $limit: 0,
        },
      });
      return emails.total;
    } catch (error) {
      console.log(error);
    }
  }

  async signup(email, password) {
    try {
      await this.client.service('users').create({
        email,
        password,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }

  async logout() {
    try{

    } catch (error) {

    }
  }
}

export default (() => {
  return new Feathers();
})();
