<?php
    // required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    // get database connection
    include_once '../config/database.php';
    
    $database = new Database();
    $db = $database->getConnection();

    $data = json_decode(file_get_contents("php://input"));

    $vPITANJEID = $data->vPitanjeID;
    $vUPITNICA = $data->vUpitnica;
    $vUVOD = $data->vUvod;
    $vODGOVOR = $data->vOdgovor;

    $query = "UPDATE `pitanje` SET UPITNICA='$vUPITNICA', UVOD='$vUVOD', ODGOVOR='$vODGOVOR' WHERE PITANJEID=$vPITANJEID";
 
    // prepare query statement
    $stmt = $db->prepare($query);
 
    // update the product
    if($stmt->execute()){
    
        // set response code - 200 ok
        http_response_code(200);
    
        // tell the user
        echo json_encode(array("message" => "Question was updated."));
    }
    
    // if unable to update the product, tell the user
    else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "Unable to update question."));
    }
?>