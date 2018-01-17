const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const auth = require('@feathersjs/authentication');
const local = require('@feathersjs/authentication-local');
const jwt = require('@feathersjs/authentication-jwt');
const helmet = require('helmet');

const config = require('../config');

const app = express(feathers());

app.use(express.static(__dirname + '../dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.configure(socketio());
app.configure(auth(config.auth));
app.configure(local());
app.configure(jwt());
app.use(helmet());
app.use(express.errorHandler());

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config.js');
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

/*** FEATHERSJS ****/
const models = require('./models');
const appHooks = require('./app.hooks');
const channels = require('./channels');
app.configure(models);
app.configure(channels);
app.hooks(appHooks);

app.service('users').hooks({
  after: local.hooks.protect('password'),
});

app.service('authentication').hooks({
  before: {
    create: [
      auth.hooks.authenticate(['jwt']),
    ],
    remove: [
      auth.hooks.authenticate('jwt'),
    ],
  },
});

app.listen(config.port, config.host, function(err) {
  if (err) console.log(err);
  console.info('Listening on port %s. Open up http://%s:%s/ in your browser.', config.port, config.host, config.port);
});
