    app = angular.module('App', [])
    app.controller('Controller', function ($scope, $http) {
        $scope.create = true;  
        $scope.query = false;      

        //connecting to azure db, getting required records from specified table and displaying them in selection list
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/productlist',           
        }) 
        .then(function(response){ 
          $scope.product = [];                    
          var i = 0;
          while(response.data[i]!=null)
          {
            var obj = { name: response.data[i] };
            $scope.product.push(obj);  
            i++;
          }
        });

        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/provincelist',           
        }) 
        .then(function(response){ 
          $scope.province = [];                    
          var i = 0;
          while(response.data[i]!=null)
          {
            var obj = { name: response.data[i] };
            $scope.province.push(obj);  
            i++;
          }
        });

        $scope.createWorkOrder = function () {
          $scope.create = true;
          $scope.query=false;
        }

        $scope.queryWorkOrder = function () {
          $scope.create = false;
          $scope.query=false;
       }


        //when user selects a product from selection list, ng-change calls that function to get the work order types available for chosen product
        $scope.choose_workordertype = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/workordertype',
            params: {productname:$scope.singleSelect}          
          }) 
          .then(function(response){ 
              $scope.workordertype = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { name: response.data[i] };
                $scope.workordertype.push(obj);  
                i++;
              }
          });          
        }

        $scope.choose_city = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/citytype',
            params: {prorvince:$scope.singleSelect}          
          }) 
          .then(function(response){ 
              $scope.city = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { name: response.data[i] };
                $scope.city.push(obj);  
                i++;
              }
          });          
        }

        $scope.createWorkOrder = function () 
        {        

          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://yetkiliservis-test/wsaftersales/ServicePaperService.svc/ProductOrderOperationService",
            "method": "POST",
            "headers": {
              "SessionToken": "4737B2FC-DE66-4741-B7A8-07646813D890",
              "Cache-Control": "no-cache",
              "servicetype": "INTHEBOX1",
              "Content-Type": "application/json"
            },
            "processData": false,
            "data": "[{\r\n    \"PK\": \"3\",\r\n    \"MainSourceApplicationProcces\": \"Serdar\",\r\n    \"SourceApplication\": \"2\",\r\n    \"MainSourceOrderProccesId\":\"3\",\r\n    \"SourceOrderId\": \"4\",\r\n    \"MainSourceProccesStatus\": \"5\",\r\n    \"SourceStatus\": \"6\",\r\n    \"DealerCode\": \"7\",\r\n    \"AsistDealerCode\": \"8\",\r\n    \"AsistBranchDealerCode\": \"9\",\r\n    \"Note\": \"10\",\r\n    \"Name\": \"11\",\r\n    \"Surname\": \"12\",\r\n    \"Phone1\": \"13\",\r\n    \"Phone2\": \"14\",\r\n    \"Phone3\": \"15\",\r\n    \"Email\": \"16\",\r\n    \"TaxOffice\": \"17\",\r\n    \"TaxId\": \"18\",\r\n    \"Tckn\": \"19\",\r\n    \"Address\": \"20\",\r\n    \"Neighborhood\": \"21\",\r\n    \"District\": \"22\",\r\n    \"City\": \"23\",\r\n    \"Urgent\": \"24\",\r\n    \"ContactPerson\": \"25\",\r\n    \"ContactPhone\": \"26\",\r\n    \"PreferredServiceShop\": \"27\",\r\n    \"DeliveryDate\": \"28\",\r\n    \"ExternalOrderId\": \"29\",\r\n    \"InvoiceAcceptPhone\": \"30\",\r\n    \"InvoiceAcceptName\": \"31\",\r\n    \"InvoiceAcceptSurname\": \"32\",\r\n        \"ProductOrderOperationDetailRequest\": [\r\n    \t{\r\n        \t\"ConsignmentId\": \"1\",\r\n            \"MainSourceOrderProcessId\": \"1\",\r\n            \"SourceOrderId\":\"2\",\r\n            \"PK\":\"3\",\r\n            \"R_Counter\":\"4\",\r\n            \"SS_R_Counter\":\"5\",\r\n            \"MainSourceOrderProcessStatus\": \"6\",\r\n        \t\"WareHouseCode\": \"7\",\r\n        \t\"WareHouseType\": \"8\",\r\n        \t\"WareHouseAddress\": \"9\",\r\n    \t    \"WareHouseNeighborhood\": \"10\",\r\n        \t\"WareHouseDistrict\": \"11\",\r\n        \t\"WareHouseCity\": \"12\",\r\n\t        \"ProductCode\": \"13\",\r\n        \t\"Product\": \"14\",\r\n        \t\"OperationType\": \"15\",\r\n        \t\"ProductReturnCheck\": \"16\",\r\n        \t\"ExtraWarrantyType\": \"17\",\r\n        \t\"ProductExposeCheck\": \"18\",\r\n        \t\"SourceOrderStatus\": \"19\",\r\n        \t\"ProductBarcode\": \"20\",\r\n        \t\"DetailNote\": \"21\",\r\n        \t\"ParoId\": \"22\",\r\n            \"InvoiceNr\": \"23\",\r\n\t        \"InvoiceDate\": \"24\",\r\n            \"MaliId\": \"25\",\t\r\n        \t\"NaceId\": \"26\",\r\n        \t\"SectorId\": \"27\",\r\n        \t\"CrmKey\": \"28\"} ]\r\n}\r\n]"
          }
          
          $.ajax(settings).done(function (response) {
            alert(response);
          });
        } 




    });
  



