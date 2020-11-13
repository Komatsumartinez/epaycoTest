const soap = require('soap');

const http = require('http');

const myService = {
      Billetera: {
        BilleteraSoap: {
          GetBilletera: function(args, callback) {
                  
                  callback({
                      name1: args.cliente,
                      name5: args.saldo
                  });
              },
          RecargaBilletera: function(args, callback) {
                  
                  callback({
                      name2: args.monto
                  });
              }
        },
        BilleteraSoap12: {
          Pagar: function(args, callback) {
                  
                  callback({
                      name3: args.monto_pago,
                      name6: args.celular,
                      name7: args.documento
                  });
              },
          ConfirmarPago: function(args, callback) {
                  
                  callback({
                      name4: args.token
                  });
              }
        }
      }
    };



const xml = require('fs').readFileSync('Billetera.wsdl','utf8');
const server = http.createServer(function(request,response) {
  response.end("404: Not Found: " + request.url);
});

server.listen(8000);

soap.listen(server,'/wsdl',myService, xml);