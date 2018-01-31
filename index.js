var express = require('express'),
    http = require('http'),
    request = require('request'),
    bodyParser = require('body-parser'),
    errorHandler = require('express-error-handler'),
    app = express();

var logFmt = require("logfmt");

//app.set('views', __dirname + '/views') ;



app.get('/', function(req, res) {
    //res.sendfile(__dirname + '/views/index.html'); 

var options = { method: 'POST',
url: 'https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
headers: 
 {  SessionToken: '12345678-1234-1234-1234-123456789101'
 },
body: 
 { ProductOrderOperationRequest: 
    { MainSourceApplicationProcces: 'ECOM Uygulama İsimi',
      SourceApplication: 'DMS Uygulama İsmi',
      MainSourceOrderProccesId: 'Ecom1 Id Olacak',
      SourceOrderId: 'DMS1 Id Olacak',
      MainSourceProccesStatus: 'Ecom Approve',
      SourceStatus: 'DMS Approve',
      AsistDealerCode: '21534701',
      DealerCode: '21534701',
      AsistBranchDealerCode: '0',
      Tckn: '18623292306',
      TaxOffice: 'İSTANBUL-KARTAL',
      TaxId: '1234567890',
      Email: 'ozkan.lostar@lostarltd.com.tr',
      Note: 'Ana order kaydına girilen note',
      Name: 'ÖZKAN',
      Surname: 'LOSTAR',
      Phone1: '5323138414',
      Phone2: '2163950981',
      Phone3: '5323138414',
      Address: 'CAMI MAH. PAPAZ ÇEŞME CAD. MEHTER SOK.   NO: 4 81700',
      Neighborhood: 'CAMI',
      District: 'TUZLA',
      City: 'İSTANBUL',
      Urgent: '0',
      ContactPerson: 'Özkan LOSTAR',
      ContactPhone: '5333836529',
      PreferredServiceShop: '0',
      DeliveryDate: '26/1/2018',
      ExternalOrderId: 'Önceden oluşturulan Order No varsa ve durum update geliyorsa yazılır.',
      ProductOrderOperationDetailRequest: 
       [ { MainSourceOrderProcessId: 'Ecom1 Id Olacak',
           SourceOrderId: 'DMS1 Id Olacak',
           MainSourceOrderProcessStatus: 'ECOM Approve',
           ConsignmentId: '00002345-c-1',
           ProductCode: 'VZT000',
           ProductBarcode: 'VZT000150087191201',
           MaliId: 'AS0000216212',
           DetailNote: 'Montaj Yapabilirsiniz',
           WareHouseCode: '01',
           WareHouseType: 'Bayi Depo',
           WareHouseAddress: 'CAMİ MAH.PAPAZÇEŞME CAD.NO:21 TUZLA',
           WareHouseNeighborhood: 'CAMI',
           WareHouseDistrict: 'TUZLA',
           WareHouseCity: 'İSTANBUL',
           Product: '9103 YP  9 KG 1000 DD TEK SU BEYAZ ÇAM MAK',
           OperationType: 'Montaj',
           ProductReturnCheck: '0',
           ExtraWarrantyType: '0',
           ProductExposeCheck: '0',
           SourceOrderStatus: 'DMS Approve',
           ParoId: '17051509295500055025',
           CrmKey: '5425928388',
           InvoiceNr: '007557',
           InvoiceDate: '2017-04-27 00:00:00',
           NaceId: '471101',
           SectorId: '01' } ] } },
json: true };

request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(response.body);
});
    
        
    
});

app.get('/workorder' , function(req,res) {
    res.sendfile('views/redirect.html', {root: __dirname });   
});



app.set('port', process.env.PORT || 1337);

app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

