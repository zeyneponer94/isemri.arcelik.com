var testApp = angular.module("App", []);
/*
testApp.config(function(captchaSettingsProvider) {
    captchaSettingsProvider.setSettings({
      captchaEndpoint: 'https://thworkorderfapp.azurewebsites.net/captchaEndpoint'
    });
  });
  
  testApp.controller('BasicController', function($scope, $http, Captcha) {
  
    // captcha validation messages
    $scope.successMessages = '';
    $scope.errorMessages = '';
    
    // basic captcha url
    var basicUrl = 'https://thworkorderfapp.azurewebsites.net/botdetect';
    

    $scope.validate = function() {
  
      
      // after UI form validation passed, 
      // we will need to validate captcha at server-side once before we save form data in database, etc.
      
      // create new BotDetect Captcha instance
      var captcha = new Captcha();
      
      // captcha id for validating captcha at server-side
      var captchaId = captcha.captchaId;
      
      // captcha code input value for validating captcha at server-side
      var captchaCode = $scope.captchaCode;
  
      var postData = {
        captchaId: captchaId,
        captchaCode: captchaCode
      };
      
      $http({
        method: 'POST',
        url: basicUrl,
        data: JSON.stringify(postData)
      })
        .then(function(response) {
          if (response.data.success) {
            // captcha validation passed at server-side
            $scope.successMessages = 'CAPTCHA validation passed.';
            $scope.errorMessages = null;
          } else {
            // captcha validation falied at server-side
            $scope.errorMessages = 'CAPTCHA validation falied.';
            $scope.successMessages = null;
          }
          
          // always reload captcha image after validating captcha at server-side 
          // in order to update new captcha code for current captcha id
          captcha.reloadImage();
        }, function(error) {
          console.log(error.data);
        });
    };
     
  });
*/

testApp.controller('Controller' , ['$scope','$http','$window', function ($scope, $http, $window) {

   

    $scope.submit = function () {    


        $http({method: 'POST', url: '/submit'}).
        success(function(data, status) { 
            alert(data);
        }).
        error(function(data, status) {
            alert(data);
        }); 
 /*       
        $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/systemlogin',             
            params: {username:$scope.username, password:$scope.password}
        }). 
        success(function(data, status) { 
            alert(data)
            if(status == 200){
                $scope.login();
            }
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



