// Create a simple logging middleware
function requestLogger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp} | ${req.method} | ${req.url}`);
  next(); // Don't forget to call next()
}

module.exports = requestLogger;
