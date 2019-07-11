<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
 
// include database and object files
include_once '../config/database.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();

$id = $_GET['id'];

$query = "UPDATE POST SET KLIK = KLIK + 1 WHERE ID = $id;";
$stmt = $db->prepare( $query );
$stmt->execute();
$query = "SELECT * FROM POST WHERE ID = $id LIMIT 0,1;";
$stmt = $db->prepare( $query );
$stmt->execute();

// get retrieved row
$row = $stmt->fetch(PDO::FETCH_ASSOC);

// set values to object properties
$ID = $row['ID'];
$NASLOV = $row['NASLOV'];
$INTRO = $row['INTRO'];
$SLIKA = $row['SLIKA'];
$ALT = $row['ALT'];
$KLIK = $row['KLIK'];
$KEYWORDS = $row['KEYWORDS'];
 
if($row['NASLOV'] != null){

    $query2 = "SELECT * FROM pitanje WHERE POST_ID = $ID
            ORDER BY PITANJEID DESC";

    $stmt2 = $db->prepare($query2);

    $stmt2->execute();

    $posts_arr=array();
    $posts_arr["records"]=array();
 
    while ($row2 = $stmt2->fetch(PDO::FETCH_ASSOC)){

        $post_item=array(
            "PITANJEID" => html_entity_decode($row2['PITANJEID']),
            "UPITNICA" => html_entity_decode($row2['UPITNICA']),
            "UVOD" => html_entity_decode($row2['UVOD']),
            "ODGOVOR" => html_entity_decode($row2['ODGOVOR']),
            "POST_ID" => html_entity_decode($row2['POST_ID']),
        );
 
        array_push($posts_arr["records"], $post_item);
    }

    // create array
    $post_arr = array(
        "ID" =>  $id,
        "NASLOV" => $NASLOV,
        "INTRO" => $INTRO,
        "SLIKA" => $SLIKA,
        "ALT" => $ALT,
        "KLIK" => $KLIK,
        "PITANJA" => $posts_arr,
    );
 
    // set response code - 200 OK
    http_response_code(200);
 
    // make it json format
    echo json_encode($post_arr);
}
 
else{
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user post does not exist
    echo json_encode(array("message" => "post does not exist."));
}
?>