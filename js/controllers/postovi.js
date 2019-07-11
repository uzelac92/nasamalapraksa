app.controller('mainCtrl', function($scope, $routeParams,$uibModal, $firebaseAuth, webservice, $sce,$route,$location,$routeParams,){
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

    $scope.scrollGore = function() {
      $('html, body').animate({scrollTop:0}, '300');
    }

    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }

    $scope.logID = localStorage.getItem('userID');;

    $scope.openCustomer = function () {
      if($scope.logID != '') {
        $scope.logID = '';
        localStorage.setItem('userID', '');
        window.location.reload();
      } else {
        $uibModal.open({
            templateUrl: 'pages/login.html',
            controller: 'customDialogCtrl',
            size: 'md',
        }).result.catch(function (resp) {
          if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
        });
      }
    }
 
});