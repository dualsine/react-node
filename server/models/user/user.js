const createService = require('feathers-nedb');
const createModel = require('./user.model');
const hooks = require('./user.hooks');

module.exports = function(app){
  const Model = createModel(app);
  const serv = createService({
    name: 'users',
    Model,
    paginate: {
      default: 10,
      max: 25,
    },
  });

  app.use('/users', serv);

  const service = app.service('users');

  service.hooks(hooks);
}
