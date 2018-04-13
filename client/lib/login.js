var testApp = angular.module("App", []);

testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', function ($scope, $http, $window, $timeout) {
    $scope.ButtonText = "GİRİŞ";
    $scope.submit = function () {    
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/systemlogin',             
            params: {username:$scope.username, password:$scope.password}
        }). 
        success(function(data, status) { 
            $scope.ButtonText = "GİRİŞ YAPILIYOR";
            $timeout(function(){
                $scope.ButtonText = "GİRİŞ";    
                if(status == 200){
                    $scope.login();
                }
            },1000)            
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



