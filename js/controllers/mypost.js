app.controller('myPostCtrl', function($scope, $http,$sce, webservice){

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

    $scope.form=[];
    $scope.files=[];
    $scope.imageData = "";
    $scope.uploadedFile=function(element)
    {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var output = document.getElementById('output');
            output.src = URL.createObjectURL(element.files[0]);

            

            $scope.image_source = event.target.result;
            $scope.$apply(function($scope) {
                $scope.files = element.files;
                //console.log($scope.image_source); ovo su ti podaci!!!
            });
        }
        $scope.imageData=element.files[0].name;
        reader.readAsDataURL(element.files[0]);
    }

    $scope.removeQuestion = function(item) {
        var index = 0;
        for(var i=0; i<$scope.questions.length; i++) {
            if($scope.questions[i].id == item) {
                index = i;
                break;
            }
        }
        $scope.questions.splice(index, 1);
        --$scope.count;
    }

    $scope.editQuestion = function(item) {
        var index = 0;
        for(var i=0; i<$scope.questions.length; i++) {
            if($scope.questions[i].id == item) {
                index = i;
                break;
            }
        }

        $scope.pitanje = $scope.questions[index].pitanje;
        tinymce.get('opis').setContent($scope.questions[index].opis);
        tinymce.get('problem').setContent($scope.questions[index].problem)
        $scope.questions.splice(index, 1);
        --$scope.count;
    }

    $scope.lastID = 0;
    $scope.uploadFirst = function() {
        var postNaslov = tinymce.get('postnaslov').getContent();
        var postIntro = tinymce.get('intro').getContent();
        var postSlika = $scope.imageData;
        var postAlt = $scope.imgAlt;
        var postKeywords = $scope.kljucnereci;

        if(postNaslov == undefined || postNaslov == '') {
            alert('Unesi glavni naziv posta!');
        } else if(postIntro == undefined || postIntro == '') {
            alert('Unesi kratki uvod posta!');
        } else if(postSlika == undefined || postSlika == '') {
            alert('Izaberi sliku!');
        } else if(postAlt == undefined || postAlt == '') {
            alert('Unesi opis slike!');
        } else if(postKeywords == undefined || postKeywords == '') {
            alert('Unesi kljucne reci!');
        } else {
            var vData = {
                vNaslov:postNaslov,
                vIntro:postIntro,
                vSlika:postSlika,
                vAlt:postAlt,
                vKeywords:postKeywords,
            };

            webservice.putPost(vData).then(function (response) {
                console.log(response);
                if (response.data.status == "success") {
                    alert(response.data.message);
                    $scope.lastID = response.data.ID;

                    $scope.finished = true;
                } else {
                    alert('Baza trenutno van funkcije!');
                }
            });
        }
    }

    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
    }

    $scope.addQuestion = function() {
        var upitnica = $scope.pitanje;
        var uvod = tinymce.get('opis').getContent();
        var odgovor = tinymce.get('problem').getContent();
        var post_id = $scope.lastID;

        if(upitnica == undefined || upitnica == '') {
            alert('Unesi pitanje!');
        } else if(uvod == undefined || uvod == '') {
            alert('Unesi uvod pitanja!');
        } else if(odgovor == undefined || odgovor == '') {
            alert('Unesi odgovor');
        } else if(post_id == undefined || post_id == 0) {
            alert('Pogresan post id!');
        } else {
            var vData = {
                vUpitnica:upitnica,
                vUvod:uvod,
                vOdgovor:odgovor,
                vPostId:post_id,
            };

            webservice.putQuestion(vData).then(function (response) {
                if (response.data.status == "success") {
                    alert(response.data.message);

                    webservice.getQuestions().then(function (odgovor) {
                        if (odgovor.statusText == "OK") {
                            $scope.questions = odgovor.data.records;
                        } else {
                          alert('Baza trenutno van funkcije!');
                        }
                    });

                    $scope.pitanje = "";
                    tinymce.get('opis').setContent('');
                    tinymce.get('problem').setContent('');
                } else {
                    alert('Baza trenutno van funkcije!');
                }
            });
            
        }

    }

    $scope.uploadLast = function() {
        $('html, body').animate({scrollTop:0}, '300');
        $scope.finished = false;
    }



});