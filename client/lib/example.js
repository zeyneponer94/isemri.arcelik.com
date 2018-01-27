    app = angular.module('myApp', ['ui.bootstrap'])
    app.controller('myController', function ($scope, $http,$q) {
        $scope.activation = true;  
        $scope.query = true;      
        
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/getProductList',           
        }) 
        .then(function(response){ 
            $scope.data = 
              [
                {name: ""+response.data[0]},
                {name: ""+response.data[1]}
              ];       
        });

        $scope.update = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTrigger_WorkOrderType',
            params: {name:$scope.singleSelect}          
          }) 
          .then(function(response){ 
              $scope.workordertype = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { name: response.data[i] };
                $scope.workordertype.push(obj);  
                i++;
              }
          });          
       }

       $scope.queryWorkOrder = function () {
         $scope.activation = false;
         $scope.activation_query=true;

         $http({
          method: "GET",        
          url: 'https://thworkorderfapp.azurewebsites.net/api/HttpTrigger_WorkOrderType', 
        }) 
        .then(function(response){ 
          alert(response.data.ProductName);          
        })
       .error(function (response) {
          $scope.data = response.data; 
        })

      }
      $scope.createWorkOrder = function () {
        $scope.activation = true;
        $scope.activation_query=false;
      }

    });
    app.controller('updatingDB', function ($scope, $http, $q) {
      $scope.customer = function () {
          $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/UpdatingDB', 
            params: {name:$scope.name_id, surname:$scope.surname_id, phone:$scope.phone_id, email:$scope.email_id}
          }) 
          .then(function(response){ 
            alert(1);
            $scope.data = response.data;
          })
         
      }
   });
   app.controller('DatepickerDemoCtrl', function ($scope) {
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
  
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  });

  app.controller('productInfo', function($scope, $http) {
    $http.get("customers.php")
    .then(function (response) {$scope.products = response.data.records;});
});