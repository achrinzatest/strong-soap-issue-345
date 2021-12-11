const debug = require('debug')('app:soap');

const stockValues = new Map();
stockValues.set('GIB', 100.0);

function createFault({ reason }) {
  return {
    Fault: {
      Code: {
        Value: 'soap:Sender',
        Subcode: {
          Value: 'rpc:BadArguments',
        },
      },
      Reason: {
        Text: reason,
      },
      Detail: {
        myMethodFault2: {
          errorMessage2: 'MyMethod Business Exception message',
          value2: 10,
        },
      },
    },
  };
}

const service = {
  StockQuote: {
    StockQuoteSoap12: {
      // eslint-disable-next-line no-unused-vars
      GetQuote: (args, _cb, _headers, _req) => {
        const { symbol } = args;
        debug(`GetQuote symbol=${symbol}`);
        if (!stockValues.has(symbol)) {
          throw createFault({ reason: `Symbol ${symbol} not found`});
        }
        return {
          symbol: stockValues.get(args.symbol),
        };
      },
    },
  },
};

exports.StockQuoteService = service;
