<?php
// required headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    // get database connection
    include_once '../config/subscribedb.php';
    
    $database = new SubscribeDB();
    $db = $database->getSubscribeConnection();

    $data = json_decode(file_get_contents("php://input"));

    // set product property values
    $vEMAIL = $data->vEmail;

    $query = "INSERT INTO `email` (`EMAIL`) VALUES ('$vEMAIL');";
    $stmt = $db->prepare($query);
    $state = $stmt->execute();

    $LAST_ID = $db->lastInsertId();
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