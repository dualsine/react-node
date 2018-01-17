const NeDB = require('nedb');
const path = require('path');

module.exports = function(app) {
  const Model = new NeDB({
    filename: path.join(__dirname, 'user.db'),
    autoload: true,
  });

  Model.ensureIndex({ fieldName: 'email', unique: true }, function (err) {
    if (err) console.log(err);
  });

  return Model;
}
