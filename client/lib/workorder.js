    app = angular.module('App', [])
    app.controller('Controller', ['$scope','$http','$window', function ($scope, $http, $window) {
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
          $scope.query=true;
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

        $scope.create = function () 
        {        
          alert("create");

          var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService",
            "method": "POST",
            "headers": {
              "SessionToken": "4737B2FC-DE66-4741-B7A8-07646813D890",
              "Cache-Control": "no-cache",
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
              'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers,Content-Type,Access-Control-Allow-Origin,servicetype, Cache-Control, SessionToken, **Authorization** ',
              'Access-Control-Allow-Credentials':false,
              "servicetype": "INTHEBOX1",
              "Content-Type": "application/json"
            },
            "processData": false,
            "data": "[{\r\n\"PK\": \"\",\r\n\"MainSourceApplicationProcces\": \"DMS\",\r\n\"SourceApplication\": \"DMS\",\r\n\"MainSourceOrderProccesId\": \"DMS1\",\r\n\"SourceOrderId\": \"DMS1\",\r\n\"MainSourceProccesStatus\": \"Approve\",\r\n\"SourceStatus\": \"Approve\",\r\n\"DealerCode\": \"342122\",\r\n\"AsistDealerCode\": \"342122\",\r\n\"AsistBranchDealerCode\": \"342122\",\r\n\"Note\": \"10\",\r\n\"Name\": \"Serdar\",\r\n\"Surname\": \"Uysal\",\r\n\"Phone1\": \"5373579059\",\r\n\"Phone2\": \"2163964187\",\r\n\"Phone3\": \"\",\r\n\"Email\": \"serdar.uysal@arcelik.com\",\r\n\"TaxOffice\": \"\",\r\n\"TaxId\": \"\",\r\n\"Tckn\": \"\",\r\n\"Address\": \"Kavakpınar Mah Apdi İpekçi Cad No:5\",\r\n\"Neighborhood\": \"KAVAKPINAR\",\r\n\"District\": \"PENDİK\",\r\n\"City\": \"İSTANBUL\",\r\n\"Urgent\": \"0\",\r\n\"ContactPerson\": \"Deneme\",\r\n\"ContactPhone\": \"2167865438\",\r\n\"PreferredServiceShop\": \"NULL\",\r\n\"DeliveryDate\": \"13.02.2018 08:54:00\",\r\n\"ExternalOrderId\": \"\",\r\n\"InvoiceAcceptPhone\": \"5373579059\",\r\n\"InvoiceAcceptName\": \"Serdar\",\r\n\"InvoiceAcceptSurname\": \"Uysal\",\r\n\"ProductOrderDetail\": [\r\n{\r\n\"ConsignmentId\":\"1\",\r\n\"MainSourceOrderProcessId\": \"DMS1\",\r\n\"SourceOrderId\": \"DMS1\",\r\n\"PK\": \"\",\r\n\"R_Counter\": \"\",\r\n\"SS_R_Counter\": \"\",\r\n\"MainSourceOrderProcessStatus\": \"Approve\",\r\n\"WareHouseCode\": \"12457\",\r\n\"WareHouseType\": \"1\",\r\n\"WareHouseAddress\": \"Depo Adresi\",\r\n\"WareHouseNeighborhood\": \"BATI\",\r\n\"WareHouseDistrict\": \"PENDİK\",\r\n\"WareHouseCity\": \"İSTANBUL\",\r\n\"ProductCode\": \"6211101000\",\r\n\"Product\": \"ARY-5500 E ÇAMAŞIR MAK.(Y-326) ÇİFT\",\r\n\"OperationType\": \"Montaj\",\r\n\"ProductReturnCheck\": \"0\",\r\n\"ExtraWarrantyType\": \"1\",\r\n\"ProductExposeCheck\": \"0\",\r\n\"SourceOrderStatus\": \"Approve\",\r\n\"ProductBarcode\": \"\",\r\n\"DetailNote\": \"Test satır 1\",\r\n\"ParoId\": \"\",\r\n\"InvoiceNr\": \"AAFF111SFFEWQ\",\r\n\"InvoiceDate\": \"13.02.2018 08:54:00\",\r\n\"MaliId\": \"\",\r\n\"NaceId\": \"\",\r\n\"SectorId\": \"\",\r\n\"CrmKey\": \"\"\r\n}\r\n]\r\n}\r\n]"
          }
          alert("settings");
          
          $.ajax(settings).done(function (response) {
            alert(response);
          });

          alert("response");
/*
          $http({method: 'GET', url: '/postman'}).
          success(function(data, status) { 

            var url = "https://thworkorder.azurewebsites.net/postman";
            $window.location = url; 
            alert(data);
          }).
          error(function(data, status) {
              alert("fail");
              $scope.dataset = data || "Request failed "; 
          });*/
        } 




    }]);
  


