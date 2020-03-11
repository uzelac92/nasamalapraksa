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
    $vUPITNICA = $data->vUpitnica;
    $vUVOD = $data->vUvod;
    $vODGOVOR = $data->vOdgovor;
    $vPOSTID = $data->vPostId;

    $query = "INSERT INTO `pitanje` (`UPITNICA`, `UVOD`, `ODGOVOR`, `POST_ID`) VALUES ('$vUPITNICA', '$vUVOD', '$vODGOVOR ', $vPOSTID)";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    // create the product
    if($state){

        $response['status'] = 'success';

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