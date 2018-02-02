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
    res.sendfile('views/create_workorder.html', {root: __dirname });   
});


app.get('/postman' , function(req,res) {

    var options = { method: 'POST',
      url: 'http://yetkiliservis-test/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
      headers: 
       { 'Content-Type': 'application/json',
         servicetype: 'INTHEBOX1',
         'Cache-Control': 'no-cache',
         SessionToken: '4737B2FC-DE66-4741-B7A8-07646813D890' },
      body: 
       [ { PK: '',
           MainSourceApplicationProcces: 'DMS',
           SourceApplication: 'DMS',
           MainSourceOrderProccesId: 'DMS1',
           SourceOrderId: 'DMS1',
           MainSourceProccesStatus: 'Approve',
           SourceStatus: 'Approve',
           DealerCode: '342122',
           AsistDealerCode: '342122',
           AsistBranchDealerCode: '342122',
           Note: '10',
           Name: 'Serdar',
           Surname: 'Uysal',
           Phone1: '5373579059',
           Phone2: '2163964187',
           Phone3: '',
           Email: 'serdar.uysal@arcelik.com',
           TaxOffice: '',
           TaxId: '',
           Tckn: '',
           Address: 'Kavakpınar Mah Apdi İpekçi Cad No:5',
           Neighborhood: 'KAVAKPINAR',
           District: 'PENDİK',
           City: 'İSTANBUL',
           Urgent: '0',
           ContactPerson: 'Deneme',
           ContactPhone: '2167865438',
           PreferredServiceShop: 'NULL',
           DeliveryDate: '13.02.2018 08:54:00',
           ExternalOrderId: '',
           InvoiceAcceptPhone: '5373579059',
           InvoiceAcceptName: 'Serdar',
           InvoiceAcceptSurname: 'Uysal',
           ProductOrderDetail: 
            [ { ConsignmentId: '1',
                MainSourceOrderProcessId: 'DMS1',
                SourceOrderId: 'DMS1',
                PK: '',
                R_Counter: '',
                SS_R_Counter: '',
                MainSourceOrderProcessStatus: 'Approve',
                WareHouseCode: '12457',
                WareHouseType: '1',
                WareHouseAddress: 'Depo Adresi',
                WareHouseNeighborhood: 'BATI',
                WareHouseDistrict: 'PENDİK',
                WareHouseCity: 'İSTANBUL',
                ProductCode: '6211101000',
                Product: 'ARY-5500 E ÇAMAŞIR MAK.(Y-326) ÇİFT',
                OperationType: 'Montaj',
                ProductReturnCheck: '0',
                ExtraWarrantyType: '1',
                ProductExposeCheck: '0',
                SourceOrderStatus: 'Approve',
                ProductBarcode: '',
                DetailNote: 'Test satır 1',
                ParoId: '',
                InvoiceNr: 'AAFF111SFFEWQ',
                InvoiceDate: '13.02.2018 08:54:00',
                MaliId: '',
                NaceId: '',
                SectorId: '',
                CrmKey: '' } ] } ],
      json: true };
    request(options, function (error, response, body) {
        res.send(body);        
    });
});

app.set('port', process.env.PORT || 1337);
app.use(express.static(__dirname + '/client')); 
app.use(errorHandler());
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});

