app.controller('footCtrl', function($scope, webservice){


    $scope.pretplata = function() {
        var mejl = $scope.subEmail;

        if(mejl == undefined || mejl == '') {
            toastr.success('Unesi e-mail', 'Greska');
        } else if(!validateEmail(mejl)) {
            toastr.error('Unesi pravilan e-mail format', 'Greska');
        } else {
            var vData = {
                vEmail:mejl,
            };

            webservice.putEmail(vData).then(function (response) {
                if (response.data.status == "success") {
                    toastr.success('Uspesna pretplata :)', 'Bravo')

                    $scope.subEmail = "";
                } else {
                    toastr.error('Baza trenutno van funkcije!', 'Greska')
                }
            });
            
        }
    }

    function validateEmail(email){
        var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return emailReg.test(email);
    }


});