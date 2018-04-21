
var testApp = angular.module("App", []);

testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', function ($scope, $http, $window, $timeout) {
    $scope.ButtonText = "GİRİŞ";
    var GuId = "";
    $scope.submit = function () { 
        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/GuId/' + $scope.username + '/' + $scope.password + '/1/1/1/1',
            method: "GET"
        }). 
        success(function(data, status) { 
            if(data[0].ErrorDescription !== null)
            {
                alert("Request failed");                
            }
            else
            {
                alert(data[0].Message[0].Description);
                GuId = data[0].GuId
                $scope.ButtonText = "GİRİŞ YAPILIYOR";
                $timeout(function(){
                    $scope.ButtonText = "GİRİŞ";    
                    if(status == 200){
                        $scope.login();
                    }
                },1000)  
            }
        }).
        error(function(data, status) {
            alert("Request failed");
        });
    };       
                                         
    $scope.login = function(){ 

        $scope.jsonData = [{"SessionToken": "" + GuId}]
        
        $http({
            url: '/workorder',
            method: 'POST',
            body: JSON.stringify($scope.jsonData),
            headers: {'Content-Type': 'application/json'}            
        }). 
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



