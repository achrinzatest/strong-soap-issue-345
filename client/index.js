// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: strong-soap
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

"use strict";

var soap = require('strong-soap').soap;
// wsdl of the web service this client is going to invoke. For local wsdl you can use, url = './wsdls/stockquote.wsdl'
var url = 'http://localhost:8080/stockquote?wsdl';

var requestArgs = {
  symbol: 'GIB'
};

var options = {};
soap.createClient(url, options, function(err, client) {
  var method = client['StockQuote']['StockQuoteSoap12']['GetQuote'];
  method(requestArgs, function(err, result, envelope, soapHeader) {
    console.log("Error:\n" + JSON.stringify(err))
    console.log("Header:\n" + JSON.stringify(soapHeader))
    //response envelope
    console.log('Response Envelope: \n' + envelope);
    //'result' is the response body
    console.log('Result: \n' + JSON.stringify(result));
  });
});
