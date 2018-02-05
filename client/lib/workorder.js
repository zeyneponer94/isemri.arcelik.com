angular.module('App', ['ngAnimate','ngRoute', 'ui.bootstrap']);
  /*  .factory('modalService', ['$uibModal', function ($uibModal) {
            var self = this;
            var modalInstance = null;
            self.open = function (scope, path) {
                modalInstance = $uibModal.open({
                    templateUrl: path,
                    scope: scope
                });
            };
    
            self.close = function () {
                modalInstance.dismiss('close');
            };
            return self;
            }
    ]) */
    angular.module('App').controller('Controller', function ($scope, $http, $window,$uibModal, $log) {
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

        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/provincelist',           
        }) 
        .then(function(response){ 
          $scope.province = [];                    
          var i = 0;
          while(response.data[i]!=null)
          {
            var obj = { name: response.data[i] };
            $scope.province.push(obj);  
            i++;
          }
        });

        var header = document.getElementById("navbarid");
        var bars = header.getElementsByClassName("navbar");
        for (var i = 0; i < bars.length; i++) {
          bars[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
          });
        }   

        $scope.isActive = function (viewLocation) {
          var active = (viewLocation === $location.path());
          return active;
        };

        $scope.createWorkOrder = function () {
          $scope.create = true;
          $scope.query=false;
        }

        $scope.queryWorkOrder = function () {
          $scope.create = false;
          $scope.query=true;
          $scope.result=true;
       }

       $scope.query_workorder = function () {
        $http({
          method: "GET", 
          url: 'https://thworkorderfapp.azurewebsites.net/api/workorderlist',
          params: {name:$scope.name_id_query,
                   surname:$scope.surname_id_query}          
        }) 
        .then(function(response){ 
            $scope.result = false;       
            $scope.workorders = [];
            var i = 0;
            while(response.data[i]!=null){
                      var obj = { 
                            no: response.data[i][3],
                            product:response.data[i][4],
                            type: response.data[i][5],
                            customer: response.data[i][6],
                            point: response.data[i][7],
                            address: response.data[i][8],
                            status: response.data[i][9],
                            service: response.data[i][10],
                            DeliveryDate: response.data[i][11],
                            AppointmentDate: response.data[i][12]
                      };
                $scope.workorders.push(obj);         
                i++;
            }
        });
        
      }


        //when user selects a product from selection list, ng-change calls that function to get the work order types available for chosen product
        $scope.choose_workordertype = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/workordertype',
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

        $scope.choose_city = function() {
          $http({
            method: "GET", 
            url: 'https://thworkorderfapp.azurewebsites.net/api/citytype',
            params: {province:$scope.provinceSelect}          
          }) 
          .then(function(response){ 
              $scope.city = [];                    
              var i = 0;
              while(response.data[i]!=null){
                var obj = { name: response.data[i] };
                $scope.city.push(obj);  
                i++;
              }
          });          
        }


        $scope.create_workorder = function () 
        {       

          var txt;
          var r = confirm("Aşağıda belirtilen bilgiler ile iş emri oluşturma talebinizi gerçekleştirmeyi onaylıyor musunuz?\n\Müşteri adı = "+$scope.name_id+"\n\Müşteri soyadı = "
          +$scope.surname_id+"\n\Müşteri telefon numarası = "+$scope.phone_id+"\n\Seçilen ürün = "+$scope.singleSelect+"\n\Seçilen iş emri türü = "
          +$scope.workorderSelect+"\n\Müşteri adresi = " + $scope.provinceSelect + " " +$scope.citySelect);
          if (r == true) {
            $http({
              method: "GET", 
              url: 'https://thworkorderfapp.azurewebsites.net/api/createworkorder',
              params: {
                name:$scope.name_id,
                surname:$scope.surname_id,
                phone:$scope.phone_id,
                no:"Test",
                product:$scope.singleSelect,
                workorder:$scope.workorderSelect,
                customer:"Test",
                point:$scope.provinceSelect,
                address:$scope.citySelect,
                status:"Active",
                service:"Test",
                DeliveryDate:"2018-02-10",
                AppointmentDate:"2018-02-15"
              }          
            }) 
            .then(function(response){             
            });

          } else {
            alert("İşlem Tamamlanamadı!");
          }
        } 

        $scope.openModal=function(){
          modalService.open($scope,'index2.html');
        };
         
         $scope.closeModal=function(){
            modalService.close();
          //do something on modal close
        };




    });
  


