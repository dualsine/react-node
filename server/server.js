const path = require('path');
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const helmet = require('helmet');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

const app = express(feathers());

app.use(express.static(__dirname + '../dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.configure(express.rest());
app.configure(socketio());
app.use(express.errorHandler());
app.use(helmet());

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

app.listen(port, '0.0.0.0', function(err) {
  if (err) console.log(err);
  console.info('Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
