var testApp = angular.module("App", []);
testApp.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {

    $scope.submit = function () {
        $http({
            method: "POST",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/systemlogin', 
            params: {name:$scope.username, password:$scope.password}
       }) 
       .then(function(response){
            $scope.login();
        });
    } 
                                                                            
    $scope.login = function(){ 
        $http({method: 'GET', url: '/workorder'}).
            success(function(data, status) { 
            }).
            error(function(data, status) {
                alert("Request failed");
        });
    }
    
    
/*    
    $scope.accessDatabase = function () {
       $http({
             method: "GET",        
             url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabase', 
             params: {name:$scope.username_id, password:$scope.password_id}
        }) 
        .then(function(response){ 
            $scope.data = response.data;
            var url = "http://10.134.51.93:8080/redirect.html";
            $window.location = url;
         })
        .error(function (response) {
            $scope.data = response.data; 
        });
    }*/


/*
        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabase', 
             method: "GET",
            params: {username: '',
                     password: ''
                    }
        }) 
        .then(function(response){
            $scope.data = response.data;
         })
        .error(function (data, status, headers, config) {
        });*/
 
}]);





