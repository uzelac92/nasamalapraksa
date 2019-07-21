var app = angular.module('NasaMalaPraksa', ['ngRoute','ngAnimate','ui.bootstrap','updateMeta','firebase','ngMeta']);

window.fbAsyncInit = function() {
  FB.init({
    appId            : '245980766302862',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v2.10'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

app.config(['$routeProvider', '$locationProvider','$compileProvider','ngMetaProvider',function($routeProvider, $locationProvider, $compileProvider,ngMetaProvider) {
  	$locationProvider.html5Mode(true);
	  $locationProvider.hashPrefix('!');
    $routeProvider
    .when("/", 
    {
        title: 'Pocetna',
        templateUrl : "/pages/kartice.html",
        data: {
          meta: {
            'title': 'Početna stranica',
            'titleSuffix': ' | Naša Mala Praksa',
            'description': 'Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.'
          }
        }
    })
  	.when("/mitovi", 
    {
        title: 'Mitovi',
        templateUrl : "/pages/Mitovi.html",
        data: {
          meta: {
            'title': 'Mitovi',
            'titleSuffix': ' | Naša Mala Praksa',
            'description': 'Najćešći mitovi u medicini.'
          }
        }
    })
  	.when("/newpost", 
    {
        title: 'Mitovi',
        templateUrl : "/pages/newpost.html",
        data: {
          meta: {
            'title': 'Novi Post',
            'titleSuffix': ' | Naša Mala Praksa',
            'description': 'Kreiranje novog posta i ubacivanje u bazu podataka.'
          }
        }
    })
    .when("/:postID", 
    {
        title: 'Post',
        templateUrl : "/pages/kalupHTML.html",
    })
    .otherwise({
        redirectTo: '/'
     });

    ngMetaProvider.useTitleSuffix(true);
    ngMetaProvider.setDefaultTitle('Glavna');    
    ngMetaProvider.setDefaultTitleSuffix(' | Naša Mala Praksa');
    ngMetaProvider.setDefaultTag('description', 'Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.');
    ngMetaProvider.setDefaultTag('og:title', 'Glavna');
    ngMetaProvider.setDefaultTag('og:description', 'Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.');
    ngMetaProvider.setDefaultTag('og:url', 'www.nasamalarpraksa.com');
    ngMetaProvider.setDefaultTag('og:image', '../images/banner.gif');
    ngMetaProvider.setDefaultTag('twitter:title', 'Glavna');
    ngMetaProvider.setDefaultTag('twitter:description', 'Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.');
    ngMetaProvider.setDefaultTag('twitter:image', '../images/banner.gif');
     
}]);

app.run(function($rootScope, $location,ngMeta) {  
  ngMeta.init();
  $rootScope.$on('$routeChangeSuccess', function ($scope) {
    $scope.logID = localStorage.getItem('userID');
  });
});
  

app.controller('customDialogCtrl', function ($scope, $uibModalInstance, $rootScope) {
  //-- Variables --//
  $rootScope.$on("CallParentMethod", function () {
    $uibModalInstance.dismiss('Canceled');
  });

  $scope.user = {
    name: ''
  };

  //-- Methods --//

  $scope.cancel = function () {
    $uibModalInstance.dismiss('Canceled');
  }; // end cancel

  $scope.save = function () {
    $uibModalInstance.close($scope.user.name);
  }; // end save

  $scope.hitEnter = function (evt) {
    if (angular.equals(evt.keyCode, 13) && !(angular.equals($scope.user.name, null) || angular.equals($scope.user.name, '')))
      $scope.save();
  };
}) 

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        var $jumbo = $(".slikabaner");
        $nav.toggleClass('scrolled text-white', $(this).scrollTop() > $nav.height());
    });
});