app.controller('myPostCtrl', function($scope, $http,$sce){

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
    // $scope.insert=function(){
    //     $scope.image1=$scope.files[0];
    //     $http({
    //         method:'POST',
    //         url:"upload.php",
    //         processData:false,
    //         transformRequest:function(data){
    //             var formData=new FormData();
    //             formData.append("image1", $scope.image1);
    //             formData.append("description", $scope.description);
    //             formData.append("title", $scope.title);
    //             formData.append("price", $scope.price);
    //             formData.append("category", $scope.category);


    //             return formData;
    //             return $scope.category;
    //             return $scope.title;
    //             return $scope.price;
    //             return $scope.description;  
    //         },  
    //         data : $scope.form,
    //         headers: {
    //                 'Content-Type': undefined
    //         }
    //     }).success(function(data){
    //         alert(data);
            
    //     });
        
    // };

    $scope.uploadedFile=function(element)
    {
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            var output = document.getElementById('output');
            output.src = URL.createObjectURL(element.files[0]);

            $scope.image_source = event.target.result
            $scope.$apply(function($scope) {
                $scope.files = element.files;
            });
        }
        reader.readAsDataURL(element.files[0]);
    }

    $scope.questions = [];
    $scope.count = 0;

    $scope.addQuestion = function() {
        $scope.pit = '';
        $scope.op = '';
        $scope.pr = '';
        $scope.pit += $scope.pitanje;
        $scope.op += tinymce.get('opis').getContent();
        $scope.pr += tinymce.get('problem').getContent();

        if($scope.pit != '' && $scope.op != '' && $scope.pr != '') {
            $scope.questions.push({
                'id': $scope.count,
                'pitanje': $scope.pit,
                'opis': $scope.op,
                'problem': $scope.pr,
            });
            tinymce.get('opis').setContent('');
            tinymce.get('problem').setContent('')
            $scope.pitanje = '';
            ++$scope.count;
        } else {
            alert('Popuni pitanje!');
        }
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

    $scope.trustAsHtml = function(html) {
        return $sce.trustAsHtml(html);
    }




});