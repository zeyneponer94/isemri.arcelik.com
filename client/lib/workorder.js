    app = angular.module('App', [])
    app.controller('Controller', function ($scope, $http) {
        $scope.create = true;  
        $scope.query = false;      

        $scope.createWorkOrder = function () {
          $scope.create = true;
          $scope.query=false;
        }

        $scope.queryWorkOrder = function () {
          $scope.create = false;
          $scope.query=false;
       }
















       
        //connecting to azure db, getting required records from specified table and displaying them in selection list
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
        //when user selects a product from selection list, ng-change calls that function to get the work order types available for chosen product
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




    });
    app.controller('updatingDB', function ($scope, $http, $q) {
      $scope.customer = function () {        

        /*
        var file = new File([""],"/application/header.json");
        $http({
          method: 'POST',
          url: "https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc?wsdl",
          headers: { 'Content-Type': false },
          transformRequest: function (data) {
              var formData = new FormData();
              formData.append("myJsonFile",file);
              return formData;
          }
        }).
        success(function (data, status, headers, config) {
          alert("success!");
        }).
        error(function (data, status, headers, config) {
          alert("failed!");
        });*/

          // Post a user
          /*
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
          });*/

      /*

            var xhr = new XMLHttpRequest();
            xhr.open('POST','https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc?wsdl', true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            var file = new File([""],"/application/header.json");            
            var formData = new FormData();
            formData.append("myJsonFile",file);        
            xhr.send(formData);
            xhr.onload = function(e) {
              alert(request.status);
            };
*/
            
                    
        //makeRequest('test.php',$scope.name_id); 
        //sends customer info as parameter to check whether operating user exists or not. if not new customer is created.
        /*
          $http({
            method: "GET",        
            url: 'https://thworkorderfapp.azurewebsites.net/api/UpdatingDB', 
            params: {name:$scope.name_id, surname:$scope.surname_id, phone:$scope.phone_id, email:$scope.email_id}
          }) 
          .then(function(response){ 
            alert(1);
            $scope.data = response.data;
          })
         
    */
   /*
        Service = new ServicePaperService.ServicePaperServiceClient();
        Result() = ServicePaperService.ProductOrderOperationReponse;        
        using (new OperationContextScope(Service.InnerChannel))
        {
          requestMessage = new HttpRequestMessageProperty();  
          requestMessage.Method = "POST";          
          requestMessage.SuppressEntityBody = false;
          client.Headers[HttpRequestHeader.ContentType] = "application/json";          

          requestMessage.Headers["ServiceType"] = HttpContext.Current.Session("ServiceType");          
          requestMessage.Headers("Guld") = HttpContext.Current.Session("Guld").ToString();
          var response = client.UploadString(url, jsonObj);
          responseMessage = new HttpResponseMessageProperty();
          //convert json to xml
          header = MessageHeader.CreateHeader(
            "Service-Bound-CustomHeader",
            "https://yetkiliservis-test.arcelik.com/wsaftersales/ServicePaperService.svc?wsdl",
            "Custom Happy Value."
            );
          OperationContext.Current.OutgoingMessageHeaders.Add(header);          
          OperationContext.Current.OutgoingMessageProperties[HttpRequestMessageProperty.Name] = requestMessage;
          Result = Service.ProductOrderOperationService(Request);*/
        
        } 


   });
/*
   function makeRequest(url, userName) {
    
        httpRequest = new XMLHttpRequest();    
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('POST', url);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.send('userName=' + encodeURIComponent(userName));
    }



    function alertContents() {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          var response = JSON.parse(httpRequest.responseText);
          alert(response.computedString);
        } else {
          alert('There was a problem with the request.');
        }
      }
    }*/

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
