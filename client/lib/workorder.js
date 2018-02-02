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

          var data = JSON.stringify([
            {
              "PK": "3",
              "MainSourceApplicationProcces": "Serdar",
              "SourceApplication": "2",
              "MainSourceOrderProccesId": "3",
              "SourceOrderId": "4",
              "MainSourceProccesStatus": "5",
              "SourceStatus": "6",
              "DealerCode": "7",
              "AsistDealerCode": "8",
              "AsistBranchDealerCode": "9",
              "Note": "10",
              "Name": "11",
              "Surname": "12",
              "Phone1": "13",
              "Phone2": "14",
              "Phone3": "15",
              "Email": "16",
              "TaxOffice": "17",
              "TaxId": "18",
              "Tckn": "19",
              "Address": "20",
              "Neighborhood": "21",
              "District": "22",
              "City": "23",
              "Urgent": "24",
              "ContactPerson": "25",
              "ContactPhone": "26",
              "PreferredServiceShop": "27",
              "DeliveryDate": "28",
              "ExternalOrderId": "29",
              "InvoiceAcceptPhone": "30",
              "InvoiceAcceptName": "31",
              "InvoiceAcceptSurname": "32",
              "ProductOrderOperationDetailRequest": [
                {
                  "ConsignmentId": "1",
                  "MainSourceOrderProcessId": "1",
                  "SourceOrderId": "2",
                  "PK": "3",
                  "R_Counter": "4",
                  "SS_R_Counter": "5",
                  "MainSourceOrderProcessStatus": "6",
                  "WareHouseCode": "7",
                  "WareHouseType": "8",
                  "WareHouseAddress": "9",
                  "WareHouseNeighborhood": "10",
                  "WareHouseDistrict": "11",
                  "WareHouseCity": "12",
                  "ProductCode": "13",
                  "Product": "14",
                  "OperationType": "15",
                  "ProductReturnCheck": "16",
                  "ExtraWarrantyType": "17",
                  "ProductExposeCheck": "18",
                  "SourceOrderStatus": "19",
                  "ProductBarcode": "20",
                  "DetailNote": "21",
                  "ParoId": "22",
                  "InvoiceNr": "23",
                  "InvoiceDate": "24",
                  "MaliId": "25",
                  "NaceId": "26",
                  "SectorId": "27",
                  "CrmKey": "28"
                }
              ]
            }
          ]);
          
          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              alert(this.responseText);
            }
          });
          
          xhr.open("POST", "http://yetkiliservis-test/wsaftersales/ServicePaperService.svc/ProductOrderOperationService");
          xhr.setRequestHeader("SessionToken", "4737B2FC-DE66-4741-B7A8-07646813D890");
          xhr.setRequestHeader("Cache-Control", "no-cache");
          xhr.setRequestHeader("servicetype", "INTHEBOX1");
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.send(data);
          alert(xhr.statusText);
          
          
          
          
        } 




    });
  



