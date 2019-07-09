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

    $query = "INSERT INTO `post` (`ID`,`NASLOV`, `INTRO`, `SLIKA`, `PUTANJA`, `KLIK`, `KEYWORDS`, `NASLOV_A`, `NASLOV_B`) VALUES (NULL,'', '', '', '', 0, '', '', '');SELECT LAST_INSERT_ID();";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    $LAST_ID = $db->lastInsertId();

    echo json_encode($LAST_ID);

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