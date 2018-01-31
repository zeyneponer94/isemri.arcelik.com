var testApp = angular.module("testApp", []);
testApp.controller('testController' , ['$scope','$http','$window', function ($scope, $http, $window) {
    //$return dene!
    $scope.submit = function () {



        /*
        var data = JSON.stringify({
            "ProductOrderOperationRequest": {
              "MainSourceApplicationProcces": "ECOM Uygulama İsimi",
              "SourceApplication": "DMS Uygulama İsmi",
              "MainSourceOrderProccesId": "Ecom1 Id Olacak",
              "SourceOrderId": "DMS1 Id Olacak",
              "MainSourceProccesStatus": "Ecom Approve",
              "SourceStatus": "DMS Approve",
              "AsistDealerCode": "21534701",
              "DealerCode": "21534701",
              "AsistBranchDealerCode": "0",
              "Tckn": "18623292306",
              "TaxOffice": "İSTANBUL-KARTAL",
              "TaxId": "1234567890",
              "Email": "ozkan.lostar@lostarltd.com.tr",
              "Note": "Ana order kaydına girilen note",
              "Name": "ÖZKAN",
              "Surname": "LOSTAR",
              "Phone1": "5323138414",
              "Phone2": "2163950981",
              "Phone3": "5323138414",
              "Address": "CAMI MAH. PAPAZ ÇEŞME CAD. MEHTER SOK.   NO: 4 81700",
              "Neighborhood": "CAMI",
              "District": "TUZLA",
              "City": "İSTANBUL",
              "Urgent": "0",
              "ContactPerson": "Özkan LOSTAR",
              "ContactPhone": "5333836529",
              "PreferredServiceShop": "0",
              "DeliveryDate": "26/1/2018",
              "ExternalOrderId": "Önceden oluşturulan Order No varsa ve durum update geliyorsa yazılır.",
                        "ProductOrderOperationDetailRequest": [
                            {
                            "MainSourceOrderProcessId": "Ecom1 Id Olacak",
                            "SourceOrderId": "DMS1 Id Olacak",
                            "MainSourceOrderProcessStatus": "ECOM Approve",
                            "ConsignmentId": "00002345-c-1",
                            "ProductCode": "VZT000",
                            "ProductBarcode": "VZT000150087191201",
                            "MaliId": "AS0000216212",
                            "DetailNote": "Montaj Yapabilirsiniz",
                            "WareHouseCode": "01",
                            "WareHouseType": "Bayi Depo",
                            "WareHouseAddress": "CAMİ MAH.PAPAZÇEŞME CAD.NO:21 TUZLA",
                            "WareHouseNeighborhood": "CAMI",
                            "WareHouseDistrict": "TUZLA",
                            "WareHouseCity": "İSTANBUL",
                            "Product": "9103 YP  9 KG 1000 DD TEK SU BEYAZ ÇAM MAK",
                            "OperationType": "Montaj",
                            "ProductReturnCheck": "0",
                            "ExtraWarrantyType": "0",
                            "ProductExposeCheck": "0",
                            "SourceOrderStatus": "DMS Approve",
                            "ParoId": "17051509295500055025",
                            "CrmKey": "5425928388",
                            "InvoiceNr": "007557",
                            "InvoiceDate": "2017-04-27 00:00:00",
                            "NaceId": "471101",
                            "SectorId": "01"
                            }
                        ]
            }
          });
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              alert(this.responseText);
            }
          });
          
          xhr.open("POST", "https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc?wsdl=");
          xhr.setRequestHeader("Content-Type", "application/json");
          //xhr.setRequestHeader("Cache-Control", "no-cache");
          //xhr.setRequestHeader("Postman-Token", "ebd66f7f-8f28-ee2c-fcc7-d0070a714dd0");


          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
          xhr.setRequestHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          xhr.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");       
          xhr.withCredentials = false;
          //xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
          
          xhr.send(data);

          alert(xhr.responseText.substring(0, 150));
   
          alert('status: ' + xhr.statusText);


*/

          var data = null;
          
          var xhr = new XMLHttpRequest();
          //xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              alert(this.responseText);
            }
          });
          
          xhr.open("POST", "https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          xhr.setRequestHeader("SessionToken", "Guld");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("Postman-Token", "62c7c72a-6088-d796-6495-c41e526c85aa");
          xhr.setRequestHeader("Access-Control-Allow-Origin", "*");          
          xhr.setRequestHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, SessionToken, Cache-Control, Postman-Token, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin");       
          xhr.setRequestHeader("Access-Control-Allow-Methods", "POST");
          
          xhr.withCredentials = false;
          
          
          xhr.send(data);
          alert(xhr.response);



    }

        /*
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabse2', 
            params: {name:$scope.username_id, password:$scope.password_id}
       }) 
       .then(function(response){
            $scope.redirect();
        });
    } 

    $scope.redirect = function(){ 
        $http({method: 'GET', url: '/workorder'}).
            success(function(data, status) { 
              $scope.dataset = data; 
            }).
            error(function(data, status) {
              $scope.dataset = data || "Request failed "; 
        });
    }*/
    
/*    
    $scope.accessDatabase = function () {
       $http({
             method: "GET",        
             url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabase', 
             params: {name:$scope.username_id, password:$scope.password_id}
        }) 
        .then(function(response){ 
            $scope.data = response.data;
            var url = "http://10.134.51.93:8080/redirect.html";
            $window.location = url;
         })
        .error(function (response) {
            $scope.data = response.data; 
        });
    }*/


/*
        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabase', 
             method: "GET",
            params: {username: '',
                     password: ''
                    }
        }) 
        .then(function(response){
            $scope.data = response.data;
         })
        .error(function (data, status, headers, config) {
        });*/
 
}]);





