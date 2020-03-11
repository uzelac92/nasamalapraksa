<!DOCTYPE html>
<html lang="sr" ng-app="NasaMalaPraksa">
    <head>
      	<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="UTF-8">
        <meta name="fragment" content="!">
      
        <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png">
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="48x48" href="/favicons/favicon.ico">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
        <link rel="manifest" href="/favicons/site.webmanifest">
      
      	<meta name="google-site-verification" content="em8wmHnGI5ZUmu0VEwgc3vzUkMIJicGtjLlt-wSfwvk" />
        <meta property="fb:app_id" content="245980766302862" />
        <meta name="twitter:site" content="@nasamalapraksa">
        <meta name="twitter:card" content="summary_large_image">
        <meta property="og:type" content="website">
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <?php
        class Database{
 
            // specify your own database credentials
            private $host = "localhost:8889";
            private $db_name = "db770021752";
            private $username = "root";
            private $password = "root";
            public $conn;
            
         
            // get the database connection
            public function getConnection(){
         
                $this->conn = null;
         
                try{
                    $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
                    $this->conn->exec("set names utf8");
                }catch(PDOException $exception){
                    echo "Connection error: " . $exception->getMessage();
                }
         
                return $this->conn;
            }
        }
         
        // get database connection
        $database = new Database();
        $db = $database->getConnection();

        $id = $_SERVER['REQUEST_URI'];
    

        $params = explode('/', $_SERVER['REQUEST_URI'], 2);
        $kljuc =  $params[1];

        $query = "SELECT * FROM `post` WHERE ID=$kljuc";
        $stmt = $db->prepare( $query );
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if($row['NASLOV'] != null){
         
            // make it json format
            echo "<title>". strip_tags($row['NASLOV']) ." | Nasa mala praksa</title>";

            echo "<meta name='title' content='". strip_tags($row['NASLOV'])." | Nasa mala praksa' />";
            echo "<meta name='description' content='". strip_tags($row['INTRO'])."' />";

            // echo "<meta name='og:title' content='". strip_tags($row['NASLOV'])."' />";
            // echo "<meta name='og:description' content='". strip_tags($row['INTRO'])."' />";
            // echo "<meta name='og:url' content='https://www.nasamalapraksa.com".$id."' />";
            // echo "<meta name='og:image' content='https://www.nasamalapraksa.com/images/".strip_tags($row['SLIKA'])."' />";
            
            echo "<meta property='og:title' content='". strip_tags($row['NASLOV'])."' />";
            echo "<meta property='og:description' content='". strip_tags($row['INTRO'])."' />";
            echo "<meta property='og:url' content='https://www.nasamalapraksa.com".$id."' />";
            echo "<meta property='og:image' content='https://www.nasamalapraksa.com/images/".strip_tags($row['SLIKA'])."' />";
            
            echo "<meta name='twitter:title' content='". strip_tags($row['NASLOV'])."' />";
            echo "<meta name='twitter:description' content='". strip_tags($row['INTRO'])."' />";
            echo "<meta name='twitter:url' content='https://www.nasamalapraksa.com/images/".strip_tags($row['SLIKA'])."' />";
         
            // set response code - 200 OK
            http_response_code(200);
          
        } else if(strlen($id) == 1){
            
            echo "<title>Glavna | Nasa mala praksa</title>";

            echo "<meta name='title' content='Glavna | Nasa mala praksa' />";
            echo "<meta name='description' content='Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.' />";

            // echo "<meta name='og:title' content='Glavna' />";
            // echo "<meta name='og:description' content='Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.' />";
            // echo "<meta name='og:url' content='https://www.nasamalapraksa.com/' />";
            // echo "<meta name='og:image' content='https://www.nasamalapraksa.com/images/banner.gif' />";
            
            echo "<meta property='og:title' content='Glavna' />";
            echo "<meta property='og:description' content='Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.' />";
            echo "<meta property='og:url' content='https://www.nasamalapraksa.com/' />";
            echo "<meta property='og:image' content='https://www.nasamalapraksa.com/images/banner.gif' />";

            echo "<meta name='twitter:title' content='Glavna' />";
            echo "<meta name='twitter:description' content='Blog o najčešćim medicinskim temama i aktuelnostima. Opisani najčešći zdravstveni problemi u populaciji.' />";
            echo "<meta name='twitter:url' content='https://www.nasamalapraksa.com/images/banner.gif' />";
            
            // set response code - 404 Not found
            http_response_code(404);

         
        } 

        ?>
        
      	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Signika">
      	<link href="https://fonts.googleapis.com/css?family=Merienda+One" rel="stylesheet">
     	  <link href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300i,400" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Laila" rel="stylesheet">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">


        <link rel="stylesheet" href="css/common/bootstrap.min.css">

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
      	<link rel="stylesheet" href="css/common/customized.css" >
      
        <script type="text/javascript" src="js/common/jquery-3.3.1.min.js" ></script>
        <script type="text/javascript" src="plugin/tinymce/tinymce.min.js"></script>
        <script type="text/javascript" src="js/common/bootstrap.min.js"></script>
      
        <script src="js/common/angular.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/ng-meta/1.0.3/ngMeta.min.js"></script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
        <script type="text/javascript" src="js/common/angular-animate.js"></script>
        <script src="js/common/angular-route.js"></script>
        <script src="js/common/update-meta.js"></script>
        <script src="js/common/ui-bootstrap-tpls-2.5.0.js"></script>

        <!-- The core Firebase JS SDK is always required and must be listed first -->
        <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/6.2.4/firebase-auth.js"></script>

        <!-- TODO: Add SDKs for Firebase products that you want to use
            https://firebase.google.com/docs/web/setup#config-web-app -->
        <script>
          // Your web app's Firebase configuration
          var firebaseConfig = {
            apiKey: "AIzaSyAETjZe0FpjBTbO-kQpMd-an6K7oW_SrJc",
            authDomain: "nasamalapraksa.firebaseapp.com",
            databaseURL: "https://nasamalapraksa.firebaseio.com",
            projectId: "nasamalapraksa",
            storageBucket: "",
            messagingSenderId: "947152702599",
            appId: "1:947152702599:web:d342cb491e7c46ef"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        </script>
        <!-- AngularFire -->
        <script src="https://cdn.firebase.com/libs/angularfire/2.3.0/angularfire.min.js"></script>
        
        <script src="js/app.js"></script>
        <script src="js/services/services.js?version=1.1"></script>
        <script src="js/services/loginservice.js"></script>
        <script src="js/controllers/postovi.js"></script>
        <script src="js/controllers/mypost.js"></script>
        <script src="js/controllers/openpost.js"></script>
        <script src="js/controllers/login.js"></script>
        <script src="js/controllers/footer.js"></script>
        <script src="js/controllers/contact.js"></script>
      
		<!-- Global site tag (gtag.js) - Google Analytics -->
        <script src="https://www.googletagmanager.com/gtag/js?id=UA-133436304-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-133436304-1');
        </script>

        <base href="/">
    </head>

    <body style="overflow-x: hidden" ng-controller="mainCtrl">
      <div ng-include="'pages/header.html'"></div>
      
      <div id="aboutID" ng-include="'pages/OnamaNOVO.html'" style="display: none" class="col-sm-12"></div>
      <div id="navPost" class="col-12 m-0 p-0 d-lg-inline-flex d-block">
        <div class="col-sm-8 px-0 mx-0">
          <div class="levakolona px-lg-4 px-0 mx-0">
            <div style="display: none" id="bcrumbs" ng-include="'pages/Traka.html'"></div>
            <main ng-view></main>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="desnakolona" ng-include="'pages/DesnaNajcitanije.html'"></div>
        </div>
      </div>

      <div ng-include="'pages/footerNOVO.html'"></div>
      
    </body>
</html>