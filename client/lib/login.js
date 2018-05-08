
var app = angular.module("App", ['ui.bootstrap','dialogs.main','ngSanitize','ui.mask', 'ngRoute','ngCookies']);

app.directive('ngEnter', function () { 
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
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

app.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {
 /*            $scope.GuId = '';
            $scope.ButtonText = "GİRİŞ";

            $scope.submit = function (page) { 
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
                        $scope.ButtonText = "GİRİŞ YAPILIYOR";
                        $timeout(function(){
                            $scope.ButtonText = "GİRİŞ";    
                            if(response.status == 200){
                                $http({method: 'GET', url: '/workorder'}).
                                then(function(data, status) { 
                                    var url = "https://thworkorder.azurewebsites.net/workorder";
                                    $window.location = url;         
                                });
                            // $scope.login();
                            }
                        },1000)  
                    }
                });
            };       
 */
 /*                                                
            $scope.login = function(){ 


                $scope.jsonData = {"SessionToken": ""+ GuId}
        
                //$scope.postData = angular.toJson($scope.jsonData, true);     


                $http({
                    url: '/workorder',
                    method: "POST",
                    data: $scope.jsonData
                }). 
                then(function(data, status) { 
                    var url = "https://thworkorder.azurewebsites.net/workorder";
                    $window.location = url;
                });
            }
 */

            $scope.okta = function()
            {
                $http({
                    url: 'https://thworkorderfapp.azurewebsites.net/login',
                    method: "GET"
                }). 
                then(function(response) { 

                    var url = "https://thworkorder.azurewebsites.net/login";
                    $window.location = url;

                });    
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


app.controller('workorder', ['$scope','$http','$window', 'dialogs','$sanitize','$timeout','$filter','$cookies', function ($scope, $http, $window,dialogs,$sanitize,$timeout,$filter,$cookies) {

            //$scope.cookieValue = $cookies.get('user');

            $http({
                method: "GET", 
                url: 'https://thworkorderfapp.azurewebsites.net/bayikodu/w40040.5@arcelik.com',
                headers: {            
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'SSWS 00mhP-hnbCzY-FtzKnlls8zQqkdEn-0rlYwdTAvSke'
                }
            }) 
            .then(function(response){ 
                $scope.dealerID = response.data.profile.dealerID;    
            });   

            
            $http({
                url: 'https://thworkorderfapp.azurewebsites.net/GuId/C9003074/lG75bktu/1/1/1/1',
                method: "GET"
            }). 
            then(function(response) { 
                if(response.data[0].ErrorDescription !== null)
                {
                    alert("Request failed");                
                }
                else 
                {
                    $scope.GuId = response.data[0].GuId;  
                }
            });
    
            $scope.test="false";
            $scope.ButtonText = "İŞ EMRİ OLUŞTUR";        
            $scope.QueryText = "SORGULA";        
            $scope.DeleteText = "İPTAL";
            
            
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
                'SessionToken': '' + $scope.GuId ,
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
                url: 'https://thworkorderfapp.azurewebsites.net/Uavt_province',
                method: "GET"
         /*       headers: {            
                        'Content-Type': 'application/json',
                        'SessionToken': '' + $scope.GuId,
                        'Cache-Control': 'no-cache',
                        'servicetype': 'INTHEBOX1'
                        }*/
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
                url: 'https://thworkorderfapp.azurewebsites.net/Uavt_city/' + $scope.provinceSelect + '/0/0'
         /*       headers: {            
                    'Content-Type': 'application/json',
                    'SessionToken': '' + $scope.GuId,
                    'Cache-Control': 'no-cache',
                    'servicetype': 'INTHEBOX1'
                }*/
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
                url: 'https://thworkorderfapp.azurewebsites.net/Uavt_area/' + $scope.provinceSelect + '/' + $scope.citySelect + '/0'
          /*      headers: {            
                    'Content-Type': 'application/json',
                    'SessionToken': '' + $scope.GuId,
                    'Cache-Control': 'no-cache',
                    'servicetype': 'INTHEBOX1'
                }*/
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

            $scope.SearchText = "ARA";  
        

            $scope.query_workorder = function () {

                $http({
                    method: "GET", 
                    url: 'https://thworkorderfapp.azurewebsites.net/query/' + $scope.phone_id_query + '/' +  $scope.name_id_query + '/' +  $scope.surname_id_query + '/0/0/0/' + $scope.dealerID,
                    headers: {            
                    'SessionToken': '' + $scope.GuId
                    }     
                }) 
                .then(function(response){


                    $scope.SearchText = "ARIYOR";                    
                    $timeout(function(){
                        $scope.SearchText = "ARA";  

                        if(response.data[0]==null)
                            $scope.result = true;
                        else
                            $scope.result = false;       

                        $scope.workorders = [];
                        $scope.return_value = [];                    
                        var i = 0;
                        
                        while(response.data[i]!=null){
                            var obj = { 
                                no: response.data[i].PackageNr,
                                ServiceShopCode : response.data[i].ServiceShopCode,
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
 /*
            $scope.query_all = function () {
            $http({
                method: "GET", 
                url: 'https://thworkorderfapp.azurewebsites.net/query/0/0/0/0/0/0/' + $scope.ServiceShopCode,
                headers: {            
                'SessionToken': '' + $scope.GuId
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


            
            }*/


        $scope.logout = function() {
                $scope.SessionId = $cookies.get('sessionID');

                alert($scope.SessionId);
    
                $http({
                    method: "DELETE", 
                    url: 'https://thworkorderfapp.azurewebsites.net/delete_session/' + $scope.SessionId,
                    headers: {            
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'SSWS 00mhP-hnbCzY-FtzKnlls8zQqkdEn-0rlYwdTAvSke'
                    }
                }) 
                .then(function(response){ 
                    alert(response);
                    $http({
                        url: 'https://thworkorderfapp.azurewebsites.net/login',
                        method: "GET"
                    }). 
                    then(function(response) { 
        
                        var url = "https://thworkorder.azurewebsites.net/login";
                        $window.location = url;
                    });    
                }, function(error){
                    alert(error);

                    $http({
                        url: 'https://thworkorderfapp.azurewebsites.net/login',
                        method: "GET"
                    }). 
                    then(function(response) { 
        
                        var url = "https://thworkorder.azurewebsites.net/login";
                        $window.location = url;
                    });    

                });                                               
                  
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
                $scope.DeleteText = "İPTAL EDİLİYOR";                    
                $timeout(function(){
                    $scope.DeleteText = "İPTAL";  
                    $scope.sorgula(x);      
                    alert("İş Emri Başararıyla İptal Edildi.");   
                },1000)

                });       
                    },function(btn){
                        alert('İşlem Tamamlanamadı.');
            });
            
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

            $http({
                async: true,
                crossDomain: true,
                method: "GET", 
                url: 'https://thworkorderfapp.azurewebsites.net/product/' +  $scope.txtProductCode,
                headers: {            
                'Content-Type': 'application/json',
                'SessionToken': '' + $scope.GuId ,
                'Cache-Control': 'no-cache',
                'servicetype': 'INTHEBOX1'
                } 
            }) 
            .then(function(response){ 
                $scope.description =  response.data[0].ProductDescription;
            });   

            
            $scope.dateVal = $filter('date')(new Date(), 'ss/MM/yyyy HH:mm:ss');

            if(angular.isDefined($scope.phonenumber_2)) $scope.phonenumber_2 = "";
            if(!angular.isDefined($scope.phonenumber_1)) $scope.phonenumber_1 = "";
            if(!angular.isDefined($scope.satis_id)) $scope.satis_id = "";
            if(!angular.isDefined($scope.satis_phone_id)) $scope.satis_phone_id = "";
            if(!angular.isDefined($scope.isemri_notu)) $scope.isemri_notu = "";
            
            $scope.jsonData =
            
            [
                {
                  "MainSourceApplicationProcces": "InnTheBox",
                  "SourceApplication": "InnTheBox",
                  "MainSourceProccesStatus": "100",
                  "SourceStatus": "100",
                  "DealerCode": "" + $scope.dealerID,
                  "Note": "" +  $scope.isemri_notu,
                  "Name": "" + $scope.name_id,
                  "Surname": "" + $scope.surname_id,
                  "Phone1": "" + $scope.phonenumber_3,
                  "Phone2": "" + $scope.phonenumber_2,
                  "Phone3": "" + $scope.phonenumber_1,
                  "Email": ""+ $scope.email_id,
                  "Address": "" + $scope.adres_id,
                  "Neighborhood": "" + $scope.areaSelect,
                  "District": "" + $scope.citySelect,
                  "City": "" + $scope.provinceSelect,
                  "Urgent": "0",
                  "ContactPerson": "" + $scope.satis_id,
                  "ContactPhone": "" + $scope.satis_phone_id,
                  "DeliveryDate": "" + $scope.dateVal,
                  "InvoiceAcceptPhone": "" + $scope.phonenumber_3,
                  "InvoiceAcceptName": "" + $scope.name_id,
                  "InvoiceAcceptSurname": "" + $scope.surname_id,
                  "ProductOrderDetail": [
                    {
                      "ConsignmentId": "1",
                      "MainSourceOrderProcessStatus": "100",
                      "WareHouseType": "1",
                      "ProductCode": "" + $scope.txtProductCode,
                      "Product": "" + $scope.description, 
                      "OperationType": "" + $scope.workorderSelect,
                      "SourceOrderStatus": "100",
                      "DetailNote": "" +  $scope.isemri_notu
                    }
                  ]
                }
              ]
            
        
                        
 

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

                $scope.ButtonText = "İŞ EMRİ OLUŞTURULUYOR";                    
                $timeout(function(){
                    $scope.ButtonText = "İŞ EMRİ OLUŞTUR";    
                },1000)

                if(response.data[0].ErrorCode != "0")
                {
                    alert(response.data[0].ErrorDescription);

                }

                else
                {
                    $scope.ExternalOrderId = response.data[0].ExternalOrderId;
                    $scope.ConsignmentWorkOrderStatus = response.data[0].ConsignmentWorkOrderStatus;
                    alert("Servis başarıyla oluşturuldu. Oluşturulan paket numaranız: " + $scope.ExternalOrderId) + " Servis Numaranız: " + response.data[0].ServiceShopCode;                      

                }

            });
            },function(btn){
                alert('İşlem Tamamlanamadı.');
            });
        } 
    
}]);




