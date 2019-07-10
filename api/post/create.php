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
    $vPUTANJA = $data->vPutanja;
    $vKLIK = $data->vKlik;
    $vPITANJA = $data->vPitanja;
    $vKEYWORDS = $data->vKeywords;

    $query = "INSERT INTO `post` (`ID`,`NASLOV`, `INTRO`, `SLIKA`, `ALT`, `PUTANJA`, `KLIK`, `KEYWORDS`) VALUES (NULL,'$vNASLOV', '$vINTRO', '$vSLIKA', '$vALT','$vPUTANJA', 0, '$vKEYWORDS');SELECT LAST_INSERT_ID();";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    $LAST_ID = $db->lastInsertId();
    // for($i=0; i<count($vPITANJA); $i++) {
    //     $query = "INSERT INTO `PITANJE` (`PITANJEID`, `UPITNICA`, `UVOD`, `ODGOVOR`, `POST_ID`) VALUES (NULL, '$vPITANJA[$i].UPITNICA', '$vPITANJA[$i].UVOD', '$vPITANJA[$i].ODGOVOR', '$LAST_ID')";
    //     $stmt = $db->prepare($query);
    //     $state = $stmt->execute();
    // }
    //$query = "INSERT INTO `PITANJE` (`PITANJEID`, `UPITNICA`, `UVOD`, `ODGOVOR`, `POST_ID`) VALUES (NULL, '', '', '', '')"

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
?>