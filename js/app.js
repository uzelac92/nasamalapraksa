var app = angular.module('NasaMalaPraksa', ['ngRoute','ngAnimate','updateMeta']);

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

app.config(['$routeProvider', '$locationProvider','$compileProvider',function($routeProvider, $locationProvider, $compileProvider) {
  	$locationProvider.html5Mode(true);
	  $locationProvider.hashPrefix('!');
    $routeProvider
    .when("/", 
    {
        title: 'Pocetna',
        templateUrl : "/pages/kartice.html",
    })
  	.when("/mitovi", 
    {
        title: 'Mitovi',
        templateUrl : "/pages/Mitovi.html",
    })
  	.when("/newpost", 
    {
        title: 'Mitovi',
        templateUrl : "/pages/newpost.html",
    })
    .when("/:postID", 
    {
        title: 'Post',
        templateUrl: function(params) {
          return 'http://localhost:8000/api/post/read_one.php?id='+params.postID;   
        },
    })
    .otherwise({
        redirectTo: '/'
     });
     
}]);

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        var $jumbo = $(".slikabaner");
        $nav.toggleClass('scrolled text-white', $(this).scrollTop() > $nav.height());
    });
});