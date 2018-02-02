    app = angular.module('App', [])
    app.controller('Controller', function ($scope, $http) {
        $scope.create = true;  
        $scope.query = false;      

        //connecting to azure db, getting required records from specified table and displaying them in selection list
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/productlist',           
        }) 
        .then(function(response){ 
          $scope.product = [];                    
          var i = 0;
          while(response.data[i]!=null)
          {
            var obj = { name: response.data[i] };
            $scope.product.push(obj);  
            i++;
          }
        });

        $scope.createWorkOrder = function () {
          $scope.create = true;
          $scope.query=false;
        }

        $scope.queryWorkOrder = function () {
          $scope.create = false;
          $scope.query=false;
       }


        //when user selects a product from selection list, ng-change calls that function to get the work order types available for chosen product
        $scope.choose_workordertype = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/workordertypelist',
            params: {productname:$scope.singleSelect}          
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




    });
    app.controller('updatingDB', function ($scope, $http, $q) {
      $scope.customer = function () {        




        } 


   });
