app.controller('kontroler', function($scope, $routeParams, $http, $rootScope, $timeout, $location,$window, webservice, $http){
  	document.body.addEventListener("wheel", e=>{
      if(e.ctrlKey)
        event.preventDefault();//prevent zoom
    });
  
  	$scope.templateUrl = '/pages/postovi/'+$routeParams.postID;
  	$scope.klikID = $routeParams.klikID;
 
    $scope.initLoader = function() {
        angular.element(document.getElementsByClassName("CardLK")).css('display','none');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','block');
    }
    
    $scope.finishLoad = function() {
      	angular.element(document.getElementsByClassName("CardLK")).css('display','inline-flex');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','none');
    }
    
    $http({
      method: 'get',
      url: 'getPost.php'
    }).then(function successCallback(response) {
      $scope.postovi = response.data;
    });
  
    $http({
      method: 'get',
      url: 'topPost.php'
    }).then(function successCallback(rezultat) {
      $scope.topPostovi = rezultat.data;
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
    
    $scope.kaFejsu = function() {
       $window.open('https://www.facebook.com/pages/category/Health---Wellness-Website/Nasa-Mala-Praksa-567480650330734/', '_blank');
	};
    
});