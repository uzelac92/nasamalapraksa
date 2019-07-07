var app = angular.module('NasaMalaPraksa', ['ngRoute','ngAnimate','updateMeta']);

app.config(['$routeProvider', '$locationProvider','$compileProvider',function($routeProvider, $locationProvider, $compileProvider) {
  	$locationProvider.html5Mode(true);
	$locationProvider.hashPrefix('!');
    $routeProvider
    .when("/", 
    {
        title: 'Pocetna',
        templateUrl : "/pages/kartice.html",
        controller: 'kontroler'
    })
  	.when("/defaultsite", 
    {
        title: 'Pocetna',
        templateUrl : "/pages/kartice.html",
        controller: 'kontroler'
    })
  	.when("/mitovi", 
    {
        title: 'Mitovi',
        templateUrl : "/pages/Mitovi.html",
        controller: 'kontroler'
    })
    .when("/post/:postID/:klikID", 
    {
        title: 'Post',
        templateUrl: '/pages/post.html',
        controller: 'kontroler'
    })
    .otherwise({
        redirectTo: '/'
     });
     
}]);

app.controller('kontroler', ['$scope', '$routeParams', '$http','$rootScope','$timeout', '$location','$window',
                             function($scope, $routeParams, $http, $rootScope, $timeout, $location,$window){
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
    
}]);

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        var $jumbo = $(".slikabaner");
        $nav.toggleClass('scrolled', $(this).scrollTop() > $jumbo.height());
    });
});

function scrollDownContact() {
    document.getElementById("footer").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function izradjuje(){
    alert("Stranica u izradi!");
}