const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const _ = require('lodash');

const errors = [];

const dotenv = require('dotenv');
// const { compareSync } = require('bcrypt');
dotenv.config()

function checkErrors() {

  function stringifyError(e) {

    if (e instanceof Error) return e.message;
    if (typeof e == 'string') return e;
    if (typeof e.toString == 'function') {
      const res = e.toString();
      if (typeof res == 'string') return res;
    }
    return new String(res);
  }

  if (errors.length) {

    let message = 'Start aborted due to ';

    if (errors.length == 1)
      message += 'error:';
    else {
      message += `${errors.length} errors:`;
    }
    
    const stringifiedErrors = _(errors).map(stringifyError)
      .map(e => e.replace("\n", "\n    "))
      .join( "\n\n    ");

    message += `\n\n    ${stringifiedErrors}\n`;

    throw new Error(message);
  }
}

const noop = _app => {};

class NoEnvVarError extends TypeError {
  constructor(varName) {
    const message = `${varName} enviroment variable is not supplied.\n` +
      `NOTE: Set ${varName} in .env file.`;
    super(message);
  }
}

/**
 * Starts web server for execution
 * @param {(app: express.Express) => void} registerMiddleware? Registers all required middlewares
 */
function start(registerMiddleware = noop) {
  
  const { PORT, API_ROOT } = process.env;

  if (typeof PORT == 'undefined')
    errors.push(new NoEnvVarError('PORT'));

  if (typeof API_ROOT == 'undefined')
    errors.push(new NoEnvVarError('API_ROOT'));

  checkErrors();

  const app = express();

  const apiProxy = createProxyMiddleware({
    target: `${API_ROOT}:${+PORT + 1}`,
    ws: true,
    changeOrigin: true
  });
  
  app.use("/api", apiProxy);

  app.use(history());

  registerMiddleware(app);

  return app.listen(PORT, () => console.log(`frontend listening port ${PORT}`));
}

module.exports = { start };