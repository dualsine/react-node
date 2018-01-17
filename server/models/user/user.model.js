const NeDB = require('nedb');
const path = require('path');

module.exports = function(app) {
  const Model = new NeDB({
    filename: path.join(__dirname, 'user.db'),
    autoload: true,
  });

  return Model;
}
