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
          $scope.result=true;
       }

       $scope.query_workorder = function () {
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/workorderlist',
          params: {name:$scope.name_id,
                   surname:$scope.surname_id}          
        }) 
        .then(function(response){ 
            $scope.workorders = [];
            alert(response.data[0][0]);                    
            var i = 0;
            var j = 0;
  //          while(response.data[i]!=null){
    //          while(response.data[i][j]!=null){
      //          var obj = { name: response.data[i][j]
                  /*          surname:response.data[i].musteri_soyadı,
                            phone: response.data[i].musteri_tel,
                            no: response.data[i].is_emri_no,
                            product:response.data[i].urun,
                            type: response.data[i].is_emri_turu,
                            customer: response.data[i].musteri,
                            point: response.data[i].sevk_noktası,
                            address: response.data[i].teslimat_adresi,
                            status: response.data[i].is_emri_durumu,
                            service: response.data[i].servis,
                            DeliveryDate: response.data[i].teslimat_tarihi,
                            AppointmentDate: response.data[i].randevu_tarihi*/
          //      };
            //    j++;
             // }

            //  $scope.workorders.push(obj);  
              //i++;
          //  }
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

          var req = {
            method: 'POST',
            url: 'http://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
            headers: {
              "SessionToken": "4737B2FC-DE66-4741-B7A8-07646813D890",
              'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Access-Control-Request-Method, Access-Control-Request-Headers,Content-Type,Access-Control-Allow-Origin,servicetype, Cache-Control, SessionToken, Authorization ',
              
            /*  "Cache-Control": "no-cache",
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',
              'Access-Control-Allow-Credentials':false,*/
              "servicetype": "INTHEBOX1",
              "Content-Type": "application/json"
            },
            data: {
              "PK": "",
              "MainSourceApplicationProcces": "DMS",
              "SourceApplication": "DMS",
              "MainSourceOrderProccesId": "DMS1",
              "SourceOrderId": "DMS1",
              "MainSourceProccesStatus": "Approve",
              "SourceStatus": "Approve",
              "DealerCode": "342122",
              "AsistDealerCode": "342122",
              "AsistBranchDealerCode": "342122",
              "Note": "10",
              "Name": "Serdar",
              "Surname": "Uysal",
              "Phone1": "5373579059",
              "Phone2": "2163964187",
              "Phone3": "",
              "Email": "serdar.uysal@arcelik.com",
              "TaxOffice": "",
              "TaxId": "",
              "Tckn": "",
              "Address": "Kavakpınar Mah Apdi İpekçi Cad No:5",
              "Neighborhood": "KAVAKPINAR",
              "District": "PENDİK",
              "City": "İSTANBUL",
              "Urgent": "0",
              "ContactPerson": "Deneme",
              "ContactPhone": "2167865438",
              "PreferredServiceShop": "NULL",
              "DeliveryDate": "13.02.2018 08:54:00",
              "ExternalOrderId": "",
              "InvoiceAcceptPhone": "5373579059",
              "InvoiceAcceptName": "Serdar",
              "InvoiceAcceptSurname": "Uysal",
              "ProductOrderDetail": [
              {
              "ConsignmentId":"1",
              "MainSourceOrderProcessId": "DMS1",
              "SourceOrderId": "DMS1",
              "PK": "",
              "R_Counter": "",
              "SS_R_Counter": "",
              "MainSourceOrderProcessStatus": "Approve",
              "WareHouseCode": "12457",
              "WareHouseType": "1",
              "WareHouseAddress": "Depo Adresi",
              "WareHouseNeighborhood": "BATI",
              "WareHouseDistrict": "PENDİK",
              "WareHouseCity": "İSTANBUL",
              "ProductCode": "6211101000",
              "Product": "ARY-5500 E ÇAMAŞIR MAK.(Y-326) ÇİFT",
              "OperationType": "Montaj",
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
             }
           }
           
           $http(req).success(function(){
             alert("success");
            })
             .error(function(){
               alert("fail");
             });

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
  


