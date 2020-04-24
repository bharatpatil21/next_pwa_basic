const express = require("express");
const server = express();
const next = require("next");
let _ = require("lodash");
var SwaggerExpress = require("swagger-express-mw");

var cookieParser = require('cookie-parser')
var session = require('express-session');
var csrf = require('csurf')

var csrfProtection = csrf({ cookie: true })
server.use(cookieParser())
server.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
server.use(csrf());
server.use(function (req, res, next) {
  let token = req.csrfToken()
  console.log('token----',token)
  res.cookie('XSRF-TOKEN', token);
  res.locals.csrftoken = req.csrfToken();
  next();
});

// ENV Config
const devConfig = require("./config/dev_config.json");
const prodConfig = require("./config/prod_config.json");

const dev = process.env.NODE_ENV !== "production"
const serverConfig = dev ? devConfig : prodConfig;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

server.use(require('helmet')());
server.use(require('express-boom')());

const app = next({ dev, conf: serverConfig });
const handle = app.getRequestHandler();

var config = server.config = {
  appRoot: __dirname, // required config
};

app
  .prepare()
  .then(() => {
    server.config['swaggerSecurityHandlers'] =  require('./middlewares/token-handler');

    SwaggerExpress.create(config, function (err, swaggerExpress) {
      if (err) {
        console.log('swagger--error---',err)
        throw err;
      }
      _.assignIn(server.config, swaggerExpress.runner.config);
      server.config.debug = app.nextConfig.serverConfig.debug;
      server.config.logger = {
        dir: app.nextConfig.serverConfig.logDir,
        level: app.nextConfig.serverConfig.logLevel
      };
      // Create log
      require("./middlewares/logger").init(server);

      // Database connection
      require("./middlewares/dbconnect");

      // Install middleware
      swaggerExpress.register(server);
      
      // Error Handler
      require("./middlewares/error-handler").init(server);

      server.get("*", (req, res) => {
        return handle(req, res);
      });

      const port = process.env.PORT || 3000;
      server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on ${port}`);
      });
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });