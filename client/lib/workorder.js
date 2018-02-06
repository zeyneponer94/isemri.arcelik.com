angular.module('App', ['ui.bootstrap','dialogs.main']);
    angular.module('App').controller('Controller', function ($scope, $http, $window,dialogs) {
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
          
          var dlg = dialogs.confirm("Lütfen Onaylayınız!","Aşağıda belirtilen bilgiler ile iş emri oluşturma talebinizi gerçekleştirmeyi onaylıyor musunuz?".bold()+"<br>"+ ("  Müşteri adı = "+$scope.name_id+"<br>  Müşteri soyadı = "
          +$scope.surname_id+"<br>  Müşteri telefon numarası = "+$scope.phone_id+"<br>  Seçilen ürün = "+$scope.singleSelect+"<br>  Seçilen iş emri türü = "
          +$scope.workorderSelect+"<br> Müşteri adresi = " + $scope.provinceSelect + " " +$scope.citySelect).italics());

					dlg.result.then(function(btn){

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

                $scope.files = [];                
                $scope.files.push("body.json");   
                $scope.jsonData = {  
                  name: "Jignesh Trivedi",  
                  comments: "Multiple upload files"  
                };                

                  $http({
                    url: 'http://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc/ProductOrderOperationService',
                    method: "POST",
                    transformRequest: function (data) {  
                        var formData = new FormData();  
                        formData.append("model", angular.toJson(data.model));  
                        for (var i = 0; i < data.files.length; i++) {  
                            formData.append("file" + i, data.files[i]);  
                        }  
                        return formData;  
                    },  
                    data: { model: $scope.jsonData, files: $scope.files },
                    headers: {'Content-Type': 'application/x-www-form-urlencoded',
                              'SessionToken': '4737B2FC-DE66-4741-B7A8-07646813D890',
                              'cache-control': 'no-cache',
                              'postman-token': '2b8add1e-b889-015c-f9e5-59a447df9711',
                              'servicetype': 'INTHEBOX1'
                             }
                  }).then(function (data, status, headers, config) {
                        alert(data);
                  }).error(function (data, status, headers, config) {
                        alert(status);
                  });

					},function(btn){
					    alert('İşlem Tamamlanamadı.');
					});
        } 



    });
  


