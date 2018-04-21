var testApp = angular.module("App", ['ngRoute']);
testApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
          template: 'This is protected main view.',
          templateUrl: 'views/login_page.html',
          controller: 'Controller'
        })
        .when('/login', {
          template: '',
          templateUrl: 'views/create_workorder.html',
          controller: 'LoginCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  });
testApp.controller('LoginCtrl', function ($scope, Auth, $location, $http) {
    $scope.user = {};
  
    $scope.login = function () {
      Auth.login($scope.user, function () {
        $location.path('/');
      }, function (e) {
        // do some error handling.
      });
    };
  });

testApp.factory('Auth', function ($rootScope, $window, $http) {
    return {
      login: function (user, successHandler, errorHandler) {
        if (user.username == 'test' && user.password == 'test') { //request yolla
          this.setLoggedInUser(user);
          successHandler(user);
        } else {
          errorHandler(user);
        }
      },
      getLoggedInUser: function () {
        if ($rootScope.user === undefined || $rootScope.user == null) {
          var userStr = $window.sessionStorage.getItem('user');
          if (userStr) {
            $rootScope.user = angular.fromJson(userStr);
          }
        }
        return $rootScope.user;
      },
      isLoggedIn: function () {
        return this.getLoggedInUser() != null;
      },
      setLoggedInUser: function (user) {
        $rootScope.user = user;
        if (user == null) {
          $window.sessionStorage.removeItem('user');
        } else {
          $window.sessionStorage.setItem('user', angular.toJson($rootScope.user));
        }
      }
    };
  });
  
testApp.controller('Controller' , ['$scope','$http','$window', '$timeout', function ($scope, $http, $window, $timeout, Auth, $location) {
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

testApp.run(['$window', '$rootScope', '$location', 'Auth', function ($window, $rootScope, $location, Auth) {
    
        $rootScope.$on("$routeChangeStart", function (event) {
          if (!Auth.isLoggedIn() &&
              $location.path() !== '/login') {
            $location.path('/login');
          }
        });
    }]);
    



