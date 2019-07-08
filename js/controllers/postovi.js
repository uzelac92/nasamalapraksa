app.controller('mainCtrl', function($scope, $routeParams, $http, $rootScope, $timeout, $location,$window, webservice){
  	document.body.addEventListener("wheel", e=>{
      if(e.ctrlKey)
        event.preventDefault();//prevent zoom
    });
  
  	$scope.templateUrl = $routeParams.postID;
  	$scope.klikID = $routeParams.klikID;
 
    $scope.initLoader = function() {
        angular.element(document.getElementsByClassName("CardLK")).css('display','none');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','block');
    }
    
    $scope.finishLoad = function() {
      	angular.element(document.getElementsByClassName("CardLK")).css('display','inline-flex');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','none');
    }

    webservice.getPosts().then(function (response) {
        if (response.statusText == "OK") {
            $scope.postovi = response.data.records;
            $scope.topPostovi = $scope.postovi.sort((a,b) => (a.KLIK > b.KLIK) ? -1 : ((b.KLIK > a.KLIK) ? 1 : 0));
        } else {
          alert('Baza trenutno van funkcije!');
        }
    });
  
    $scope.kliknuto = function() {

      $http({
        method: "post",
        url: "updatePost.php",
        data: { klikID: $scope.klikID
        }, headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).then(function successCallback(response) {
        $scope.prikazi = response.data[0];
      });

    }
    
    $scope.limit= 12;
    $scope.loadMore = function() {
      $scope.limit = $scope.limit + 6;
    }
    
    $scope.sakriveno = function() {
      angular.element(document.querySelector("#aboutID")).css('display', 'none');
      angular.element(document.querySelector("#navPost")).css('display', 'flex');
    }
    $scope.pokazano = function() {
      angular.element(document.querySelector("#aboutID")).css('display', 'inline-flex');
      angular.element(document.querySelector("#navPost")).css('display', 'none');
    }
    
});