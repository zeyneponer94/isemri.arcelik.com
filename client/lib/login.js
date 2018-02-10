var testApp = angular.module("App", []);
testApp.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {

        var data = {
            "PK": "3",
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
            "Name": "Zeynep",
            "Surname": "Öner",
            "Phone1": "5373579059",
            "Phone2": "2163964187",
            "Phone3": "",
            "Email": "zeynep_oner@arcelik.com",
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
            "ProductOrderDetail": 
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
                "Product": "sdfsfsdf",
                "OperationType": "",
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
                }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', "https://thworkorderfapp.azurewebsites.net/myproxy", true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.setRequestHeader("SessionToken", "346719C1-5134-4F04-816E-D1095485E41A");
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("servicetype", "INTHEBOX1");        
        xhr.onreadystatechange = function () {
            if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                alert(xhr.responseText);
            }
            else    
                alert("fail");
        };
        xhr.send(JSON.parse(data));


    $scope.submit = function (model) {    
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/systemlogin',             
            params: {username:$scope.username, password:$scope.password}
        }). 
        success(function(data, status) { 
            alert(data)
            if(status == 200)
                $scope.login();
        }).
        error(function(data, status) {
            alert(data);
        });
    };       
                                                                            
    $scope.login = function(){ 
        $http({method: 'GET', url: '/workorder'}).
            success(function(data, status) { 
                var url = "https://thworkorder.azurewebsites.net/workorder";
                $window.location = url;
            }).
            error(function(data, status) {
                alert("Request failed");
        });
    }

    $scope.register = function()
    {
        $http({method: 'GET', url: '/register'}).
        success(function(data, status) { 
            var url = "https://thworkorder.azurewebsites.net/register";
            $window.location = url;
        }).
        error(function(data, status) {
            alert("Request failed");
        });
    }

}]);



