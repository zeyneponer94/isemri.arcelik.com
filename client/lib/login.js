var testApp = angular.module("App", []);

testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', function ($scope, $http, $window, $timeout) {
    $scope.ButtonText = "GİRİŞ";
    $scope.submit = function () {

        $scope.jsonData = {
            "profile": {
              "firstName": "Isaac",
              "lastName": "Brock",
              "email": "" + $scope.username,
              "login": "" + $scope.username,
              "mobilePhone": "555-415-1337"
            },
            "credentials": {
              "password" : { "value": "" + $scope.password }
            }
          }
  
          $scope.postData = angular.toJson($scope.jsonData, true);   


        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/okta_create',
            method: "POST",
            data: $scope.postData ,
            headers: {            
                'Accept': 'application/json',                
                'Content-Type': 'application/json',
                'Authorization': 'SSWS 00mhP-hnbCzY-FtzKnlls8zQqkdEn-0rlYwdTAvSke'
            }
        }) 
        .then(function(response){ 
            alert(response.profile.firstName);
        }); 
        
        /*
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
        });*/
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



