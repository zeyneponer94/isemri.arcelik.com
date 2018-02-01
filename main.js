var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

var logFmt = require("logfmt");

app.get('/', function(req, res) {
    res.sendfile(__dirname + '/views/login_page.html');      
});

app.get('/workorder' , function(req,res) {
    //res.sendfile('views/create_workorder.html', {root: __dirname });   

    var options = { method: 'POST',
    url: 'http://yetkiliservis-test/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
    headers: 
     { 'Content-Type': 'application/json',
       servicetype: 'INTHEBOX1',
       'Cache-Control': 'no-cache',
       SessionToken: '40F181E3-7BD9-4BA1-BAF2-36E2BDC2F29D' },
    body: 
     [ { PK: '3',
         MainSourceApplicationProcces: 'Serdar',
         SourceApplication: '2',
         MainSourceOrderProccesId: '3',
         SourceOrderId: '4',
         MainSourceProccesStatus: '5',
         SourceStatus: '6',
         DealerCode: '7',
         AsistDealerCode: '8',
         AsistBranchDealerCode: '9',
         Note: '10',
         Name: '11',
         Surname: '12',
         Phone1: '13',
         Phone2: '14',
         Phone3: '15',
         Email: '16',
         TaxOffice: '17',
         TaxId: '18',
         Tckn: '19',
         Address: '20',
         Neighborhood: '21',
         District: '22',
         City: '23',
         Urgent: '24',
         ContactPerson: '25',
         ContactPhone: '26',
         PreferredServiceShop: '27',
         DeliveryDate: '28',
         ExternalOrderId: '29',
         InvoiceAcceptPhone: '30',
         InvoiceAcceptName: '31',
         InvoiceAcceptSurname: '32',
         ProductOrderOperationDetailRequest: 
          [ { ConsignmentId: '1',
              MainSourceOrderProcessId: '1',
              SourceOrderId: '2',
              PK: '3',
              R_Counter: '4',
              SS_R_Counter: '5',
              MainSourceOrderProcessStatus: '6',
              WareHouseCode: '7',
              WareHouseType: '8',
              WareHouseAddress: '9',
              WareHouseNeighborhood: '10',
              WareHouseDistrict: '11',
              WareHouseCity: '12',
              ProductCode: '13',
              Product: '14',
              OperationType: '15',
              ProductReturnCheck: '16',
              ExtraWarrantyType: '17',
              ProductExposeCheck: '18',
              SourceOrderStatus: '19',
              ProductBarcode: '20',
              DetailNote: '21',
              ParoId: '22',
              InvoiceNr: '23',
              InvoiceDate: '24',
              MaliId: '25',
              NaceId: '26',
              SectorId: '27',
              CrmKey: '28' } ] } ],
    json: true };

    request(options, function (error, response, body) {
    //if (error) throw new Error(error);
    res.send(error);
    console.log(body);
  });

});

app.set('port', process.env.PORT || 1337);
app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

