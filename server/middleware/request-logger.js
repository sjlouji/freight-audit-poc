const ms = require('ms');
const useragent = require('useragent');

const httpContext = require('./http-context');
const appName = 'freight-audit-poc';

function requestLogger(logger) {
  return (req, res, next) => {
    const startTime = new Date();
    const requestEnd = res.end;
    const requestBody = JSON.stringify(req.body);
    const requestedUrl = req.originalUrl || req.url;
    const requestId = httpContext.get('requestId') || req.requestId;

    const requestIp = req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress;
    const userAgent = useragent.parse(req.headers['user-agent']).toString();
    logger.info(`[${appName}] Started : ${req.method} ${requestedUrl}  Body : ${requestBody}`);
    logger.info(`[${appName}] IP : ${requestIp} User-Agent : ${userAgent}`);
    logger.info(`[${appName}] requestId : ${requestId}`);
    const patchedEnd = (chunk, encoding) => {
      const responseTime = ms(new Date() - startTime);
      res.end = requestEnd;
      res.end(chunk, encoding);
      logger.info(`[${appName}] Ended : ${req.method} ${requestedUrl} ${res.statusCode} ${responseTime}`);
    };

    res.end = patchedEnd;
    next();
  };
}

module.exports = requestLogger;