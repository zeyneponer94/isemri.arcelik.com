    app = angular.module('App', ['ui.bootstrap','dialogs.main','ngRoute','ngSanitize','ui.bootstrap.pagination']);

    app.config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);


    angular.module('App').controller('Controller', function ($scope, $http, $window,dialogs,$sanitize) {
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

        $scope.viewby = 10;
        $scope.currentPage = 4;
        $scope.itemsPerPage = $scope.viewby;
        $scope.maxSize = 5; 
      
        $scope.setPage = function (pageNo) {
          $scope.currentPage = pageNo;
        };
      
        $scope.pageChanged = function() {
          console.log('Page changed to: ' + $scope.currentPage);
        };
      
       $scope.setItemsPerPage = function(num) {
        $scope.itemsPerPage = num;
        $scope.currentPage = 1; //reset to first page
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

            $scope.totalItems = $scope.workorders.length;
            
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

            $scope.totalItems = $scope.workorders.length;
            

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
                url: 'https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
                method: "POST",
                data: $scope.postData ,
                headers: {'Content-Type': 'application/json',
                          'SessionToken': '548ABC6A-50FD-43C1-89D0-48B2FF59CFD6',
                          'cache-control': 'no-cache',
                          'servicetype': 'INTHEBOX1'
                         }
              }).then(function (response) {
                  $http({
                    method: "GET", 
                    url: 'https://thworkorderfapp.azurewebsites.net/api/createworkorder',
                    params: {
                      name:$scope.name_id,
                      surname:$scope.surname_id,
                      phone:$scope.phone_id,
                      no:"Test",
                      product:$scope.singleSelect,
                      workorder:$scope.workorderSelect,
                      customer:"Test",
                      point:$scope.provinceSelect,
                      address:$scope.citySelect,
                      status: response.data[0].ConsignmentWorkOrderStatus,
                      service:"Test",
                      DeliveryDate:"2018-02-10",
                      AppointmentDate:"2018-02-15"
                    }          
                  }) 
                  .then(function(response){     
                  });

            });


					},function(btn){
					    alert('İşlem Tamamlanamadı.');
					});
        } 



    });
  


