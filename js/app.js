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

$(function () {
    $(document).scroll(function () {
        var $nav = $(".navbar");
        var $jumbo = $(".slikabaner");
        $nav.toggleClass('scrolled text-white', $(this).scrollTop() > $nav.height());
    });
});

function scrollDownContact() {
    document.getElementById("footer").scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}

function izradjuje(){
    alert("Stranica u izradi!");
}