var testApp = angular.module("App", []);
testApp.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {

    $scope.submit = function (model) {    
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/systemlogin',             
            params: {username:$scope.username, password:$scope.password}
        }). 
        success(function(data, status) { 
            if(status == 200)
                $scope.login();
            else
                alert("There is no such user with given username and password!"); 
        }).
        error(function(data, status) {
            alert("Request failed");
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
}]);



