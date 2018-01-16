const user = require('./user/user');

module.exports = function(app) {
  app.configure(user);
}
