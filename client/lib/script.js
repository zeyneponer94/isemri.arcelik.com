var testApp = angular.module("testApp", []);
testApp.controller('testController' , function ($scope, $http, $window) {
    //$return dene!
    $scope.data = "not yet";    
    $scope.submit = function () {
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabse2', 
            params: {name:$scope.username_id, password:$scope.password_id}
       }) 
       .then(function(response){
            $scope.redirect(); 
        });
    } 

    $scope.redirect = function () {    
        var url = "https://localhost:1337/redirect.html";
        $window.location = url;
        /* 
        $http({method: 'GET', url: '/redirect'}).
        then(function(response) { 
          $scope.data = response.data; 
        });*/
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
 
});





