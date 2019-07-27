app.controller('postCtrl', function($scope, $http,$sce,$location,$routeParams,$route, webservice,ngMeta){

    $('#srchBtn').val('');
    $('#srchResults').html('');

    $scope.kljuc = $routeParams.postID;

    $scope.$on('$destroy', function() {
        var tinyInstance = tinymce.get('intro');
  
        if (tinyInstance) {
          tinyInstance.remove();
          tinyInstance = null;
        }

        tinyInstance = tinymce.get('opis');
  
        if (tinyInstance) {
          tinyInstance.remove();
          tinyInstance = null;
        }


        tinyInstance = tinymce.get('problem');
  
        if (tinyInstance) {
          tinyInstance.remove();
          tinyInstance = null;
        }

        tinyInstance = tinymce.get('postnaslov');
  
        if (tinyInstance) {
          tinyInstance.remove();
          tinyInstance = null;
        }
    });

    tinymce.init({
        /* replace textarea having class .tinymce with tinymce editor */
        selector: "textarea.tinymce",
                
        /* width and height of the editor */
        width: "100%",
        height: 250,
        
        /* display statusbar */
        statubar: true,
        
        /* plugin */
        plugins: [
            "advlist autolink link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "save table directionality emoticons template paste"
        ],

        /* toolbar */
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
        
        /* style */
        style_formats: [
            {title: "Headers", items: [
                {title: "Header 1", format: "h1"},
                {title: "Header 2", format: "h2"},
                {title: "Header 3", format: "h3"},
                {title: "Header 4", format: "h4"},
                {title: "Header 5", format: "h5"},
                {title: "Header 6", format: "h6"}
            ]},
            {title: "Inline", items: [
                {title: "Bold", icon: "bold", format: "bold"},
                {title: "Italic", icon: "italic", format: "italic"},
                {title: "Underline", icon: "underline", format: "underline"},
                {title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
                {title: "Superscript", icon: "superscript", format: "superscript"},
                {title: "Subscript", icon: "subscript", format: "subscript"},
                {title: "Code", icon: "code", format: "code"}
            ]},
            {title: "Blocks", items: [
                {title: "Paragraph", format: "p"},
                {title: "Blockquote", format: "blockquote"},
                {title: "Div", format: "div"},
                {title: "Pre", format: "pre"}
            ]},
            {title: "Alignment", items: [
                {title: "Left", icon: "alignleft", format: "alignleft"},
                {title: "Center", icon: "aligncenter", format: "aligncenter"},
                {title: "Right", icon: "alignright", format: "alignright"},
                {title: "Justify", icon: "alignjustify", format: "alignjustify"}
            ]}
        ]
    });

    $scope.initTiny = function() {
        $scope.$on('$destroy', function() {
            var tinyInstance = tinymce.get('intro');
      
            if (tinyInstance) {
              tinyInstance.remove();
              tinyInstance = null;
            }
        });
        tinymce.init({
            /* replace textarea having class .tinymce with tinymce editor */
            selector: "textarea.tinymce",
            
            /* width and height of the editor */
            width: "100%",
            height: 250,
            
            /* display statusbar */
            statubar: true,
            
            /* plugin */
            plugins: [
                "advlist autolink link image lists charmap print preview hr anchor pagebreak",
                "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
                "save table directionality emoticons template paste"
            ],
        
            /* toolbar */
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media fullpage | forecolor backcolor emoticons",
            
            /* style */
            style_formats: [
                {title: "Headers", items: [
                    {title: "Header 1", format: "h1"},
                    {title: "Header 2", format: "h2"},
                    {title: "Header 3", format: "h3"},
                    {title: "Header 4", format: "h4"},
                    {title: "Header 5", format: "h5"},
                    {title: "Header 6", format: "h6"}
                ]},
                {title: "Inline", items: [
                    {title: "Bold", icon: "bold", format: "bold"},
                    {title: "Italic", icon: "italic", format: "italic"},
                    {title: "Underline", icon: "underline", format: "underline"},
                    {title: "Strikethrough", icon: "strikethrough", format: "strikethrough"},
                    {title: "Superscript", icon: "superscript", format: "superscript"},
                    {title: "Subscript", icon: "subscript", format: "subscript"},
                    {title: "Code", icon: "code", format: "code"}
                ]},
                {title: "Blocks", items: [
                    {title: "Paragraph", format: "p"},
                    {title: "Blockquote", format: "blockquote"},
                    {title: "Div", format: "div"},
                    {title: "Pre", format: "pre"}
                ]},
                {title: "Alignment", items: [
                    {title: "Left", icon: "alignleft", format: "alignleft"},
                    {title: "Center", icon: "aligncenter", format: "aligncenter"},
                    {title: "Right", icon: "alignright", format: "alignright"},
                    {title: "Justify", icon: "alignjustify", format: "alignjustify"}
                ]}
            ]
        });
    }

    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
    }

    webservice.getPost($scope.kljuc).then(function (response) {
        if (response.statusText == "OK") {
            $scope.podaci = response.data;

            webservice.getComments($scope.podaci.ID).then(function (response) {
                if (response.statusText == "OK") {
                    $scope.komentari = response.data.komentari;
                } else {
                    toastr.error('Nema komentara za prikaz!', 'Greska')
                }
            });

            ngMeta.setTitle(strip_html_tags($scope.podaci.NASLOV));
            ngMeta.setTag('description', strip_html_tags($scope.podaci.INTRO));
            ngMeta.setTag('og:title', strip_html_tags($scope.podaci.NASLOV));
            ngMeta.setTag('og:description', strip_html_tags($scope.podaci.INTRO));
            ngMeta.setTag('og:url', 'www.nasamalapraksa.com/'+$scope.podaci.ID);
            ngMeta.setTag('og:image', 'www.nasamalapraksa.com/'+$scope.podaci.SLIKA);
            ngMeta.setTag('twitter:title', strip_html_tags($scope.podaci.NASLOV));
            ngMeta.setTag('twitter:description', strip_html_tags($scope.podaci.INTRO));
            ngMeta.setTag('twitter:image', 'www.nasamalapraksa.com/'+$scope.podaci.SLIKA);
        } else {
            toastr.error('Nema posta za prikaz!', 'Greska')
        }
    });

    function strip_html_tags(str){
        if ((str===null) || (str===''))
            return false;
        else
        str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }


    $scope.finished = false;
    $scope.editID = 0;
    $scope.editQuest = function(id,upit,uvod,odg) {
        $scope.editID = id;
        $scope.pitanje = upit;
        tinymce.get('opis').setContent(uvod);
        tinymce.get('problem').setContent(odg);
        $scope.finished = true;
    }

    $scope.removeQuest = function(id) {

    }

    $scope.cancelEdit = function() {
        $scope.pitanje = "";
        tinymce.get('opis').setContent("");
        tinymce.get('problem').setContent("");
        $scope.finished = false;
    }

    $scope.uploadEdit = function() {
        var upitnica = $scope.pitanje;
        var uvod = tinymce.get('opis').getContent();
        var odgovor = tinymce.get('problem').getContent();
        var kljuc = $scope.editID;

        if(upitnica == undefined || upitnica == '') {
            alert('Unesi pitanje!');
        } else if(uvod == undefined || uvod == '') {
            alert('Unesi uvod pitanja!');
        } else if(odgovor == undefined || odgovor == '') {
            alert('Unesi odgovor');
        } else if(kljuc == undefined || kljuc == 0) {
            alert('Nije izabrano pitanje!');
        } else {
            var vData = {
                vUpitnica:upitnica,
                vUvod:uvod,
                vOdgovor:odgovor,
                vPitanjeID:kljuc,
            };

            webservice.editQuestion(vData).then(function (response) {
                if (response.statusText == "OK") {
                    toastr.success('Uspesna promena :)', 'Bravo');
                    $route.reload();
                } else {
                    toastr.error('Nema posta za prikaz!', 'Greska')
                }
            });
        }
    }

    $scope.pretplata = function() {
        var mejl = $scope.subEmail;

        if(mejl == undefined || mejl == '') {
            alert('Unesi pitanje!');
        } else {
            var vData = {
                vEmail:mejl,
            };

            webservice.putEmail(vData).then(function (response) {
                if (response.data.status == "success") {
                    toastr.success('Uspesna pretplata :)', 'Bravo');
                    $route.reload();

                    $scope.subEmail = "";
                } else {
                    toastr.error('Baza trenutno van funkcije!', 'Greska')
                }
            });
            
        }
    }

    $scope.noviKom = function(kljuc) {
        var komentar = $scope.komentarTxt;

        if(komentar == undefined || komentar == '' ) {
            toastr.error('Unesi komentar!', 'Greska')
        } else {
            var vData = {
                vTekst:komentar,
                vPostId:kljuc,
            };

            webservice.putComment(vData).then(function (response) {
                if (response.data.status == "success") {
                    toastr.success('Unet komentar :)', 'Bravo');
                    $route.reload();

                } else {
                    toastr.error('Baza trenutno van funkcije!', 'Greska')
                }
            });
        }
    }

    $scope.noviPodKom = function(kljuc) {
        var kljucID = 'id' + kljuc;
        var komentar = document.getElementById(kljucID).value;

        if(komentar == undefined || komentar == '' ) {
            toastr.error('Unesi podkomentar!', 'Greska')
        } else {
            var vData = {
                vTekst:komentar,
                vKomentarID:kljuc,
            };

            webservice.putSubcomment(vData).then(function (response) {
                if (response.data.status == "success") {
                    toastr.success('Unet podkomentar :)', 'Bravo');
                    $scope.podkomentarTxt = '';
                    $route.reload();
                } else {
                    toastr.error('Baza trenutno van funkcije!', 'Greska')
                }
            });
        }
    }

});