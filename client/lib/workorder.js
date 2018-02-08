    app = angular.module('App', ['ui.bootstrap','dialogs.main','ngRoute','ngSanitize']);

    app.config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);


    angular.module('App').controller('Controller', function ($scope, $http, $window,dialogs,$sanitize) {
        $scope.ExternalOrderId = "";
        $scope.ConsignmentWorkOrderStatus = "";
        $scope.workorderno = "";      
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

        var header = document.getElementById("navbarid");
        var bars = header.getElementsByClassName("navbar");
        for (var i = 0; i < bars.length; i++) {
          bars[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
          });
        }   

        $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
        };

        $scope.createWorkOrder = function () {
          $scope.create = true;
          $scope.query=false;
        }

        $scope.queryWorkOrder = function () {
          $scope.create = false;
          $scope.query=true;
       }

       $scope.query_workorder = function () {
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/workorderlist',
          params: {name:$scope.name_id_query,
                   surname:$scope.surname_id_query}          
        }) 
        .then(function(response){  

          if(response.data[0]==null)
            $scope.result = true;
          else
            $scope.result = false;     

            $scope.workorders = [];
            var i = 0;
            while(response.data[i]!=null){
                      var obj = { 
                            no: response.data[i][3],
                            product:response.data[i][4],
                            type: response.data[i][5],
                            customer: response.data[i][6],
                            point: response.data[i][7],
                            address: response.data[i][8],
                            status: response.data[i][9],
                            service: response.data[i][10],
                            DeliveryDate: response.data[i][11],
                            AppointmentDate: response.data[i][12]
                      };
                $scope.workorders.push(obj);         
                i++;
            }

        });

      }

      $scope.query_all = function () {
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/query_workorderlist'     
        }) 
        .then(function(response){  
            if(response.data[0]==null)
              $scope.result = true;
            else
              $scope.result = false;       

            $scope.workorders = [];
            var i = 0;
            while(response.data[i]!=null){
                      var obj = { 
                            no: response.data[i][3],
                            product:response.data[i][4],
                            type: response.data[i][5],
                            customer: response.data[i][6],
                            point: response.data[i][7],
                            address: response.data[i][8],
                            status: response.data[i][9],
                            service: response.data[i][10],
                            DeliveryDate: response.data[i][11],
                            AppointmentDate: response.data[i][12]
                      };
                $scope.workorders.push(obj);         
                i++;
            }

            

        });
        
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

        $scope.logout = function() {
            var url = "https://thworkorder.azurewebsites.net";
            $window.location = url;
        }
        
        
        $scope.delete_query = function(x) {

          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/delete_query',
            params: {workorderno: x.no}          
          }) 
          .then(function(response){ 
              alert(response.data);
              $scope.query_all();
          });          
        }

        $scope.choose_city = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/citytype',
            params: {province:$scope.provinceSelect}          
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


        $scope.create_workorder = function () 
        {       
          
          var dlg = dialogs.confirm("Lütfen Onaylayınız!","Aşağıda belirtilen bilgiler ile iş emri oluşturma talebinizi gerçekleştirmeyi onaylıyor musunuz?".bold()+"<br>"+ ("  Müşteri adı = "+$scope.name_id+"<br>  Müşteri soyadı = "
          +$scope.surname_id+"<br>  Müşteri telefon numarası = "+$scope.phone_id+"<br>  Seçilen ürün = "+$scope.singleSelect+"<br>  Seçilen iş emri türü = "
          +$scope.workorderSelect+"<br> Müşteri adresi = " + $scope.provinceSelect + " " +$scope.citySelect).italics());
					dlg.result.then(function(btn){
/*
            $scope.jsonData = [{
                        "PK": "3",
                        "MainSourceApplicationProcces": "InnTheBox",
                        "SourceApplication": "InnTheBox",
                        "MainSourceOrderProccesId": "InnTheBox_1",
                        "SourceOrderId": "InnTheBox_1",
                        "MainSourceProccesStatus": "Approve",
                        "SourceStatus": "Approve",
                        "DealerCode": "342122",
                        "AsistDealerCode": "342122",
                        "AsistBranchDealerCode": "342122",
                        "Note": "10",
                        "Name": ""+$scope.name_id,
                        "Surname": ""+$scope.surname_id,
                        "Phone1": ""+$scope.phone_id,
                        "Phone2": "2163964187",
                        "Phone3": "",
                        "Email": ""+$scope.email_id,
                        "TaxOffice": "",
                        "TaxId": "",
                        "Tckn": "",
                        "Address": ""+$scope.adres_id,
                        "Neighborhood": "KAVAKPINAR",
                        "District": ""+$scope.citySelect,
                        "City": ""+$scope.provinceSelect,
                        "Urgent": "0",
                        "ContactPerson": "Deneme",
                        "ContactPhone": "2167865438",
                        "PreferredServiceShop": "NULL",
                        "DeliveryDate": "13.02.2018 08:54:00",
                        "ExternalOrderId": "",
                        "InvoiceAcceptPhone": ""+$scope.phone_id,
                        "InvoiceAcceptName": ""+$scope.name_id,
                        "InvoiceAcceptSurname": ""+$scope.surname_id,
                      "ProductOrderDetail": [
                                      {
                                              "ConsignmentId":"1",
                                              "MainSourceOrderProcessId": "InnTheBox_1",
                                              "SourceOrderId": "InnTheBox_1",
                                              "PK": "",
                                              "R_Counter": "",
                                              "SS_R_Counter": "",
                                              "MainSourceOrderProcessStatus": "Approve",
                                              "WareHouseCode": "12457",
                                              "WareHouseType": "1",
                                              "WareHouseAddress": "Depo Adresi",
                                              "WareHouseNeighborhood": "BATI",
                                              "WareHouseDistrict": ""+$scope.citySelect,
                                              "WareHouseCity": ""+$scope.provinceSelect,
                                              "ProductCode": "6211101000",
                                              "Product": ""+$scope.singleSelect,
                                              "OperationType": ""+$scope.workorderSelect,
                                              "ProductReturnCheck": "0",
                                              "ExtraWarrantyType": "1",
                                              "ProductExposeCheck": "0",
                                              "SourceOrderStatus": "Approve",
                                              "ProductBarcode": "",
                                              "DetailNote": "Test satır 1",
                                              "ParoId": "",
                                              "InvoiceNr": "AAFF111SFFEWQ",
                                              "InvoiceDate": "13.02.2018 08:54:00",
                                              "MaliId": "",
                                              "NaceId": "",
                                              "SectorId": "",
                                              "CrmKey": ""
                                      }
                                  ]
                }];
             
        
             $scope.postData = angular.toJson($scope.jsonData, true);                

              $http({
                async: true,
                crossDomain: true,  
                url: 'https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
                method: "POST",
                data: $scope.postData ,
                headers: {            
                          'Content-Type': 'application/json',
                          'SessionToken': 'C951FC0E-7F04-4D2A-AF81-2D8A3D578460',
                          'Cache-Control': 'no-cache',
                          'servicetype': 'INTHEBOX1'
                         }
              }).then(function (response) {
                  alert("service is successfully assigned!");
                  $scope.ExternalOrderId = response.data[0].ExternalOrderId;
                  $scope.ConsignmentWorkOrderStatus = response.data[0].ConsignmentWorkOrderStatus;

                  
            });*/


            var settings = {
              "async": true,
              "crossDomain": true,
              "url": "https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService",
              "method": "POST",
              "headers": {
                "SessionToken": "C951FC0E-7F04-4D2A-AF81-2D8A3D578460",
                "servicetype": "INTHEBOX1",
                "Content-Type": "text/plain"
              },
              "data": "[{\r\n      \"PK\": \"3\",\r\n      \"MainSourceApplicationProcces\": \"InnTheBox\",\r\n      \"SourceApplication\": \"InnTheBox\",\r\n      \"MainSourceOrderProccesId\": \"InnTheBox1\",\r\n      \"SourceOrderId\": \"InnTheBox1\",\r\n      \"MainSourceProccesStatus\": \"Approve\",\r\n      \"SourceStatus\": \"Approve\",\r\n      \"DealerCode\": \"342122\",\r\n      \"AsistDealerCode\": \"342122\",\r\n      \"AsistBranchDealerCode\": \"342122\",\r\n      \"Note\": \"10\",\r\n      \"Name\": \"Hıdır\",\r\n      \"Surname\": \"Öner\",\r\n      \"Phone1\": \"02164884905\",\r\n      \"Phone2\": \"2163964187\",\r\n      \"Phone3\": \"\",\r\n      \"Email\": \"hidir_oner@arcelik.com\",\r\n      \"TaxOffice\": \"\",\r\n      \"TaxId\": \"\",\r\n      \"Tckn\": \"\",\r\n      \"Address\": \"Adana Aladağ\",\r\n      \"Neighborhood\": \"KAVAKPINAR\",\r\n      \"District\": \"Aladag\",\r\n      \"City\": \"Adana\",\r\n      \"Urgent\": \"0\",\r\n      \"ContactPerson\": \"Deneme\",\r\n      \"ContactPhone\": \"02164884905\",\r\n      \"PreferredServiceShop\": \"NULL\",\r\n      \"DeliveryDate\": \"13.02.2018 08:54:00\",\r\n      \"ExternalOrderId\": \"\",\r\n      \"InvoiceAcceptPhone\": \"5373579059\",\r\n      \"InvoiceAcceptName\": \"Hıdır\",\r\n      \"InvoiceAcceptSurname\": \"Öner\",\r\n      \"ProductOrderDetail\": [\r\n                {\r\n                  \"ConsignmentId\":\"1\",\r\n                  \"MainSourceOrderProcessId\": \"DMS1\",\r\n          \"SourceOrderId\": \"DMS1\",\r\n          \"PK\": \"\",\r\n          \"R_Counter\": \"\",\r\n          \"SS_R_Counter\": \"\",\r\n          \"MainSourceOrderProcessStatus\": \"Approve\",\r\n          \"WareHouseCode\": \"12457\",\r\n          \"WareHouseType\": \"1\",\r\n          \"WareHouseAddress\": \"Depo Adresi\",\r\n          \"WareHouseNeighborhood\": \"BATI\",\r\n          \"WareHouseDistrict\": \"PENDİK\",\r\n          \"WareHouseCity\": \"İSTANBUL\",\r\n          \"ProductCode\": \"6211101000\",\r\n          \"Product\": \"Altus-Buzdolabi\",\r\n          \"OperationType\": \"Montaj\",\r\n          \"ProductReturnCheck\": \"0\",\r\n          \"ExtraWarrantyType\": \"1\",\r\n          \"ProductExposeCheck\": \"0\",\r\n          \"SourceOrderStatus\": \"Approve\",\r\n          \"ProductBarcode\": \"\",\r\n          \"DetailNote\": \"Test satır 1\",\r\n          \"ParoId\": \"\",\r\n          \"InvoiceNr\": \"AAFF111SFFEWQ\",\r\n          \"InvoiceDate\": \"13.02.2018 08:54:00\",\r\n          \"MaliId\": \"\",\r\n          \"NaceId\": \"\",\r\n          \"SectorId\": \"\",\r\n          \"CrmKey\": \"\"\r\n                }\r\n                ]\r\n}\r\n]\r\n"
            }
            
            $.ajax(settings).done(function (response) {
              alert(response.data);
            });


/*
            $http({
              method: "GET", 
              url: 'https://thworkorderfapp.azurewebsites.net/api/createworkorder',
              params: {
                name:""+$scope.name_id,
                surname:""+$scope.surname_id,
                phone:""+$scope.phone_id,
                no:""+$scope.ExternalOrderId,
                product:""+$scope.singleSelect,
                workorder:""+$scope.workorderSelect,
                customer:"Test",
                point:""+$scope.provinceSelect,
                address:""+$scope.citySelect,
                status: ""+$scope.ConsignmentWorkOrderStatus,
                service:"Test",
                DeliveryDate:"2018-02-10",
                AppointmentDate:"2018-02-15"
              }          
            }) 
            .then(function(response){ 
              alert(response.data);    
            });

*/


					},function(btn){
					    alert('İşlem Tamamlanamadı.');
					});
        } 



    });
  


