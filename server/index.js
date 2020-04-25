const express = require("express");
const server = express();
const next = require("next");
let _ = require("lodash");
var SwaggerExpress = require("swagger-express-mw");

// ENV Config
const devConfig = require("./config/dev_config.json");
const prodConfig = require("./config/prod_config.json");

const dev = process.env.NODE_ENV !== "production"
const serverConfig = dev ? devConfig : prodConfig;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = next({ dev, conf: serverConfig });
const handle = app.getRequestHandler();

var config = server.config = {
  appRoot: __dirname, // required config
};

app
  .prepare()
  .then(() => {
    SwaggerExpress.create(config, function (err, swaggerExpress) {
      if (err) {
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
