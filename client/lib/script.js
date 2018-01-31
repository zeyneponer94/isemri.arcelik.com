var testApp = angular.module("testApp", []);
testApp.controller('testController' , function ($scope, $http, $window) {
    //$return dene!
    $scope.submit = function () {



        var file = new File([""],"/application/header.json");                      
        var formData = new FormData();
        formData.append("myJsonFile",file);    

        fetch('https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc?wsdl', {
          method:'POST',
          body:formData   
        }).then(function(res) {
          alert(res);
        }).catch(function(e) {
          alert(e);
        });
    }

        /*
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTriggerSqlDatabse2', 
            params: {name:$scope.username_id, password:$scope.password_id}
       }) 
       .then(function(response){
            $scope.redirect();
        });
    } 

    $scope.redirect = function(){ 
        $http({method: 'GET', url: '/workorder'}).
            success(function(data, status) { 
              $scope.dataset = data; 
            }).
            error(function(data, status) {
              $scope.dataset = data || "Request failed "; 
        });
    }*/
    
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





