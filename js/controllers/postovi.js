app.controller('mainCtrl', function($scope, $routeParams,$uibModal, $firebaseAuth, webservice, $sce,$route,$location,$routeParams,loginService){
  	// document.body.addEventListener("wheel", e=>{
    //   if(e.ctrlKey)
    //     event.preventDefault();//prevent zoom
    // });
  
  	$scope.templateUrl = $routeParams.postID;
    $scope.klikID = $routeParams.klikID;

    $scope.reload = function() {
      if (!localStorage.getItem("reload")) {
          /* set reload to true and then reload the page */
          localStorage.setItem("reload", "true");
          location.reload();
      }
      /* after reloading remove "reload" from localStorage */
      else {
          localStorage.removeItem("reload");
          // localStorage.clear(); // or clear it, instead
      }
  }

    $scope.initLoader = function() {
        angular.element(document.getElementsByClassName("CardLK")).css('display','none');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','block');
    }
    
    $scope.finishLoad = function() {
      	angular.element(document.getElementsByClassName("CardLK")).css('display','inline-flex');
        angular.element(document.getElementsByClassName("loaderCard")).css('display','none');
    }
    
    var sortByProperty = function (property) {
      return function (x, y) {
        return ((parseInt(x[property]) === parseInt(y[property])) ? 0 : ((parseInt(x[property]) > parseInt(y[property])) ? -1 : 1));
      };
    };

    webservice.getPosts().then(function (response) {
        if (response.status == 200) {
            $scope.osnovno = response.data.records;
            $scope.postovi = response.data.records;
            $scope.topPostovi = JSON.parse(JSON.stringify( $scope.postovi ));
            $scope.postovi.sort(sortByProperty('ID'));
            $scope.topPostovi.sort(sortByProperty('KLIK'));

        } else {
            toastr.error('Baza trenutno van funkcije!', 'Greska');
        }
    });

    $scope.filterSrch = function() {
      $('#srchResults').html('');
      var searchField = $('#srchBtn').val();

      var expression = new RegExp(searchField, "i");

      $.each($scope.postovi, function(key,value){
        if(value.INTRO.search(expression) != -1 || value.NASLOV.search(expression) != -1 || value.KEYWORDS.search(expression) != -1) {

          $('#srchResults').append('<a href="/'+value.ID+'" class=""><li class="list-group-item d-lg-inline-flex"><img src="../../../../images/'+value.SLIKA+'" class="col-lg-3" /><div class="col-lg-9 text-dark">'+value.NASLOV+'</div></li></a>');
        }
      });
    }

    $(window).click(function() {
      $('#srchBtn').val('');
      $('#srchResults').html('');
    });
    
    $('#srchBtn').click(function(event){
        event.stopPropagation();
    });
  
    $scope.limit= 12;
    $scope.loadMore = function() {
      $scope.limit = $scope.limit + 6;
    }
    
    $scope.sakriveno = function() {
      $("#aboutID").removeClass('d-inline-flex').addClass('d-none');
      $("#navPost").removeClass('d-none').addClass('d-lg-inline-flex d-block');
    }
    $scope.pokazano = function() {
      $('#aboutID').removeClass('d-none').addClass('d-inline-flex');
      $('#navPost').removeClass('d-lg-inline-flex d-block').addClass('d-none');
    }

    $scope.scrollGore = function() {
      $('html, body').animate({scrollTop:0}, '300');
    }

    $scope.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }
    
    $scope.openCustomer = function () {
        $uibModal.open({
            templateUrl: 'pages/login.html',
            controller: 'customDialogCtrl',
            size: 'md',
        }).result.catch(function (resp) {
          if (['cancel', 'backdrop click', 'escape key press'].indexOf(resp) === -1) throw resp;
        });
    }
});