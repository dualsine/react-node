const { authenticate } = require('@feathersjs/authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const local = require('@feathersjs/authentication-local');
const logger = require('../../hooks/logger');

module.exports = {
  before: {
    all: [],
    find: [
      commonHooks.iff( // If a token was included, authenticate it with the `jwt` strategy.
        context => context.params.token,
        authenticate('jwt')
      // No token was found, so limit the query to include `public: true`
      ).else(context => {
        context.params.query = { email: context.params.query.email, $limit: 0 };
        return context;
      })
    ],
    get: [],
    create: [logger(), local.hooks.hashPassword({ passwordField: 'password' })],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [logger()],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
