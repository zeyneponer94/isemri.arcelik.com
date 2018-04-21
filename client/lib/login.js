var testApp = angular.module("App", []);

testApp.service('SessionService', function(){
    var userIsAuthenticated = false;

    this.setUserAuthenticated = function(value){
        userIsAuthenticated = value;
    };

    this.getUserAuthenticated = function(){
        return userIsAuthenticated;
    };
});

window.routes =
{
    "/": {
        templateUrl: 'views/login_page.html', 
        controller: 'Controller', 
        requireLogin: false
},
    "/workorder": {
        templateUrl: 'views/create_workorder.html', 
        controller: 'Workorder', 
        requireLogin: true
    }
};


testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', function ($scope, $http, $window, $timeout) {
    $scope.ButtonText = "GİRİŞ";
    $scope.GuId = "";
    $scope.submit = function () { 
        $http({
            url: 'https://thworkorderfapp.azurewebsites.net/GuId/' + $scope.username + '/' + $scope.password + '/1/1/1/1',
            method: "GET"
        }) 
        success(function(data, status) { 
            alert(data[0].Message[0].Description);
            $scope.GuId = data[0].GuId;
        }).
        error(function(data, status) {
            alert("Request failed");
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



