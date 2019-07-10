<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    // get database connection
    include_once '../config/database.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    // set product property values
    $vNASLOV = $data->vNaslov;
    $vINTRO = $data->vIntro;
    $vSLIKA = $data->vSlika;
    $vALT = $data->vAlt;
    $vKEYWORDS = $data->vKeywords;

    $query = "INSERT INTO `post` (`NASLOV`, `INTRO`, `SLIKA`, `ALT`, `KEYWORDS`) VALUES ('$vNASLOV', '$vINTRO', '$vSLIKA', '$vALT','$vKEYWORDS');SELECT LAST_INSERT_ID();";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    $LAST_ID = $db->lastInsertId();
    // create the product
    if($state){

        $response['status'] = 'success';
        $response['ID'] = number_format((float) $LAST_ID);

        echo json_encode($response);
    }
    // if unable to create the product, tell the user
    else{
        $response['status'] = 'unsuccess';
        // set response code - 503 service unavailable
        http_response_code(503);
        // tell the user
        echo json_encode(array("message" => "Unable to create post."));
    }
?>