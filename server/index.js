const { readFileSync } = require('fs');
const debug = require('debug')('app:http');
const http = require('http');
const { soap } = require('strong-soap');
const { StockQuoteService } = require('./service');

// Set port from env or by default 8080
const port = +process.env.PORT || 8080;
const wsdl = readFileSync('stock-quote.wsdl', 'utf8');

const server = http.createServer(function(request,response) {
  response.statusCode = 404;
  response.end(`Not Found ${request.url}`);
});
server.listen(port, () => {
  debug(`Running on ${port}`);
});
server.on('request', () => {
    debug('Request');
})
soap.listen(server, '/stockquote', StockQuoteService, wsdl);

process.on('SIGTERM', () => {
  debug('SIGTERM signal received, closing the HTTP server');
  server.close(() => {
    debug('HTTP server closed');
  });
});
