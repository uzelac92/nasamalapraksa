app.controller('postCtrl', function($scope, $http,$sce,$location,$routeParams,$route, webservice){

    $scope.kljuc = $routeParams.postID;

    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
    }

    webservice.getPost($scope.kljuc).then(function (response) {
        if (response.statusText == "OK") {
            $scope.podaci = response.data;
            console.log($scope.podaci);
        } else {
            toastr.error('Nema posta za prikaz!', 'Greska')
        }
    });


    // $scope.addQuestion = function() {
    //     var upitnica = $scope.pitanje;
    //     var uvod = tinymce.get('opis').getContent();
    //     var odgovor = tinymce.get('problem').getContent();
    //     var post_id = $scope.lastID;

    //     if(upitnica == undefined || upitnica == '') {
    //         alert('Unesi pitanje!');
    //     } else if(uvod == undefined || uvod == '') {
    //         alert('Unesi uvod pitanja!');
    //     } else if(odgovor == undefined || odgovor == '') {
    //         alert('Unesi odgovor');
    //     } else if(post_id == undefined || post_id == 0) {
    //         alert('Pogresan post id!');
    //     } else {
    //         var vData = {
    //             vUpitnica:upitnica,
    //             vUvod:uvod,
    //             vOdgovor:odgovor,
    //             vPostId:post_id,
    //         };

    //         webservice.putQuestion(vData).then(function (response) {
    //             if (response.data.status == "success") {
    //                 toastr.success('Uneto pitanje :)', 'Bravo')

    //                 webservice.getQuestions().then(function (odgovor) {
    //                     if (odgovor.statusText == "OK") {
    //                         $scope.questions = odgovor.data.records;
    //                     } else {
    //                         toastr.error('Nema pitanja za prikaz!', 'Greska')
    //                     }
    //                 });

    //                 $scope.pitanje = "";
    //                 tinymce.get('opis').setContent('');
    //                 tinymce.get('problem').setContent('');
    //             } else {
    //                 toastr.error('Baza trenutno van funkcije!', 'Greska')
    //             }
    //         });
            
    //     }

    //     $('html, body').animate({scrollTop:0}, '300');
    // }


});