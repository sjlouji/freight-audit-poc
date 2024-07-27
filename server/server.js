const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const pino = require('pino');

const routes = require('./routes');
const httpContext = require('./middleware/http-context');
const requestLogger = require('./middleware/request-logger');
const setRequestId = require('./middleware/request-id');

class FreightAuditServer {
  constructor() {
    this.app = null;
  }

  init() {
    this.loadExpress();
    this.loadExpressMiddlewares();
    this.loadRoutes();
    this.listenToPort();
  }

  loadExpress() {
    this.app = express();
  }

  loadExpressMiddlewares() {
    this.app.use(setRequestId);
    this.app.use(express.json({ limit: '20mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json({ limit: '10mb' }));
    this.app.use(httpContext.middleware);
    this.loadLoggers();
    this.app.use(requestLogger(logger));
  }

  loadRoutes() {
    this.app.use('/api', routes);
  }

  loadLoggers() {
    global.logger = pino({
      timestamp: pino.stdTimeFunctions.isoTime,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true
        }
      },
      base: {
        request_id: () => httpContext.get('requestId')
      },
    });
  }

  listenToPort() {
    const port = config.get('server.port');
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }
}
module.exports = new FreightAuditServer().init();