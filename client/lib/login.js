
testApp = angular.module("App", ['ui.bootstrap','dialogs.main','ngRoute','ngSanitize','ui.mask']);

testApp.factory('FactoryService', function ($http, sharedSession) {

    var service = {}
    service.product = function (Url,query) {
        //var GuId = parseLocation(window.location.search)['GUID'];
        var GuId = sharedSession.getSessionValue("GuId");
        var Request = {
            async: true,
            crossDomain: true,
            method: "GET", 
            url: Url +  query,
            headers: {            
            'Content-Type': 'application/json',
            'SessionToken': '' + GuId,
            'Cache-Control': 'no-cache',
            'servicetype': 'INTHEBOX1'
            }
        } 
        return $http(Request);
    }

    return service;

});
testApp.directive('ngEnter', function () { 
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
   };
})


testApp.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', 'FactoryService', 'sharedSession', function Controller($scope, $http, $window, $timeout, FactoryService, sharedSession) {
    $scope.ButtonText = "GİRİŞ";
    $scope.submit = function () { 
        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/GuId/' + $scope.username + '/' + $scope.password + '/1/1/1/1',
            method: "GET"
        }). 
        then(function(response) { 
            if(response.data[0].ErrorDescription !== null)
            {
                alert("Request failed");                
            }
            else
            {
                alert(response.data[0].Message[0].Description);
                $scope.GuId = response.data[0].GuId;
                $scope.ButtonText = "GİRİŞ YAPILIYOR";
                $timeout(function(){
                    $scope.ButtonText = "GİRİŞ";    
                    if(response.status == 200){

                        var url = "https://thworkorder.azurewebsites.net/workorder";
                        $window.location = url;
    
                       // $scope.login();
                    }
                },1000)  
            }
        });
    };       
                                         
$scope.login = function(){ 


        $scope.jsonData = {"SessionToken": ""+ GuId}
  
        $scope.postData = angular.toJson($scope.jsonData, true);     


        $http({
            url: '/workorder',
            method: "POST",
            data: $scope.postData
        }). 
        then(function(data, status) { 
            var url = "https://thworkorder.azurewebsites.net/workorder";
            $window.location = url;
        });
    }

$scope.okta = function()
    {
     /*   $http({method: 'GET', url: '/login'}).
        then(function(data, status) { 

        });*/
    }

    $scope.register = function()
    {
        $http({method: 'GET', url: '/register'}).
        then(function(data, status) { 
            var url = "https://thworkorder.azurewebsites.net/register";
            $window.location = url;
        });
    }

}]);


testApp.controller('workorder', ['$scope','$http','$window', '$timeout', 'FactoryService', 'sharedSession', function workorder($scope, $http, $window,dialogs,$sanitize,$timeout,$filter,FactoryService,sharedSession) {
    $scope.test="false";
    $scope.ButtonText = "İŞ EMRİ OLUŞTUR";        
    $scope.QueryText = "SORGULA";        
    $scope.DeleteText = "SİL";
    
    
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

    Url: 'https://thworkorderfapp.azurewebsites.net/product/';


    FactoryService.setTable(Url,query).then(function(response){ 

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
                'SessionToken': '',
                'Cache-Control': 'no-cache',
                'servicetype': 'INTHEBOX1'
                }
    })
    .then(function(response){ 
        alert(sharing.GuId);
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
            'SessionToken': '',
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
            'SessionToken': '',
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
        params: {name: "" + $scope.name_id_query,
                surname: "" + $scope.surname_id_query}          
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
        url: 'https://thworkorderfapp.azurewebsites.net/query/0/0/0/0/0/0/' + ServiceShopCode,
        headers: {            
        'SessionToken': '' + sharing.GuId
        }     
    }) 
    .then(function(response){
        if(response.data[0]==null)
            $scope.result = true;
        else
            $scope.result = false;       

        $scope.workorders = [];
        $scope.return_value = [];                    
        var i = 0;
        
        $scope.QueryText = "SORGULANIYOR";                                          
        $timeout(function(){

            $scope.QueryText = "SORGULA";  
            while(response.data[i]!=null){
            var obj = { 
                no: response.data[i].PackageNr,
                productCode : response.data[i].ProductCode,
                product:response.data[i].Product,
                customer: response.data[i].Name + " " + response.data[i].Surname ,
                address: response.data[i].Address,
                status: response.data[i].Status,
                AppointmentDate: response.data[i].AppointmentDate
            };
            $scope.workorders.push(obj);            
            i++; 
            }  

        },1000)


    });


    
    }


  $scope.logout = function() {
      var url = "https://thworkorder.azurewebsites.net";
      $window.location = url;
  }
  
  
  $scope.delete_query = function($index,x) {

    var dlg = dialogs.confirm("Lütfen Onaylayınız!","<br>"+ (x.no + "'lu iş emrini iptal etmek istediğinize emin misiniz?").italics());
    
              dlg.result.then(function(btn){
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
          $scope.showSpinning=$index;
          $scope.DeleteText = "SİLİNİYOR";                    
          $timeout(function(){
             $scope.DeleteText = "SİL";  
             $scope.sorgula(x);      
             alert("İş Emri Başararıyla İptal Edildi.");   
           },1000)

        });       
              },function(btn){
                  alert('İşlem Tamamlanamadı.');
    });""
    
  }

  $scope.sorgula = function(x) {
    $http({
      method: "GET",
      url: 'https://thworkorderfapp.azurewebsites.net/sorgula/' + x.no,
    }) 
    .then(function(response){ 
      $scope.ConsignmentWorkOrderStatus = response.data[0].Status; 
      if( x.status === $scope.ConsignmentWorkOrderStatus)
        alert("İşlem Durumu Günceldir.")
      else{
        x.status = $scope.ConsignmentWorkOrderStatus;
        alert("İşlem Durumu Başarıyla Güncellendi.")
      }
     
      $http({
        method: "GET", 
        url: 'https://thworkorderfapp.azurewebsites.net/api/updateworkorder',
        params: {
          no: ""+x.no,
          status: ""+$scope.ConsignmentWorkOrderStatus
        }          
      }) 
      .then(function(response){ 
      });  
    });     

  }

  $scope.ButtonText = "İŞ EMRİ OLUŞTUR";
  
  $scope.create_workorder = function () 
  {       
    var dlg = dialogs.confirm("Lütfen Onaylayınız!","Aşağıda belirtilen bilgiler ile iş emri oluşturma talebinizi gerçekleştirmeyi onaylıyor musunuz?".bold()+"<br>"+ ("  Müşteri adı = "+$scope.name_id+"<br>  Müşteri soyadı = "
    +$scope.surname_id+"<br>  Müşteri telefon numarası = "+$scope.phonenumber_3+"<br>  Seçilen ürün = "+$scope.txtProductCode+"<br>  Seçilen iş emri türü = "
    +$scope.workorderSelect+"<br> Müşteri adresi = " + $scope.adres_id).italics());
              dlg.result.then(function(btn){
      $scope.ButtonText = "İŞ EMRİ OLUŞTURULUYOR";
      
      $scope.dateVal = $filter('date')(new Date(), 'ss/MM/yyyy HH:mm:ss');
      
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
      "Phone1": "" + $scope.phonenumber_3,
      "Phone2": "" + $scope.phonenumber_1,
      "Phone3": "" + $scope.phonenumber_2,
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
      "DeliveryDate": "" +  $scope.dateVal,
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
                  "ProductCode": "" + $scope.txtProductCode,
                  "Product": "ARY-5500 E ÇAMAŞIR MAK.(Y-326) ÇİFT",
                  "OperationType": "" + $scope.workorderSelect,
                  "ProductReturnCheck": "0",
                  "ExtraWarrantyType": "1",
                  "ProductExposeCheck": "0",
                  "SourceOrderStatus": "Approve",
                  "ProductBarcode": "1",
                  "DetailNote": "" + $scope.isemri_notu,
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
          $scope.ButtonText = "İŞ EMRİ OLUŞTURULUYOR";                    
          $timeout(function(){
             $scope.ButtonText = "İŞ EMRİ OLUŞTUR";    
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
}]);




