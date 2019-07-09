<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// get database connection
include_once '../config/database.php';
 
$database = new Database();
$db = $database->getConnection();

$postdata = file_get_contents("php://input");
$data = json_decode($postdata);

// make sure data is not empty
if( $data->NASLOV != "" &&
    $data->INTRO != ""&&
    $data->SLIKA != "" &&
    $data->PUTANJA != "" &&
    $data->KLIK != "" &&
    $data->KEYWORDS != "" &&
    $data->NASLOV_A != "" &&
    $data->NASLOV_B != "" ){

    // set product property values
    $vNASLOV = $data->NASLOV;
    $vINTRO = $data->INTRO;
    $vSLIKA = $data->SLIKA;
    $vPUTANJA = $data->PUTANJA;
    $vKLIK = $data->KLIK;
    $vKEYWORDS = $data->KEYWORDS;
    $vNASLOV_A = $data->NASLOV_A;
    $vNASLOV_B = $data->NASLOV_B;

    // $query = "INSERT INTO post SET  NASLOV=:naslov, INTRO=:intro, SLIKA=:slika, PUTANJA=:putanja, KLIK=:klik, KEYWORDS=:keywords, NASLOV_A=:naslov_a, NASLOV_B=:naslov_b;";

    // // prepare query
    // $stmt = $db->prepare($query);

    // // sanitize
    // $vNASLOV=htmlspecialchars(strip_tags($vNASLOV));
    // $vINTRO=htmlspecialchars(strip_tags($vINTRO));
    // $vSLIKA=htmlspecialchars(strip_tags($vSLIKA));
    // $vPUTANJA=htmlspecialchars(strip_tags($vPUTANJA));
    // $vKLIK=htmlspecialchars(strip_tags($vNASLOV));
    // $vKEYWORDS=htmlspecialchars(strip_tags($vKEYWORDS));
    // $vNASLOV_A=htmlspecialchars(strip_tags($vNASLOV_A));
    // $vNASLOV_B=htmlspecialchars(strip_tags($vNASLOV_B));

    // // bind values
    // $stmt->bindParam(":naslov", $vNASLOV);
    // $stmt->bindParam(":intro", $vINTRO);
    // $stmt->bindParam(":slika", $vSLIKA);
    // $stmt->bindParam(":putanja", $vPUTANJA);
    // $stmt->bindParam(":klik", $vKLIK);
    // $stmt->bindParam(":keywords", $vKEYWORDS);
    // $stmt->bindParam(":naslov_a", $vNASLOV_A);
    // $stmt->bindParam(":naslov_b", $vNASLOV_B);

    //$query = "INSERT INTO 'post' ('ID','NASLOV','INTRO','SLIKA','PUTANJA','KLIK','KEYWORDS','NASLOV_A','NASLOV_B') VALUES (NULL,'$vNASLOV','$vINTRO','$vSLIKA','$vPUTANJA','$vKLIK','$vKEYWORDS','$vNASLOV_A','$vNASLOV_B')";
    $query = "INSERT INTO `post` (`ID`,`NASLOV`, `INTRO`, `SLIKA`, `PUTANJA`, `KLIK`, `KEYWORDS`, `NASLOV_A`, `NASLOV_B`) VALUES (NULL,'', '', '', '', 0, '', '', '')";
    //$query = "INSERT INTO post (ID, NASLOV, INTRO, SLIKA, PUTANJA, KLIK, KEYWORDS, NASLOV_A, NASLOV_B) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    //$stmt = $db->prepare('INSERT INTO post (ID, NASLOV, INTRO, SLIKA, PUTANJA, KLIK, KEYWORDS, NASLOV_A, NASLOV_B) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');

    //$state = $stmt->execute(['48', 'ASD', 'ASD', 'ASD', 'ASD', 'ASD', '0', 'ASD', 'ASD']);

    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    echo json_encode($state);

    // create the product
    if($state){

        // set response code - 201 created
        http_response_code(201);

        // tell the user
        echo json_encode(array("message" => "Post was created."));
    }

    // if unable to create the product, tell the user
    else{

        // set response code - 503 service unavailable
        http_response_code(503);

        // tell the user
        echo json_encode(array("message" => "Unable to create post."));
    }
}

// tell the user data is incomplete
else{

    // set response code - 400 bad request
    http_response_code(400);

    // tell the user
    echo json_encode(array("message" => "Unable to create post. Data is incomplete."));
}
?>