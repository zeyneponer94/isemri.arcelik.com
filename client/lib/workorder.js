    app = angular.module('App', ['ui.bootstrap','dialogs.main','ngRoute','ngSanitize']);

    app.config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

    angular.module('App').controller('Controller', function ($scope, $http, $window,dialogs,$sanitize,$timeout) {

          $scope.test="false";
          $scope.ButtonText = "CREATE";        

          $scope.workordertype = [];   
          var obj = { name: "Teklif Montaj",
                      id: 7  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Teşhire Ürün Teslimatı",
                      id: 8  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Depolar arası Transfer",
                      id: 9  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Demontaj",
                      id: 10  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Nakliye",
                      id: 1  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Montaj",
                      id: 2  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Nakliye Montaj",
                      id: 3  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Dış Teslim (Kargo ile gelecek)",
                      id: 4  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Arıza",
                      id: 5  };            
          $scope.workordertype.push(obj);  
          var obj = { name: "Klima Keşif",
                      id: 6  };            
          $scope.workordertype.push(obj);  
          

          $scope.ResponseProductList = [];   

          $scope.fncProductChoose = function(query) {
            $scope.txtProductCode = query;
            $scope.show = false;
          }



      $scope.search = function(query) {
       
        $scope.show = true;

        $http({
          async: true,
          crossDomain: true,
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/product/' +  query,
          headers: {            
            'Content-Type': 'application/json',
            'SessionToken': '78CC4F8F-C442-4BDA-95D3-C60AA3B054E6',
            'Cache-Control': 'no-cache',
            'servicetype': 'INTHEBOX1'
           } 
        }) 
        .then(function(response){ 
  
          var i = 0;
          while(response.data[""+i]!=null)
          {
            var obj = { 
              name: response.data[""+i].ProductCode
            };
            
            $scope.ResponseProductList.push(obj);  
            i++;
          } 

          return $scope.ResponseProductList;
  
        });   
  
      };


        $scope.ExternalOrderId = "";
        $scope.ConsignmentWorkOrderStatus = "";
        $scope.workorderno = "";      
        $scope.create = true;  
        $scope.query = false;      


        $http({
          async: true,
          crossDomain: true,  
          url: 'https://thworkorderfapp.azurewebsites.net/Uavt_province',
          method: "GET",
          headers: {            
                    'Content-Type': 'application/json',
                    'SessionToken': '78CC4F8F-C442-4BDA-95D3-C60AA3B054E6',
                    'Cache-Control': 'no-cache',
                    'servicetype': 'INTHEBOX1'
                   }
        })
        .then(function(response){ 
          $scope.province = [];                    
          var i = 0;
          while(response.data[i]!=null)
          {
            var obj = { 
              id: response.data[i].CityId,
              name: response.data[i].City
            };
            $scope.province.push(obj);  
            i++;
          }
        });

        $scope.choose_city = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/Uavt_city/' + $scope.provinceSelect + '/0/0',
            headers: {            
              'Content-Type': 'application/json',
              'SessionToken': '78CC4F8F-C442-4BDA-95D3-C60AA3B054E6',
              'Cache-Control': 'no-cache',
              'servicetype': 'INTHEBOX1'
             }
          }) 
          .then(function(response){ 
              $scope.city = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { 
                  id: response.data[i].DistrictId,
                  name: response.data[i].District
                };
                $scope.city.push(obj);  
                i++;
              }
          });          
        }  
        
        $scope.choose_area = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/Uavt_area/' + $scope.provinceSelect + '/' + $scope.citySelect + '/0',
            headers: {            
              'Content-Type': 'application/json',
              'SessionToken': '78CC4F8F-C442-4BDA-95D3-C60AA3B054E6',
              'Cache-Control': 'no-cache',
              'servicetype': 'INTHEBOX1'
             }
          }) 
          .then(function(response){ 
              $scope.area = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { 
                  id: response.data[i].NeighborhoodId,
                  name: response.data[i].Neighborhood
                 };
                $scope.area.push(obj);  
                i++;
              }
          });          
        }  

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

                  $scope.workorderno = response.data[i][3];
                  $http({
                  method: "GET",
                  url: 'https://thworkorderfapp.azurewebsites.net/sorgula/' + $scope.workorderno,
                  }) 
                .then(function(response){ 
                    var j  = 0;
                    while(response.data[j]!=null){
                      var obj = { 
                        no: response.data[i][3],
                        product:response.data[i][4],
                        type: response.data[i][5],
                        customer: response.data[i][6],
                        point: response.data[i][7],
                        address: response.data[i][8],
                        status: response.data[j].Status,
                        service: response.data[i][10],
                        DeliveryDate: response.data[i][11],
                        AppointmentDate: response.data[i][12]
                      };
                      $scope.workorders.push(obj); 
                      j++;                  
                    }                               
                  });    

                i++;
            }
        });
      }


      $scope.query_workorder_no = function(work_order) {
         var workorders_no = [];
          $http({
              method: "GET",
              url: 'https://thworkorderfapp.azurewebsites.net/sorgula/' + work_order,
          }) 
          .then(function(response){ 
              var j  = 0;
              while(response.data[j]!=null){
                var obj = { 
                    status: response.data[j].Status
                };
                workorders_no.push(obj);
                j++;                  
              }    
              return workorders_no;              
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
            $scope.return_value = [];                    
            var i = 0;
            while(response.data[i]!=null){

                    $scope.workorderno = response.data[i][3];
                    //var workorders_no = $scope.query_workorder_no($scope.workorderno);

                  //  var j = 0;
                  //  while(workorders_no.data[j]!=null){
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
                   //   j++;
                  //  }                    
                    i++; 
            }
        });


        
      }


        $scope.logout = function() {
            var url = "https://thworkorder.azurewebsites.net";
            $window.location = url;
        }
        
        
        $scope.delete_query = function(x) {       

          $scope.jsonData = [{
            "orderId": "",
            "consigntmentEntryId": "1",
            "Status": "020",
            "ERPOrderNo": "",
            "InvoiceNo": "",
            "InvoiceDate": "",
            "InvoiceLink": "",
            "CargoCompanyName": "",
            "CargoNo": "",
            "CargoLink": "",
            "ReturnNo": "",
            "WorkOrderNo": "" + x.no,
            "ServicePartnerName": "",
            "ServiceParterPhoneNumber": "",
            "isRefundableFlag": "",
            "ReturnComment": "",
            "ReturnWorkOrderNo": ""
            }
            ]
  
           $scope.postData = angular.toJson($scope.jsonData, true);     

          $http({
            url: 'https://thworkorderfapp.azurewebsites.net/deletequery/',
            method: "POST",
            data: $scope.postData ,
            headers: {            
                      'Content-Type': 'application/json',
                      'Cache-Control': 'no-cache',
                      'servicetype': 'INTHEBOX1'
                     }
          }) 
          .then(function(response){ 
          });       
          alert("İş Emri Başararıyla İptal Edildi.");
          $scope.sorgula(x.no);   
        }

        $scope.SORGULA = "QUERY";

        $scope.sorgula = function(x) {
          $http({
            method: "GET",
            url: 'https://thworkorderfapp.azurewebsites.net/sorgula/' + x,
          }) 
          .then(function(response){ 
            $scope.ConsignmentWorkOrderStatus = response.data[0].Status; 
            $http({
              method: "GET", 
              url: 'https://thworkorderfapp.azurewebsites.net/api/updateworkorder',
              params: {
                no: ""+x,
                status: ""+$scope.ConsignmentWorkOrderStatus
              }          
            }) 
            .then(function(response){ 
              $scope.query_all();
              $scope.SORGULA = "QUERYING";                    
              $timeout(function(){
                 $scope.SORGULA = "QUERY";    
               },1000)
               
            });  
          });     
      
        }

        $scope.ButtonText = "CREATE";
        
        $scope.create_workorder = function () 
        {       
          
          var dlg = dialogs.confirm("Lütfen Onaylayınız!","Aşağıda belirtilen bilgiler ile iş emri oluşturma talebinizi gerçekleştirmeyi onaylıyor musunuz?".bold()+"<br>"+ ("  Müşteri adı = "+$scope.name_id+"<br>  Müşteri soyadı = "
          +$scope.surname_id+"<br>  Müşteri telefon numarası = "+$scope.phone_id+"<br>  Seçilen ürün = "+$scope.txtProductCode+"<br>  Seçilen iş emri türü = "
          +$scope.workorderSelect+"<br> Müşteri adresi = " + $scope.adres_id).italics());
					dlg.result.then(function(btn){

          $scope.ButtonText = "CREATING";
            

          $scope.jsonData = [{
            "PK": "",
            "MainSourceApplicationProcces": "InnTheBox",
            "SourceApplication": "InnTheBox",
            "MainSourceOrderProccesId": "InnTheBox1",
            "SourceOrderId": "InnTheBox1",
            "MainSourceProccesStatus": "Approve",
            "SourceStatus": "Approve",
            "DealerCode": "342122",
            "AsistDealerCode": "342122",
            "AsistBranchDealerCode": "342122",
            "Note": "10",
            "Name": "" + $scope.name_id,
            "Surname": "" + $scope.surname_id,
            "Phone1": "" + $scope.phone_id,
            "Phone2": "",
            "Phone3": "",
            "Email": "" + $scope.email_id,
            "TaxOffice": "",
            "TaxId": "",
            "Tckn": "",
            "Address": "" + $scope.adres_id,
            "Neighborhood": "" + $scope.areaSelect,
            "District": "" + $scope.citySelect,
            "City": "" + $scope.provinceSelect,
            "Urgent": "0",
            "ContactPerson": "" + $scope.satis_id,
            "ContactPhone": "" + $scope.satis_phone_id,
            "PreferredServiceShop": "",
            "DeliveryDate": "13.02.2018 08:54:00",
            "ExternalOrderId": "0",
            "InvoiceAcceptPhone": "" + $scope.name_id,
            "InvoiceAcceptName": "" + $scope.surname_id,
            "InvoiceAcceptSurname": "" + $scope.phone_id,
            "ProductOrderDetail": 
                      [{
                        "ConsignmentId":"1",
                        "MainSourceOrderProcessId": "1",
                        "SourceOrderId": "" + $scope.phone_id,
                        "PK": "",
                        "R_Counter": "1",
                        "SS_R_Counter": "1",
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
                        "ProductBarcode": "1",
                        "DetailNote": "Test satır 1",
                        "ParoId": "1",
                        "InvoiceNr": "AAFF111SFFEWQ",
                        "InvoiceDate": "13.02.2018 08:54:00",
                        "MaliId": "1",
                        "NaceId": "1",
                        "SectorId": "1",
                        "CrmKey": "1"
            }]
                      
            }]

           $scope.postData = angular.toJson($scope.jsonData, true);                

            $http({
              async: true,
              crossDomain: true,  
              url: 'https://thworkorderfapp.azurewebsites.net/myproxy',
              method: "POST",
              data: $scope.postData ,
              headers: {            
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache',
                        'servicetype': 'INTHEBOX1'
                       }
            }).then(function (response) {
                $scope.ExternalOrderId = response.data[0].ExternalOrderId;
                $scope.ConsignmentWorkOrderStatus = response.data[0].ConsignmentWorkOrderStatus;
                $scope.ButtonText = "CREATING";                    
                $timeout(function(){
                   $scope.ButtonText = "CREATE";    
                   alert("Service is successfully assigned")                   
                 },1000)

                $http({
                  method: "GET", 
                  url: 'https://thworkorderfapp.azurewebsites.net/api/createworkorder',
                  params: {
                    name:""+$scope.name_id,
                    surname:""+$scope.surname_id,
                    phone:""+$scope.phone_id,
                    no:""+$scope.ExternalOrderId,
                    product:""+$scope.txtProductCode,
                    workorder:""+$scope.workorderSelect,
                    customer:"Test",
                    point:""+$scope.provinceSelect,
                    address:""+$scope.adres_id,
                    status: ""+$scope.ConsignmentWorkOrderStatus,
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

  


