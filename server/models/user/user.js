const createService = require('feathers-nedb');
const createModel = require('./user.model');
const hooks = require('./user.hooks');

module.exports = function(app){
  const Model = createModel(app);
  const serv = createService({
    name: 'user',
    Model,
    paginate: {
      default: 10,
      max: 25,
    },
  });

  app.use('/user', serv);

  const service = app.service('user');

  service.hooks(hooks);
}
