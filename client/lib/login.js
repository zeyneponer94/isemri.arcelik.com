var testApp = angular.module("App", []);
testApp.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {

    
    $http({method: 'GET', url: 'https://thworkorderfapp.azurewebsites.net/deneme'}).
    success(function(data, status) { 
        alert(data);
    }).
    error(function(data, status) {
        alert(data);
    });

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



