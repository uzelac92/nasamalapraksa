app.controller('contactCtrl', function($scope){

    $scope.posaljiMejl = function() {
        var mejl = $scope.contMejl;
        var poruka = $scope.contPoruka;

       if(mejl == undefined || mejl=='' || !validateEmail(mejl)) {
            toastr.error('Unesi pravilan e-mail format!', 'Greska');
        } else if(poruka == undefined || poruka=='') {
            toastr.error('Unesite sadrzaj poruke!', 'Greska');
        } else {

        }
    }

    function validateEmail(email){
        var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return emailReg.test(email);
    }


});