const config = require('config');

module.exports = () => {
  return {
    freight_audit_service: config.get('freight_audit_service'),
  };
};